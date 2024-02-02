import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

function App() {

   const [data, setData] = useState<any>([]);
   const [oddsMap, setOddsMap] = useState(new Map());

   useEffect(() => {
      fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
         .then((response) => response.json())
         .then((data) => {
            setData(data.events);
              {data.events.map((event: any) => {
                if(event.competitions[0].odds) {
                    { setOddsMap(oddsMap.set(event.id, event.competitions[0].odds[0])) }
                }
              })}
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

  return (
    <div className="App">
      <header className="App-header">
        <span>Deeter's script</span>
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
                                        <p>Spread: {oddsMap.get(event.id).spread}</p>
                                        <p>OverUnder: {oddsMap.get(event.id).overUnder}</p>
                                        <p>Details: {oddsMap.get(event.id).details}</p>
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
