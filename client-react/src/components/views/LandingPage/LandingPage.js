import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = (props,e) => {
    props.history.push({
        pathname: '/search',
        state: {youtubeUrl : e}
    });
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
