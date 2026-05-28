import { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import githubLogoImg from './images/github.png';
import Leaderboard from './components/Leaderboard';

//Load in the data from the JSON file
async function load_data() {
  const response = await fetch('https://raw.githubusercontent.com/spruce04/Chat-Stats/refs/heads/main/data/stats.json');
  const data = await response.json();
  return data;
}

export default function App() {
  const [data, setData] = useState(null)
  //When the site initially loads, store the data
  useEffect(() => {
    load_data().then(JSONdata => {
      setData(JSONdata);
    });
  }, []);

  //While the data is still loading
  if (!data) {
    return (
      <div>Fetching data from <a href='https://raw.githubusercontent.com/spruce04/Chat-Stats/refs/heads/main/data/stats.json'>source</a>.</div>
    );
  };

  //When the data loads
  return(
    <div className='wrap'>
      <div className="header">
        <div className='mainText'>1 Million Beers - Chat Progress</div>
        <ProgressBar param={data}></ProgressBar>
      </div>
      <Leaderboard param={data["leaderboard"]}></Leaderboard>
      <div className="footer">
        <a href="https://github.com/spruce04/Chat-Stats" target="_blank"><img id="githubLogo" src={githubLogoImg} alt="github logo"/></a>
      </div>
    </div>
  );
}