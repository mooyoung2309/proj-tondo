import React, { useEffect, useState } from 'react'
import { Typography } from 'antd';
import { Liquid } from '@ant-design/charts';
import { Container, Row, Col } from 'reactstrap';

var jsonTest = require('../../../data/test.json');

const { Title } = Typography;
const axios = require('axios');

function SearchPage(props) {
    const YoutubeUrl = props.location.state.YoutubeUrl

    const [YoutubeId, setYoutubeId] = useState("")
    const [BadComments, setBadComments] = useState({})
    const [Info, setInfo] = useState({})
    
    useEffect(() => {
        var keyTest = Object.keys(jsonTest)[0]
        setYoutubeId(keyTest)
        setBadComments(jsonTest[keyTest]["bad_comment"])
        setInfo(jsonTest[keyTest]["info"])
        

    }, [])
    console.log(Info)
    var config = {
        width: 200,
        height: 200,
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
      // <Liquid {...config} />
    return (
        <div style={{ display: 'flex' }}>
            <div><Liquid {...config} /></div>
            <div><Liquid {...config} /></div>
        </div>
    )
}

export default SearchPage