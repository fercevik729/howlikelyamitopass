'''import requests
from bs4 import BeautifulSoup

# Professor URL (Long)
url = "https://www.ratemyprofessors.com/professor/1883634"
page = requests.get(url)

# Selecting Page
soup = BeautifulSoup(page.text, "html.parser")

# Tags
proftags = soup.findAll("span", {"class": "Tag-bs9vf4-0 hHOVKF" })
my_dict = {}
for mytag in proftags:
	if mytag.text not in my_dict:
		my_dict[mytag.text] = 1
	else:
		my_dict[mytag.text] += 1
# print("Tags:", my_dict) 

# Overall Rating
overall = soup.find("div", {"class": "RatingValue__Numerator-qw8sqy-2 liyUjw" }).get_text(strip=True)
#print("Overall:", overall)

# Feedback (Dealing with same div, would take again and difficulty)
feedback = soup.find_all("div", {"class": "FeedbackItem__StyledFeedbackItem-uof32n-0 dTFbKx"})

for i in feedback:
    num = i.find("div", {"class": "FeedbackItem__FeedbackNumber-uof32n-1 kkESWs"}).get_text(strip=True)
    desc = i.find("div", {"class": "FeedbackItem__FeedbackDescription-uof32n-2 hddnCs"}).get_text(strip=True)
    # print(f"{desc}: {num}")
'''

import requests
from bs4 import BeautifulSoup
import ratemyprofessor
from RateMyProfessorPyAPI import RMPClass

aapi = RMPClass.RateMyProfAPI(schoolId = 1078, teacher = "Kerry Veenstra")
aapi.retrieveRMPInfo()
aapi.getTags()
professor = ratemyprofessor.get_professor_by_school_and_name(ratemyprofessor.get_school_by_name("University of California Santa Cruz"), "Kerry Veenstra")
if professor is not None:
    url = professor.__dict__.get('url')
    if url is not None:
        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')
        tags = soup.select('.Tag-bs9vf4-0')
        for tag in tags:
            print(tag.text)
    else:
        print("The URL attribute of the professor object is None.")
        print("%s works in the %s Department of %s." % (professor.name, professor.department, professor.school.name))
        print("Rating: %s / 5.0" % professor.rating)
        print("Difficulty: %s / 5.0" % professor.difficulty)
        print("Total Ratings: %s" % professor.num_ratings)
        if professor.would_take_again is not None:
            print(("Would Take Again: %s" % round(professor.would_take_again, 1)) + '%')
