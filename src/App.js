import React from 'react';
import './App.css';
import { ResponsivePie } from '@nivo/pie'

const RevenueCard = (props) => {

  return (
    <div className="card">
      <div className="card-title">{props.title}</div>
      <div className="card-stat"><span style={{ fontSize: '1.5rem' }}>$ </span>{props.stat}k</div>
    </div>
  )
}

const RevenueCardBox = () => {
  return (
    <>
      <RevenueCard title="Total Revenue" stat="9.02" />
      <RevenueCard title="Revenue from Amazon" stat="5.75" />
      <RevenueCard title="Revenue from Ebay" stat="1.91" />
      <RevenueCard title="Revenue from Etsy" stat="1.36" />
    </>
  )
}

const PercentPie = ({ data }) => {

  const dimension = 300
  const margins = {top: 0, left: dimension * 0.8/3, bottom:0, right: dimension * 0.8/3}
  return (
    <div style={{
      height: dimension,
      width: dimension,
      position: "relative"
    }}>
      <ResponsivePie
        data={data}
        colors={data => data.color}
        margin={margins}
        innerRadius={0.5}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        isInteractive={false}
        style={{
          display: 'flex',
        }}
      />
      <div style={{
        position: "absolute",
        top: '0',
        bottom: '0',
        right: dimension/2,
        left: dimension/2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // This is important to preserve the chart interactivity
        pointerEvents: "none"
      }}>
        <span>{data[0].value}%</span>
      </div>
    </div>
  )
}


const PieCard = (props) => {
  const data = [
      {
        "id": props.title,
      "label": props.title,
      "value": props.stat,
      "color": props.color
    },
      {
        "id": "empty",
      "label": "empty",
      "value": 100 - props.stat,
      "color": "hsl(217, 33%, 14%)"
    }
  ]

  return (
      <>
        <div className="card">
          <div className="card-title">{props.title}</div>
          <PercentPie data={data} class="identity" />
        </div>
      </>
  )
}

const PieCardBox = () => {
  const purchase = 11
  const checkout = 8
  const abandon = 88

  return (
      <>
        <PieCard title="Purchase Rate" stat={purchase} color="hsl(216, 54%, 49%)" />
        <PieCard title="Checkout Rate" stat={checkout} color="hsl(186, 53%, 51%)" />
        <PieCard title="Cart Abandon Rate" stat={abandon} color="hsl(69, 83%, 84%)" />
      </>
  )
}

const App = () => {

  return (
      <>
        <RevenueCardBox />
        <PieCardBox />
      </>
  )

}

export default App;