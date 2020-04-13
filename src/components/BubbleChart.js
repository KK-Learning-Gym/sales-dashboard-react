import React from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'

const BubbleChart = ({ data }) => {
    const dimensions = { height: '40vh', width: '45vw' }
    return (
        <div style={{ height: dimensions.height, width: dimensions.width, minHeight: 300, minWidth: 250 }} className="trickyChart">
            <ResponsiveBubble
                root={data}
                margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                identity="name"
                value="loc"
                colors={{ scheme: 'spectral' }}
                padding={9}
                enableLabel={true}
                isZoomable={false}
                leavesOnly={true}
                isInteractive={false}
                className="trickyChart"
            />
        </div>
    )
}

export default BubbleChart