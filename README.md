# Chat Stats

A simple leaderboard tracker for a WhatsApp group chat where we collectively attempt to drink 1 million beers.

## How does it work?
A python script parses the raw .txt export from the chat, dealing with anomalies as best it can, and storing the data in a .JSON file. This file is then read by a REACT frontend, which displays a static leaderboard and collective progress tracker. 

## To run the parser
```
cd data
python3 parse.py
```

## To run the frontend
```
cd frontend
npm install
npm run dev
```
