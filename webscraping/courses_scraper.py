# This file scrapes the UCSC course catalog for all CS courses and outputs them to a file
# CSE COURSES ONLY

import requests
from bs4 import BeautifulSoup
import datetime
import json


# Catalog Year to look for
TODAY = datetime.date.today()
THIS_YEAR = TODAY.year
NEXT_YEAR = THIS_YEAR + 1

LAST_YEAR_CATALOG = str(THIS_YEAR - 1) + '-' + str(NEXT_YEAR - 1)[-2:]
THIS_YEAR_CATALOG = str(THIS_YEAR) + '-' + str(NEXT_YEAR)[-2:]

QUARTERS = ['Fall', 'Winter', 'Spring', 'Summer']

# Examines the row to be passed, adding it to the dictionary given the courseId
# First time call should delete but second time call shouldn't
# - First row can be this/next year
# - But second row MUST be next year (if next year's is release)
# NOTE: Years may be flawed. Please re-evaluate code with team.
# Returns a boolean if it was deleted
def examine_row(row, courseId, shouldDelete):
    if row:
        # Now, get the first column (first <td>) within the row
        yearColumn = row[0].select('td:nth-of-type(1)')
        yearColumnText = yearColumn[0].text
        fallColumn = row[0].select('td:nth-of-type(2)')
        winterColumn = row[0].select('td:nth-of-type(3)')
        summerColumn = row[0].select('td:nth-of-type(4)')
        quarters = [fallColumn, winterColumn, summerColumn]

        # Checks to see if text is this year or last year
        isThisOrLastYear = (yearColumnText == THIS_YEAR_CATALOG or yearColumnText == LAST_YEAR_CATALOG)

        if isThisOrLastYear:
            # Strip which year it belongs to
            yearsSelected = yearColumnText.split('-') # 2023-24 to [2023,24]
            rowYear = [yearsSelected[0], '20' + yearsSelected[1]] # [2023, 2024]
            courseDictionary[courseId]["offered"] = []

            # Loops through the quarters to retrieve the professors name
            # Quarter does NOT contain the quarter's name, it's just a column
            for quarterIndex, quarter in enumerate(quarters):
                # Gets the list of professors for the quarter
                professorElementList = quarter[0].select('ul > li')

                # Skip if empty
                if len(professorElementList) == 0:
                    continue

                # Append to list if it contains a list
                info = {
                    "quarter": QUARTERS[quarterIndex] + ' ' + (rowYear[0] if quarterIndex == 0 else rowYear[1]),
                    "professors": [professors.get_text().split('\n\n')[1].split('(')[0].strip() for professors in professorElementList]
                }
                print(info)
                courseDictionary[courseId]["offered"].append(info)
        else:
            print("Course is not from this or last year.")
            if shouldDelete:
                print('Deleting in dictionary...')
                del courseDictionary[courseId]
                return True
    else:
        print("Row does not exist")
        if shouldDelete:
            print('Deleting in dictionary...')
            del courseDictionary[courseId]
            return True
    return False


# Catalog URL
baseURL = "https://courses.engineering.ucsc.edu"
url = baseURL + "/courses/department/22"
page = requests.get(url)

# Selecting Page
soup = BeautifulSoup(page.text, "html.parser")

# Course array
courseDictionary = {}
courses = soup.select("div.region > div > ul > li")
for course in courses:
    title = course.text
    courseId = title[0: title.index(':')]

    # Add to the course dictionary and access the page
    tempURL = baseURL + course.a.get("href")
    print(tempURL)
    tempPage = requests.get(tempURL)
    tempSoup = BeautifulSoup(tempPage.text, "html.parser")

    # Get details needed such as - title, description, professors, credits
    courseHeaderElement = tempSoup.find('h1')
    courseDescriptionElement = courseHeaderElement.find_next_sibling(string=True)
    courseUnitsElement = courseDescriptionElement.find_next_sibling('p')

    courseHeader = courseHeaderElement.text
    courseDescription = courseDescriptionElement.text
    courseUnits = courseUnitsElement.text.split()[0]
    courseDictionary[courseId] = {
        'title': courseHeader,
        'description': courseDescription,
        'units': courseUnits
    }

    firstRow = tempSoup.select('table > tbody > tr:nth-of-type(1)')
    deleted = examine_row(firstRow, courseId, True)

    if not deleted:
        secondRow = tempSoup.select('table > tbody > tr:nth-of-type(2)')
        examine_row(secondRow, courseId, False)

# Convert and write JSON object to file
with open("sample.json", "w") as outfile:
    json.dump(courseDictionary, outfile)