import React from 'react'
import { Rate, List, Card } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

function VotePage() {
    return (
        <>
            <h1>악플 데이터를 수정해주세요.</h1>
            <h1>악플 데이터를 수정해주세요.</h1>
            <h1>악플 데이터를 수정해주세요.</h1>
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
                <>
                    <List.Item>
                    
                    <Card title={<Rate defaultValue={0} character={({ index }) => customIcons[index + 1]} />}>
                    Card content</Card>
                    </List.Item>
                </>
            )}
            />
            <div>
                
            </div>
        </>
    )
}

export default VotePage
