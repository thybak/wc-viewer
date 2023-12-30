
import { useEffect, useState } from 'react';

import HeatMap from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

import { KkEntry } from './model/KkEntry';
import { HeatmapEntry } from './model/HeatmapEntry';
import mondongo from "./assets/mondongo.jpg";
import tatomorrow from "./assets/tatomorrow.jpg";
import './App.css'

function App() {
  const [kks, setKks] = useState(new Array<HeatmapEntry>());
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      
      if (username === "")
        return;

      const kksResponse = await fetch("/wc-viewer/kks.json");
      if (!kksResponse.ok)
        return;
      const kks: KkEntry[] = await kksResponse.json();
      console.log(username);
      const heatmapEntries = 
        kks.filter(kk => kk.username === username && kk.secretion_type === "0")
           .map(kk => { return { date: kk.date, count: +kk.count } as HeatmapEntry } );
      setKks(heatmapEntries);
    }

    setUsername(document.location.pathname.split("/").pop() || "");
    fetchData();
  }, [username]);

  return (
    <>
      <img src={mondongo} alt="Mondongo" style={{ width: '10em', height: 'auto' }} />
      <h1>Hey @{username}!</h1>
      <p>Has asomado la tortuga <b>{kks.length}</b> veces desde que llevamos la cuenta. Un poco pesado no?</p>
      <p>Aquí te dejo un mapita de calor donde podrás ver lo regular que has sido visitando al señor Roca:</p>
      <HeatMap
        value={kks}
        startDate={new Date('2023/01/01')}
        width={700}
        rectRender={(props, data) => {
          if (!data.count) return <rect {...props} />;
          return (
            <Tooltip placement="top" content={`kks: ${data.count || 0}`}>
              <rect {...props} />
            </Tooltip>
          );
        }}
        panelColors={{
          0: '#f4decd',
          2: '#e4b293',
          4: '#d48462',
          10: '#000',
        }}
        legendCellSize={0}
      />

      <img src={tatomorrow} alt="Pos yo taba cagando" style={{ width: '9em', height: 'auto' }} />
      <p><i>Hasta mañana!</i></p>
    </>
  )
}

export default App
