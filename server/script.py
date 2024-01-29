import requests
# from bs4 import BeautifulSoup

# URL for NCAA basketball scores page
url = "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard"

# Make a GET request to the URL and get the HTML content
response = requests.get(url)
html_content = response.content
