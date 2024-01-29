import requests
import json

# url = "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard"
url = "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"

def __parse_competitors(competitors):
    for competitor in competitors:
        team_ = competitor["team"]
        print("Team: " + team_["displayName"] + " Score: " + competitor["score"])


def __parse_odds(odds):
    print("details: " + str(odds["details"]))
    print("Spread: " + str(odds["spread"]))
    print("overUnder: " + str(odds["overUnder"]))


def __parse_event(events):
    for event in events:
        print("\n")
        print(event["name"])
        status_ = event["status"]
        print("period: " + str(status_["period"]))
        print("clock: " + str(status_["displayClock"]))
        competitions_ = event["competitions"][0]
        __parse_competitors(competitions_["competitors"])
        if "odds" in competitions_:
            __parse_odds(competitions_["odds"][0])


def callApi():
    response = requests.get(url)
    content = json.loads(response.text)
    if "events" in content:
        __parse_event(content["events"])
    return content


if __name__ == '__main__':
    # url = "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard"
    # url = "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
    # Make a GET request to the URL and get the HTML content
    response = requests.get(url)
    content = json.loads(response.text)
    if "events" in content:
        __parse_event(content["events"])