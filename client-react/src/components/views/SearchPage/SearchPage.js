import React, { useEffect, useState } from 'react'
import { Typography, Statistic } from 'antd';
import { Liquid } from '@ant-design/charts';
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
        axios.post('/api/comments/getComments', YoutubeUrl)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.comment)
            } else {
                console.log(response)
            }
        })
        
        // axios.post('/api/comments/testPush', "testjson")
        // .then(response =>{
        //     if(response) {
        //         console.log(response)
        //     } else {
        //         console.log(response)
        //     }
        // })
        // .catch(e => {
        //     console.log(e);
        // })
        
        var keyTest = Object.keys(jsonTest)[0]
        setYoutubeId(keyTest)
        setBadComments(jsonTest[keyTest]["bad_comment"])
        setInfo(jsonTest[keyTest]["info"])
        
    }, [])

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
                <div style={{ display: 'flex', marginTop: '4rem'}}>
                    <div style={{ width: '50%' }}>
                        <Liquid {...config} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <Statistic title="악성 댓글 / 전체 댓글" value={Info.num_of_bad_comments + ' / ' + Info.num_of_comments} />
                        <Statistic style={{ marginTop: '1rem'}} title="업데이트된 시간" value={Info.updated_time} />
                    </div>
                </div>
                <div style={{ marginTop: '6rem'}}>
                    <DragList BadComments={BadComments}></DragList>
                </div>
            
            </>
        )
    } else {
        return <div>...loading</div>
    }
    
}

export default SearchPage