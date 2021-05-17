import React from 'react'
import { Typography, Statistic } from 'antd';

function Info(props) {
    const info = props.info;
    
    return (
        <div>
            <Statistic title="악성 댓글 / 전체 댓글" value={info.num_of_bad_comments + ' / ' + info.num_of_comments} />
            <Statistic style={{ marginTop: '1rem'}} title="업데이트된 시간" value={info.updated_time} />
        </div>
    )
}

export default Info
