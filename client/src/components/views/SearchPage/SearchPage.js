import React, { useState } from 'react'
import { Typography } from 'antd';
import { Liquid } from '@ant-design/charts';

const { Title } = Typography;
const axios = require('axios');

function SearchPage(props) {
    const YoutubeUrl = props.location.state.YoutubeUrl

    const [YoutubeId, setYoutubeId] = useState("")
    const [BadComments, setBadComments] = useState({})
    const [Info, setInfo] = useState({})

    var config = {
        percent: 0.25,
        outline: {
          border: 4,
          distance: 8,
          style: {
              stroke: "#F21170"
          }
        },
        wave: { length: 128 },
        liquidStyle: {
            fill : "#F21170"
        } 
    
      };

    return (
        <div>
            <span>{YoutubeUrl+"의 분석결과 입니다."}</span>
            <Liquid {...config} />
        </div>
    )
}

export default SearchPage