import requests
import ratemyprofessor
from bs4 import BeautifulSoup
import requests
import json

# name->tag->rating->take again->difficulty->comment

professor_names = ["Darrell Long", "Kerry Veenstra", "Lindsey Kuper"]

for name in professor_names:
	professor = ratemyprofessor.get_professor_by_school_and_name(ratemyprofessor.get_school_by_name("University of California Santa Cruz"), name)
	
	# Professor URL
	url = f"https://www.ratemyprofessors.com/professor/{professor.id}"
	page = requests.get(url)

	# how_likely URL
	how_likely = "https://howlikelyamitopass.vercel.app/api/professor"

	data = {}
	
	# Selecting Page
	soup = BeautifulSoup(page.text, "html.parser")
	
	# Name
	data['name'] = name
	
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
		comments = soup.find_all("div", {"class": "Comments__StyledComments-dzzyvm-0 gRjWel"})
		for comment in comments:
			'''
			text = comment.get_text(strip=True)
			print("Comment:", text)
			print("")
			'''

	except:
		print("No Comments Found")

	json_data = json.dumps(data)
	headers = {"Content-Type" : "application/json"}
	requesting = requests.post(how_likely, data=json_data, headers=headers)
	if (requesting.status_code == 200):
		print ("post successful")
		print ("response:", requesting.json())
	else:
		print("failed with status code: ", requesting.status_code)
		print("response content:", requesting.text)	
