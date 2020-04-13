import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({ data }) => {
    const dimension = 300
    const margins = { top: dimension * 0.8 / 3, left: dimension * 0.8 / 3, bottom: dimension * 0.8 / 3, right: dimension * 0.8 / 3 }
    const dimensions = { height: '40vh', width: '45vw' }
    return (
        <div style={{ height: dimensions.height, width: dimensions.width, minHeight: 300, minWidth: 250 }} className="trickyChart">
            <ResponsiveBar
                colors="hsl(216, 54%, 49%)"
                data={data}
                keys={['value']}
                indexBy="store"
                margin={margins}
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

export default BarChart