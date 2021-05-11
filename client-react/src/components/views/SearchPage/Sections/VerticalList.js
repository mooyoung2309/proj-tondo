import React, { useEffect, useState } from 'react'
import { List, Avatar } from 'antd';

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];


function VerticalList(props) {
    const badComments = props.badComments;
    const [itemData, setitemData] = useState([])

    useEffect(() => {
        const tmpItemData = [];
        for (const key in badComments) {
            const tmp = {
                channelId: key,
                nickName: badComments[key]['nickname'][0],
                comment: badComments[key]['comment'][0],
                predict: badComments[key]['predict'][0],
            }
            tmpItemData.push(tmp);
        }
        setitemData(tmpItemData);
        console.log(tmpItemData);
    }, [badComments])


    return (
        <List
            itemLayout="horizontal"
            dataSource={itemData}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={<a href={"https://www.youtube.com/channel/" + item.channelId + "/about"} target="_blank">{item.nickName}</a>}
                        description={item.comment}>
                    </List.Item.Meta>
                </List.Item>
            )}>
        </List>
    )
}

export default VerticalList
