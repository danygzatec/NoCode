import { Button, Modal, Input, Form, List, Tabs } from 'antd';
import React, { forwardRef, useState } from 'react';
import './Forms.css';


//components
import MostUsedFunctions from './MostUsedFunctions'
import AllFunctions from './AllFunctions'
import ListTest from '../../Test/ListTest';

const Forms = forwardRef((props, ref, items) => {
  //modal
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  const [filteredList, setFilteredList] = useState(items);
  const [component, setComponent] = useState("nothing");

  const onChange = (key) => 
{
  console.log(key);
};


  //search 
  const { Search } = Input;
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
    <>
      <Button onClick={() => setOpen(true)} className='forms-button'>
        Create New Function
      </Button>
      <Modal
        title="New Function (pending name)"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={900}
      >
        <Search placeholder="Búsqueda" onChange={inputHandler} className='search ' enterButton />
        <ListTest input={inputText} />
        <Tabs defaultActiveKey='1' onChange={onChange} centered items={[
          {
            label: 'All',
            key: '1',
            children: 'Content of Tab 1'
          },
          {
            label: 'Readers',
            key: '2',
            children: 'Content of Tab 2'
          },
          {
          label: 'Functions',
          key: '3',
          children: <><span style={{ display: 'inline-block', paddingTop: 15, marginLeft: '6%' }}>
            <div className="most-used-functions"><MostUsedFunctions setForms={props.setForms} forms={props.forms} ref={ref} /></div>
          </span><span style={{ display: 'inline-block', marginLeft: 50 }}>
              <div className="most-used-functions">
                <AllFunctions setForms={props.setForms} forms={props.forms} ref={ref} />
              </div>
            </span></>,
          },
          {
            label: 'Condition',
            key: '4',
            children: 'Content of Tab 4'
          },
          {
            label: 'Scripts',
            key: '5',
            children: 'Content of Tab 5'
          },
        ]}
        />
        <>
        </>
      </Modal>

    </>
  );
})

export default Forms

