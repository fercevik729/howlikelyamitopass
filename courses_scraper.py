# This file scrapes the UCSC course catalog for all CS courses and outputs them to a file
# CSE COURSES ONLY

import requests
from bs4 import BeautifulSoup

# Catalog URL
url = "https://courses.engineering.ucsc.edu/courses/department/22"
page = requests.get(url)

# Selecting Page
soup = BeautifulSoup(page.text, "html.parser")

# Course array
courses = soup.findAll("div.region > ul > li")
print("Number of courses:", len(courses))