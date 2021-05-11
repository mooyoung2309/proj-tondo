import React, { useEffect, useState } from 'react'
import { Typography, Statistic, Row, Col  } from 'antd';
import { Liquid } from '@ant-design/charts';
import DragList from './Sections/DragList';
import VerticalList from './Sections/VerticalList';

var jsonTest = require('../../../data/test.json');

const { Title } = Typography;
const axios = require('axios');

function SearchPage(props) {
    const youtubeUrl = props.location.state.youtubeUrl;
    const youtubeId = youtubeUrl.substring(youtubeUrl.indexOf('=') + 1, youtubeUrl.indexOf('&'));
    
    const [channelId, setChannelId] = useState("");
    const [badComments, setBadComments] = useState({});
    const [info, setInfo] = useState({})
    
    useEffect(() => {
        // url -> id
        const idData = {
            id: youtubeId,
        }

        axios.post('/api/comments/analyzeComment', idData)
            .then((response) => {
                if(response.data.comments != null) {
                    setChannelId(response.data.comments.channelId);
                    setInfo(response.data.comments.info);
                    setBadComments(response.data.comments.badComments);
                    
                } else {
                    // comments 생성
                    axios.post('/api/comments/createComment', idData)
                        .then((response) => {
                            console.log(response)
                            setChannelId(response.data.comments.channelId);
                            setInfo(response.data.comments.info);
                            setBadComments(response.data.comments.badComments);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    var config = {
        width: 200,
        height: 200,
        percent: info.num_of_bad_comments / info.num_of_comments,
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
   
    if(channelId !== "") {
        return (
            <>
                <div style={{ display: 'flex', marginTop: '4rem'}}>
                    <div style={{ width: '50%' }}>
                        <Liquid {...config} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <Statistic title="악성 댓글 / 전체 댓글" value={info.num_of_bad_comments + ' / ' + info.num_of_comments} />
                        <Statistic style={{ marginTop: '1rem'}} title="업데이트된 시간" value={info.updated_time} />
                    </div>
                </div>
                <div style={{ marginTop: '6rem'}}>
                    {/* <DragList BadComments={badComments}></DragList> */}
                    <VerticalList />
                </div>
            </>
        )
    } else {
        return <div>...loading</div>
    }
    
}

export default SearchPage