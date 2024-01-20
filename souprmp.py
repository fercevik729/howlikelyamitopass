import requests
from bs4 import BeautifulSoup

url = "https://www.ratemyprofessors.com/professor/304658"

page = requests.get(url)

soup = BeautifulSoup(page.text, "html.parser")

proftags = soup.findAll("span", {"class": "Tag-bs9vf4-0 hHOVKF" })

my_dict = {}

for mytag in proftags:
	if mytag.text not in my_dict:
		my_dict[mytag.text] = 1
	else:
		my_dict[mytag.text] += 1

print(my_dict)
	
