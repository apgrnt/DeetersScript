import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

function App() {

   const nbaUrl = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
   const nccaMenUrl = 'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard';
   const [data, setData] = useState([]);
   const [oddsMap, setOddsMap] = useState(new Map());
   const [selectedUrl, setUrl] = useState(nbaUrl)

   function fetchAPIData() {
     fetch(selectedUrl)
     .then((response) => response.json())
     .then((data) => {
        setData(data.events);
        const localStoreOdds = JSON.parse(localStorage.getItem('odds') || '{}');
        {data.events.map((event: any) => {
             if(event.competitions[0].odds) {
                setOddsMap(oddsMap.set(event.id, event.competitions[0].odds[0]));
            }
            else if(Object.keys(localStoreOdds).length){
                setOddsMap(oddsMap.set(event.id, localStoreOdds[event.id]));
            }
        })}
        localStorage.setItem('odds', JSON.stringify(Object.fromEntries(oddsMap)))
     })
     .catch((err) => {
        console.log(err.message);
     });
   }

   function onLeagueChange(event){
    setUrl(event.target.value);
   };

   useEffect(() => {
    fetchAPIData();
   }, [selectedUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <span>
            Deeter's App
        </span>
        <label>Select a league:
            <select name="test" value={selectedUrl} onChange={onLeagueChange} >
                <option value={nbaUrl}>NBA</option>
                <option value={nccaMenUrl}>NCAA Mens</option>
            </select>
        </label>
      </header>
      <body className="App-body">
        <Grid container spacing={2}>
             {data.map((event: any) => {
                return (
                    <Grid item xs={6}>
                        <div className="card">
                            <Card sx={{ minWidth: 400 }}>
                                <CardContent>
                                    <p>{event.name} </p>
                                   <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                      <p>Period/Quarter: {event.status.period}</p>
                                      <p>Clock: {event.status.displayClock}</p>
                                      {event.competitions.map((comp: any) => {
                                        return (
                                            <div>
                                                <p>{comp.competitors[0].team.abbreviation}: {comp.competitors[0].score}</p>
                                                <p>{comp.competitors[1].team.abbreviation}: {comp.competitors[1].score}</p>
                                            </div>
                                        );
                                    })}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {oddsMap.get(event.id) ?  <p>Spread: {oddsMap.get(event.id).spread}</p> : <p>Odds Not available</p>}
                                        {oddsMap.get(event.id) ? <p>OverUnder: {oddsMap.get(event.id).overUnder}</p> : <p>Odds Not available</p>}
                                        {oddsMap.get(event.id) ? <p>Details: {oddsMap.get(event.id).details}</p> : <p>Odds Not available</p>}
                                    </Grid>
                                   </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                );
            })}
        </Grid>
      </body>
    </div>
  );
}

export default App;
