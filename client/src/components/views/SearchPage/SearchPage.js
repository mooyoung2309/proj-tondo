import React, { useEffect, useState } from 'react'
import { Typography, Statistic } from 'antd';
import { Liquid } from '@ant-design/charts';
import { Container, Row, Col } from 'reactstrap';
import DragList from './Sections/DragList';

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
    console.log(BadComments)
    var config = {
        width: 200,
        height: 200,
        percent: Info.num_of_bad_comments / Info.num_of_comments,
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
   
    if(Object.keys(BadComments).length != 0) {
        console.log(BadComments)
        return (
            <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <Liquid {...config} />
                </div>
                <div style={{ width: '50%' }}>
                    <Statistic title="Bad Comments / Per  Comments" value={Info.num_of_bad_comments + ' / ' + Info.num_of_comments} />
                    <Statistic title="Updated Time" value={Info.updated_time} />
                </div>
            </div>
            <DragList BadComments={BadComments}></DragList>
            </>
        )
    } else {
        return <div>...loading</div>
    }
    
}

export default SearchPage