import React, { useEffect, useState } from 'react'
import { Row, Col, Spin  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import DragList from './Sections/DragList';
import VerticalList from './Sections/VerticalList';
import Chart from './Sections/Chart';
import Info from './Sections/Info';

const axios = require('axios');
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

function SearchPage(props) {
    const youtubeUrl = props.location.state.youtubeUrl;
    const youtubeId = youtubeUrl.substring(youtubeUrl.indexOf('=') + 1, (youtubeUrl).length);
    
    const [channelId, setChannelId] = useState("");
    const [badComments, setBadComments] = useState({});
    const [info, setInfo] = useState({})
    
    useEffect(() => {
        // url -> id
        const idData = {
            id: youtubeId,
        }

        axios.get('/api')
            .then((response) => {
                for (const i in response.data){
                    if (youtubeId==response.data[i].channel_id){
                        console.log('correct')
                        setChannelId(response.data[i].channel_id);
                        setInfo(JSON.parse(response.data[i].info));
                        setBadComments(JSON.parse(response.data[i].bad_comments));
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    if(channelId !== "") {
        console.log(badComments);
        return (
            <>
                <Row>
                    <Col style={{ textAlign: 'center' }} span={6} offset={5}>
                        <Chart info={ info }/>
                    </Col>
                    <Col span={6}>
                        <Info info={ info }/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        <VerticalList badComments={ badComments }/>
                    </Col>
                </Row>
            </>
        )
    } else {
        return <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <Spin style={{display: 'inline-block', marginBottom: '1rem'}} indicator={antIcon}/>
                        <div>AI가 해당 URL을 분석 중입니다. (20초~2분)</div>
                    </div>
                    
                </div>
    }
    
}

export default SearchPage