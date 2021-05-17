import React, { useState } from 'react';
import { Input, message } from 'antd';

const { Search } = Input;

const onSearch = (props,e) => {
    let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    
    if(regex.test(e)) {
        if(e.indexOf("https://www.youtube.com/watch?") != -1) {
            props.history.push({
                pathname: '/search',
                state: {youtubeUrl : e}
            });
        } else {
            message.error("올바른 Youtbe 링크가 아닙니다.");
        }
    } else {
        message.error("올바른 URL 주소가 아닙니다.");
    }
};

function LandingPage(props) {
    const [youtubeUrl, setYoutubeUrl] = useState("")
    return (
        <>
            <div className="app" style={{ fontsize: '10px' }}>
                <Search style={{ width: '30%' }} 
                        placeholder="input youtube-link" 
                        onSearch={(e) => onSearch(props,e)} 
                        enterButton />
            </div>
        </>
    )
}

export default LandingPage
