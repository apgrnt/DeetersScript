import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

function App() {

   const [data, setData] = useState<any>([]);
   useEffect(() => {
      fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
         .then((response) => response.json())
         .then((data) => {
            console.log(data.events);
            setData(data.events);
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
                                    <p>Period/Quarter: {event.status.period}</p>
                                    <p>Clock: {event.status.displayClock}</p>
                                    {event.competitions.map((comp: any) => {
                                        return (
                                            <div>
                                                <p>Team: {comp.competitors[0].team.displayName} Score: {comp.competitors[0].score}</p>
                                                <p>Team: {comp.competitors[1].team.displayName} Score: {comp.competitors[1].score}</p>
                                                {comp.odds ?  <p>Spread: {comp.odds[0].spread}</p> : <p>Odds Not available</p>}
                                                {comp.odds ?  <p>OverUnder: {comp.odds[0].overUnder}</p> : <p>Odds Not available</p>}
                                                {comp.odds ?  <p>Details: {comp.odds[0].details}</p> : <p>Odds Not available</p>}
                                            </div>
                                        );
                                    })}
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
