
import { useEffect, useState } from 'react';

import HeatMap from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

import { KkEntry } from '../model/KkEntry';
import { HeatmapEntry } from '../model/HeatmapEntry';
import tatomorrow from "../assets/tatomorrow.jpg";
import { getSecretions } from '../service/KkService';

function UserSummary( props: { username: string }) {
  const [kks, setKks] = useState(new Array<HeatmapEntry>());

  useEffect(() => {
    async function loadHeatmapEntries() {
      const kks: KkEntry[] = await getSecretions();
      const heatmapEntries = 
        kks.filter(kk => kk.username === props.username && kk.secretion_type === "0")
           .map(kk => { return { date: kk.date, count: +kk.count } as HeatmapEntry } );
      
      setKks(heatmapEntries);
    }
    loadHeatmapEntries();
  });

  if (props.username === "")
    return (<></>);

  return (
    <>
        <h1>Hey @{props.username}!</h1>
        <p>Has asomado la tortuga <b>{kks.reduce((accum, value) => accum + value.count, 0)}</b> veces desde que llevamos la cuenta. Un poco pesado no?</p>
        <p>Aquí te dejo un mapita de calor donde podrás ver lo regular que has sido visitando al señor Roca:</p>
        <HeatMap
          value={kks}
          startDate={new Date('2023/01/01')}
          width={750}
          rectRender={(props, data) => {
            if (!data.count) return <rect {...props} />;
            return (
              <Tooltip placement="top" content={`kks: ${data.count || 0}`}>
                <rect {...props} />
              </Tooltip>
            );
          }}
          panelColors={{
            1: '#f4decd',
            2: '#eecfbc',
            3: '#e4b293',
            10: '#d07742'
          }}
          legendCellSize={0}
        />
      

      <img src={tatomorrow} alt="Pos yo taba cagando" style={{ width: '9em', height: 'auto' }} />
      <p><i>Hasta mañana!</i></p>
    </>
  )
}

export default UserSummary