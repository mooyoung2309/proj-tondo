import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { Input } from 'antd';
import { Button } from 'antd';
import { Tabs, Divider, Checkbox } from 'antd';

const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;

const operations = <Button>Extra Action</Button>;
const { Search } = Input;

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
  console.log(2)
};

function DragList(props) {

  const [columns, setColumns] = useState({});
  const [BadComments, setBadComments] = useState({})

  //처음 렌더링 될 때 사용.
  useEffect(() => {
    const itemsFromBackend = []
    for (var key in props.BadComments) {
      itemsFromBackend.push({ id: key, content: props.BadComments[key].comment })
    }
  
    const columnsFromBackend = {
      [uuid()]: {
        name: "Bad",
        items: itemsFromBackend
      },
      [uuid()]: {
        name: "Good",
        items: []
      },
      [uuid()]: {
        name: "Vague",
        items: []
      }
    };
    setColumns(columnsFromBackend)
}, [])

//렌더링이 업데이트 될 때 사용.
useEffect(() => {
  console.log(columns)
}, )
  
  
  return (
    <div style={{ display: "flex",alignItems: "center", flexDirection: "column"}}>
      <Tabs style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "6rem",
                  width: 750,
                }}tabBarExtraContent={operations}>
        <TabPane tab="Tab 1" key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
      
      <div style={{ display: "flex", justifyContent: "center", height: "100%" ,flexDirection: "row"}}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
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
