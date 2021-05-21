import React, { useEffect, useState } from 'react'
import { List, Button, message } from 'antd';


function VerticalList(props) {
    const badComments = props.badComments;
    const [itemData, setitemData] = useState([]);
    const [clickedAll, setClickedAll] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState([]);

    useEffect(() => {
      setDefaultItemData();
    }, [badComments])

    const setDefaultItemData = () => {
      let tmpItemData = [];
        for (var key in badComments) {
          for(var key_2 in badComments[key]){
          if (Number(badComments[key][key_2]['predict']) === 1) {
            const tmp = {
              channelId: key_2,
              nickName: badComments[key][key_2]['nickname'],
              comment: badComments[key][key_2]['comment'],
              predict: badComments[key][key_2]['predict'],
              selected: false,
              style: { },
            }
            tmpItemData.push(tmp);
          }
        }
        }
        setitemData([...tmpItemData]);
    }

    const setAiItemData = () => {
      let tmpItemData = [];
        for (var key in badComments) {
          for(var key_2 in badComments[key]){
          if (Number(badComments[key][key_2]['predict']) !== 1) {
            const tmp = {
              channelId: key_2,
              nickName: badComments[key][key_2]['nickname'],
              comment: badComments[key][key_2]['comment'],
              predict: badComments[key][key_2]['predict'],
              selected: false,
              style: { },
            }
            tmpItemData.push(tmp);
          }
        }
        }
        setitemData([...tmpItemData]);
    }

    const deleteItemFromIndex = (indx) => {
      let tmpItemData = itemData;
      let tmpSelectedItemIndex = selectedItemIndex;
      if (tmpSelectedItemIndex.includes(indx)) {
        setSelectedItemIndex(tmpSelectedItemIndex.slice(tmpSelectedItemIndex.indexOf(indx), 1));
      }
      tmpItemData.splice(indx, 1);
      setitemData([...tmpItemData]);
    }

    const cancelItemFromIndex = (indx) => {
      let tmpItemData = itemData;
      tmpItemData[indx]['selected'] = false;
      tmpItemData[indx]['style'] = { };
      setitemData([...tmpItemData]);
      if (selectedItemIndex.includes(indx)) {
        let tmpSelectedItemIndex = selectedItemIndex;
        let tmpIndx = tmpSelectedItemIndex.indexOf(indx)
        tmpSelectedItemIndex.splice(tmpIndx, 1);

        setSelectedItemIndex([...tmpSelectedItemIndex]);
      }
    }

    const selectItemFromIndex = (indx) => {
      let tmpItemData = itemData;
      tmpItemData[indx]['selected'] = true;
      tmpItemData[indx]['style'] = { backgroundColor: '#f6e199' };
      setitemData([...tmpItemData]);
      if (!selectedItemIndex.includes(indx)) {
        //console.log(indx);
        let tmpSelectedItemIndex = selectedItemIndex;
        setSelectedItemIndex([...tmpSelectedItemIndex, indx]);
      }
    }

    const onClickSelect = (indx) => {
      if (itemData[indx]['selected']) {
        cancelItemFromIndex(indx);
      } else {
        selectItemFromIndex(indx);
      }
    }

    const onClickSelectAll = () => {
      if (clickedAll === false){
        var tmpArry = [];
        for (var i=0; i<itemData.length; i++) {
          tmpArry.push(i);
          selectItemFromIndex(i);
          setClickedAll(true);
        }
        setSelectedItemIndex([...tmpArry]);
      } else {
        for (var i=0; i<itemData.length; i++) {
          cancelItemFromIndex(i)
          setClickedAll(false);
        }
      }
    }

    const onClickDelete = (indx) => {
      deleteItemFromIndex(indx);
    }

    const onClickCopy = () => {
      if (selectedItemIndex.length === 0) {
        message.error("선택된 댓글이 없습니다.");
      } else {
        var selectedChannelId = "";
        for (var i=0; i<selectedItemIndex.length; i++) {
          selectedChannelId += "https://www.youtube.com/channel/" + itemData[selectedItemIndex[i]]['channelId'] + '\n';
        }
        message.success("선택된 댓글의 채널 주소가 복사되었습니다.");

        navigator.clipboard.writeText(selectedChannelId)
      }
    }

    const onClickDefault = () => {
      for (var i=0; i<itemData.length; i++) {
        cancelItemFromIndex(i)
      }
      setClickedAll(false);
      setDefaultItemData();
    }

    const onClickAi = () => {
      for (var i=0; i<itemData.length; i++) {
        cancelItemFromIndex(i)
      }
      setClickedAll(false);
      setAiItemData();
    }

    return (
      <>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClickDefault} style={{ marginRight: '0.5rem' }} type="primary" >Default</Button>
            <Button onClick={onClickAi} type="primary" >AI (BETA)</Button>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '2rem', marginBottom: '1rem' }}>
          <span>{selectedItemIndex.length + "개의 댓글이 선택되었습니다."}</span>
          <div style={{ marginLeft: 'auto' }}>
            <Button onClick={onClickSelectAll} style={{ marginRight: '0.5rem' }} type="primary" >All</Button>
            <Button onClick={onClickCopy} type="primary" >Copy</Button>
          </div>
        </div>
        <List
            itemLayout="horizontal"
            dataSource={itemData}
            renderItem={item => (
                <List.Item 
                  actions={[<a onClick={() => onClickSelect(itemData.indexOf(item))}>Select</a>, <a onClick={() => onClickDelete(itemData.indexOf(item))}>Del</a>]}
                >
                    <List.Item.Meta
                        title={<a href={"https://www.youtube.com/channel/" + item.channelId + "/about"} target="_blank">{item.nickName}</a>}
                        description={<span style={item.style}>{item.comment}</span>}
                    >
                          
                    </List.Item.Meta>
                </List.Item>
            )}>
        </List>
      </>
    )
}

export default VerticalList