import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Input } from 'antd';
import { Button } from 'antd';
import { Tabs, Divider, Checkbox, message } from 'antd';

const { TabPane } = Tabs;

const columnsName = [
  "Bad",
  "Good",
  "Vague",
];

//드래그가 끝났을 때 호출되는 함수
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }

};

function DragList(props) {
  //console.log(props.BadComments);
  const [columns, setColumns] = useState({});
  const [BadComments, setBadComments] = useState({})
  const [channels, setChannels] = useState({
    "Bad": [],
    "Good": [],
    "Vague": []
  })
  const [nowTabKey, setnowTabKey] = useState("");

  //Tab의 콘텐츠 업데이트 함수
  const updateTabContents = () => {
    var channelsTmp = channels
    for (var key in columns) {
      // console.log(columns)
      // console.log(key)
      var name = columns[key].name
      // console.log(name)
      channelsTmp[name] = []
      // console.log(channelsTmp)
      for (var channelKey in columns[key].items) {
        channelsTmp[name].push("https://www.youtube.com/channel/"+ columns[key].items[channelKey].id+"\n")
      }
    }
    setChannels({...channelsTmp})
  }

  const success = () => {
    if (channels[nowTabKey].length == 0) {
      message.error(nowTabKey + "탭의 채널 주소가 없습니다.");
    } else {
      // console.log(channels[nowTabKey])
      message.success(nowTabKey + "탭의 채널 주소가 클립보드에 복사되었습니다.");
      navigator.clipboard.writeText(channels[nowTabKey])
    }
  }
  //처음 렌더링 될 때 사용.
  useEffect(() => {
    const itemsFromBackend = []
    for (var key in props.BadComments) {
      itemsFromBackend.push({ id: key, content: props.BadComments[key].comment })
    }
  
    const columnsFromBackend = {
      [columnsName[0]]: {
        name: columnsName[0],
        items: itemsFromBackend
      },
      [columnsName[1]]: {
        name: columnsName[1],
        items: []
      },
      [columnsName[2]]: {
        name: columnsName[2],
        items: []
      }
    };

    setColumns(columnsFromBackend);

}, [])

  useEffect(() => {
    updateTabContents();
  }, [columns]);

  return (
    <div style={{ display: "flex",alignItems: "center", flexDirection: "column"}}>
      <Tabs style={{ marginBottom: "6rem",width: 750,}} 
            tabBarExtraContent={<Button onClick={() => success()}>복사하기</Button>}
            onChange={(k) => setnowTabKey(k)}>
        <TabPane tab={columnsName[0]} key={columnsName[0]}> {channels[columnsName[0]]} </TabPane>
        <TabPane tab={columnsName[1]} key={columnsName[1]}> {channels[columnsName[1]]} </TabPane>
        <TabPane tab={columnsName[2]} key={columnsName[2]}> {channels[columnsName[2]]} </TabPane>
      </Tabs>
      
      <div style={{ display: "flex", justifyContent: "center", height: "100%" ,flexDirection: "row"}}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <Button style={{width: 250, height: 30}} type="primary">{column.name}</Button>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                    {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default DragList;
