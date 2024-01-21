import requests
import ratemyprofessor
from bs4 import BeautifulSoup
import requests
import json
import time

# name->tag->rating->take again->difficulty->comment
professor_names = list(map(lambda entry: entry["name"], requests.get('https://howlikelyamitopass.vercel.app/api/professors').json()))
#professor_names = ["Kerry Veenstra", "Lindsey Kuper"]


for name in professor_names:
	time.sleep(0.1)
	professor = ratemyprofessor.get_professor_by_school_and_name(ratemyprofessor.get_school_by_name("University of California Santa Cruz"), name)
	
	if professor is None:
		print (name)
		continue
		# Professor URL
	else:
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
	
	my_dict = dict(sorted(my_dict.items(), key=lambda item: item[1], reverse = True))
	list_of_tags = []
	if len(my_dict) > 4:
		counter = 0
		new_dict = {}
		for key in my_dict:
			if counter > 3:
				break
			counter += 1
			list_of_tags.append(key)
	data['tags'] = list_of_tags

	# Overall Rating
	overall = soup.find("div", {"class": "RatingValue__Numerator-qw8sqy-2 liyUjw" }).get_text(strip=True)
	data['rating'] = overall

	# Feedback (Dealing with same div, would take again and difficulty)
	feedback = soup.find_all("div", {"class": "FeedbackItem__StyledFeedbackItem-uof32n-0 dTFbKx"})

	for i in feedback:
		num = i.find("div", {"class": "FeedbackItem__FeedbackNumber-uof32n-1 kkESWs"}).get_text(strip=True)
		if 'wouldRepeat' in data:
			data['difficulty'] = num
		else:
			data['wouldRepeat'] = num

	# Comments
	try:
		comments = soup.find_all("div", {"class": "Comments__StyledComments-dzzyvm-0 gRjWel"})
		for comment in comments:
			text = comment.get_text(strip=True)
			if 'comments' in data:
				data['comments'].append(text)
			else:
				data['comments'] = [text]

	except:
		print("No Comments Found")

	json_data = json.dumps(data)
	headers = {"Content-Type" : "application/json"}
	requesting = requests.post(how_likely, data=json_data, headers=headers)
	#if (requesting.status_code == 200):
		#print ("post successful")
		#print ("response:", requesting.json())
	#else:
		#print("failed with status code: ", requesting.status_code)
		#print("response content:", requesting.text)	
