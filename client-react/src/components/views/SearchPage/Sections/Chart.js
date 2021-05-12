import React from 'react'
import { RingProgress } from '@ant-design/charts';

function Chart(props) {
    const info = props.info;
    const percentData = info.num_of_bad_comments / info.num_of_comments;

    const config = {
        height: 100,
        width: 100,
        autoFit: false,
        percent: percentData,
        color: ['#5B8FF9', '#E8EDF3'],
      };

    return (
        <RingProgress style={{display: 'inline-block' }} {...config} />
    )
}

export default Chart
