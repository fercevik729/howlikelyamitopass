import requests
from bs4 import BeautifulSoup

#FIX ME
def search_prof(query):
	# Send a GET request to the search URL
	page = requests.get("https://www.ratemyprofessors.com/search/professors/1078?q=" + str(query))
	if page.status_code == 200:
        	# Parse the HTML content
		soup = BeautifulSoup(page.text, "html.parser")
		print(soup.text)
	else:
		print("Professor not found.")	

search_prof("Darrell Long")




# REFERENCE
'''
# Professor URL (Long)
url = "https://www.ratemyprofessors.com/professor/304658"
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
print("Tags:", my_dict) 

# Overall Rating
overall = soup.find("div", {"class": "RatingValue__Numerator-qw8sqy-2 liyUjw" }).get_text(strip=True)
#print("Overall:", overall)

# Feedback (Dealing with same div, would take again and difficulty)
feedback = soup.find_all("div", {"class": "FeedbackItem__StyledFeedbackItem-uof32n-0 dTFbKx"})

for i in feedback:
    num = i.find("div", {"class": "FeedbackItem__FeedbackNumber-uof32n-1 kkESWs"}).get_text(strip=True)
    desc = i.find("div", {"class": "FeedbackItem__FeedbackDescription-uof32n-2 hddnCs"}).get_text(strip=True)
    print(f"{desc}: {num}")

# Comments
try:
	comment = soup.find("div", {"class": "Comments__StyledComments-dzzyvm-0 gRjWel"}).get_text(strip=True)
	print("Comment:", comment)
except:
	print("No Comment")
'''
