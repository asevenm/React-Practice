import React, { Fragment } from 'react';

const cameras = [ 
  { 
    "id": "15305130530", 
    "name": "分组一", 
    "children": [ 
      { "id": "1@DEFAULT", "name": "1-001" }, 
      { "id": "2@DEFAULT", "name": "1-002" }, 
      { "id": "5@DEFAULT", "name": "1-003" } 
    ] 
  }, 
  { 
    "id": "15305130801", 
    "name": "分组二", 
    "children": [ 
      { "id": "0@DEFAULT", "name": "2-001" }, 
      { "id": "3@DEFAULT", "name": "2-002" }, 
      { "id": "4@DEFAULT", "name": "2-003" } 
    ] 
  } 
]

class Group extends React.Component {
  state = {
    count: 0,
  }

  render() {
    const { data, selectedCameras, handler, groupName } = this.props;
    const { count } = this.state;
    return (
      <Fragment>
        <div>
          {
            count > 0 && count < 3
            ? <i />
            : <input type="checkbox" checkbox={count}/>
          }
          <input type="checkbox" />
          {groupName}
        </div>
        <ul>
          {
            data.map(item => (
              <li key={item.id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedCameras.includes(item.id)}
                    onChange={() => handler(item.id)}
                  />
                  {item.name}
                </label>
              </li>
            ))
          }
        </ul>
      </Fragment>
    )
  }
}

export default class ChooseCamera extends React.Component {
  state = {
    showModal: false,
    cameraCount: 0,
    selectedCameras: [],
    countOfGroup1: 0,
    countOfGroup2: 0,
  };

  chooseAll = () => {
    let cameraIds = [];
    for (let i = 0, len = cameras.length; i < len; i++) {
      for ( let j = 0, lenC = cameras[i].children.length; j < lenC; j++ ) {
        const item = cameras[i].children;
        cameraIds.push(item[j].id);
      }
    }
    this.setState({ 
      selectedCameras: cameraIds, 
      countOfGroup1: 3, 
      countOfGroup2: 3 
    })
  }

  clear = () => {
    this.setState({ 
      selectedCameras: [],
      countOfGroup1: 0,
      countOfgroup2: 0,
    });
  }

  toggleCheckbox = (id, group) => {
    let { selectedCameras, countOfGroup1, countOfGroup2 } = this.state;
    const index = selectedCameras.indexOf(id);
    if (index !== -1) {
      selectedCameras.splice(index, 1);
    } else {
      selectedCameras.push(id);
    }
    this.setState({ selectedCameras, countOfGroup2, countOfGroup1 });
  }

  render() {
    const { showModal, cameraCount, selectedCameras, countOfGroup1, countOfGroup2 } = this.state;
    console.log(selectedCameras);
    return (
      <div>
        <div>{!showModal ? '选择摄像头' : `已选择${cameraCount}个摄像头`}</div>
        <div>
          <div>
            <span>请选择摄像头</span>
            <div>
              <button onClick={this.chooseAll}>全选</button> 
              <button onClick={this.clear}>清空</button>
            </div>
            <input placeholder="请选择摄像头" />
          </div>
          <ul >
            {
              cameras.map((item, index)=> (
                <li key={item.id}>
                  <Group 
                    data={item.children} 
                    handler={this.toggleCheckbox}
                    selectedCameras={selectedCameras}
                    groupName={item.name}
                  /> 
                </li>
              ))
            } 
          </ul>
        </div>
      </div>
    )
  }
}