import React from 'react';
import './App.css';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveBubble } from '@nivo/circle-packing'

const Box = (props) => {
  return (
    <div className="flexbox">
      {props.children}
    </div>
  )
}

const PieChart = (props) => {
  const pieData = [
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

  const dimension = 300
  const margins = { top: 0, left: dimension * 0.8 / 3, bottom: 0, right: dimension * 0.8 / 3 }
  return (
    <div className="card">
      <div className="card-title center top-margin">{props.title}</div>
      <div className="piebox">
        <div style={{
          height: dimension,
          width: dimension,
          position: "relative"
        }}>
          <ResponsivePie
            data={pieData}
            colors={pieData => pieData.color}
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
            right: dimension / 2,
            left: dimension / 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <span>{pieData[0].value}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const BubbleChart = ({ data }) => {
  const dimensions  = {height: 350, width: 600}
  return (
    <div style={{ height: dimensions.height, width: dimensions.width }}>
      <ResponsiveBubble
        root={data}
        margin={{ top: 20, right: dimensions.width * 0.8 / 3, bottom: 20, left: dimensions.width * 0.8 / 3 }}
        identity="name"
        value="loc"
        colors={{ scheme: 'spectral' }}
        padding={9}
        enableLabel={true}
        isZoomable={false}
        leavesOnly={true}
        isInteractive={false}
      />
    </div>
  )
}

const BarChart = ({ data }) => {
  const dimensions  = {height: 350, width: 600}
  return (
    <div style={{ height: dimensions.height, width: dimensions.width }}>
      <ResponsiveBar
        colors="hsl(216, 54%, 49%)"
        data={data}
        keys={['value']}
        indexBy="store"
        margin={{ top: dimensions.height * 0.8 / 3, right: dimensions.width * 0.8 / 3, bottom: dimensions.height * 0.8 / 3, left: dimensions.width * 0.8 / 3 }}
        padding={0.3}
        layout="horizontal"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Orders',
          legendPosition: 'middle',
          legendOffset: 50
        }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 5
        }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={false}
        isInteractive={false}
      />
    </div>
  )
}

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-title center top-margin">{props.title}</div>
      {props.children}
    </div>
  )
}

const RevenueCard = (props) => {
  return (
    <div className="card">
      <div className="card-title center">{props.title}</div>
      <div className="card-stat center"><span style={{ fontSize: '1.5rem' }}>$ </span>{props.stat}k</div>
    </div>
  )
}

const App = () => {
  const barData = [
    {
      "store": "Etsy",
      "value": 8,
    },
    {
      "store": "Ebay",
      "value": 12,
    },
    {
      "store": "Amazon",
      "value": 44
    }
  ]

  const bubbleData = {
    "name": "chart",
    "children": [
      {
        "name": "NW",
        "loc": 4
      },
      {
        "name": "SW",
        "loc": 2
      },
      {
        "name": "CR",
        "loc": 3
      },
      {
        "name": "SE",
        "loc": 1
      },
      {
        "name": "NE",
        "loc": 5
      }
    ]
  }

  return (
    <>
      <Box>
        <RevenueCard title="Revenue from Amazon" stat="5.75" />
        <RevenueCard title="Revenue from Ebay" stat="1.91" />
        <RevenueCard title="Revenue from Etsy" stat="1.36" />
        <RevenueCard title="Total Revenue" stat="9.02" />
      </Box>
      <Box>
        <PieChart title="Purchase Rate" stat={11} color="hsl(216, 54%, 49%)" />
        <PieChart title="Checkout Rate" stat={8} color="hsl(186, 53%, 51%)" />
        <PieChart title="Cart Abandon Rate" stat={88} color="hsl(69, 83%, 84%)" />
      </Box>
      <Box>
        <Card title="Orders Trend by Stores">
          <BarChart data={barData} />
        </Card>
        <Card title="Orders Trend by Region">
          <BubbleChart data={bubbleData} />
        </Card>
      </Box>
    </>
  )

}

export default App;