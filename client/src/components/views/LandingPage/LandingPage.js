import React from 'react'
import { FaCode } from "react-icons/fa";
import { Input } from 'antd';

const { Search } = Input;

const onSearch = value => console.log(value);

function LandingPage() {
    return (
        <>
            <div className="app" style={{ fontsize: '10px' }}>
                <Search style={{ width: '30%' }} addonBefore="youtube.com/" placeholder="input youtube-link" onSearch={onSearch} enterButton />
            </div>
        </>
    )
}

export default LandingPage
