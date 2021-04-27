import React from 'react'
import { FaCode } from "react-icons/fa";
import { Input } from 'antd';

const { Search } = Input;

const onSearch = () => {
    this.props.history.push('/search')
    console.log("dd")
  };

function LandingPage(props) {
    return (
        <>
            <div className="app" style={{ fontsize: '10px' }}>
                <Search style={{ width: '30%' }} placeholder="input youtube-link" onSearch={() => {props.history.push('/search')}} enterButton />
            </div>
        </>
    )
}

export default LandingPage
