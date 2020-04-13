import React from 'react'
import { ResponsivePie } from '@nivo/pie'

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

export default PieChart