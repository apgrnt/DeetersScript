This project's goal is to alert someone when a team predicted to win is losing at 
half time.

It's very early and I'm still kinda getting familiar with the very large blob of response data. 
I should be able to start working on some actual logic in the next phase. 

Background: My brothers like to sports bet. While I don't care much for it
I was interested to hear my brother tried to use ChatGPT to make a python script 
that would keep track of games and alert him when a team wasn't covering the spread.
I had him send me over the code that ChatGPT generated and it was a hot plate of garbage.
It wasn't using an api but the actual espn website and trying to parse html.

I spent a little bit of time googling espn apis. There isn't much documentation but found some
'hidden' apis. I spent a little bit of time getting familiar with the response data. This work is found in main.py.

I decided the best way for my not-that-technical-brother (he knows computers but not much programming) was to 
give him the data in a web browser. It also solved some other problems I had that are related to how the api works.


One problem I've run into is that the odds disappear from the game data once the clock starts on the game. 
Keeping track of that data using the browsers localStorage should be an easy solution.

Some problems I haven't worked on yet are:
-Alerting (What is gonna be the best way to alert someone? Email? For now just gonna do something simple in the browser)
-How many free hits to the API do I get a day (Ain't no one trying to pay for this right now.)
    -So how often do I automatically want to hit the API? For now my brother can refresh.
-Maybe getting the odds from a different API than espn.
-I think I'll switch the server to a node server instead of python. 
    -I chose python only because my brother used python code initially.
    -node seems like it will be easier and probably won't have to restart the server as often when I'm developing. 
-Packaging everything in a way that is dead simple for someone with minimal technical skills can use very quickly. 
    -No needing to build anything, maybe only need to d/l node.js, start with one command, run anywhere. 

Rough Outline of work to do. 
Phase 1: Build some POC in python to test api
Phase 2: Build some lightweight React app to display data (hit api directly, for now)
Phase 3: Check when game is at halftime and compare to pre game odds
Phase 4: Set up alerting
Phase 5: House keeping (switch to node.js most likely)
