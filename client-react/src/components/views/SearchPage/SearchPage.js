import React, { useEffect, useState } from 'react'
import { Typography, Statistic } from 'antd';
import { Liquid } from '@ant-design/charts';
import DragList from './Sections/DragList';

var jsonTest = require('../../../data/test.json');

const { Title } = Typography;
const axios = require('axios');

function SearchPage(props) {
    const youtubeUrl = props.location.state.youtubeUrl
    
    const [YoutubeId, setYoutubeId] = useState("")
    const [BadComments, setBadComments] = useState({})
    const [Info, setInfo] = useState({})
    
    useEffect(() => {
        // url 체크
        const urlData = {
            url: youtubeUrl,
        }

        axios.post('/api/comments/analyzeComment', urlData)
            .then((response) => {
                if(response.data) {
                    console.log("not data");
                    axios.post('/api/comments/createComment', urlData)
                } else {
                    console.log("hav data");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        
        
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
        //console.log(BadComments)
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