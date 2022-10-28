import React, { useState, useForm, useEffect } from "react";
import { Form, Input, Card, Modal, Button, Popover, Row, Col, Tabs, Radio } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useModalForm } from 'sunflower-antd';
import "../App.css";
const { Meta } = Card;

export default function Testform(props) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [key, setKey] = useState(0);
    const [forms, setForms] = useState([]);
    const [size] = useState(Object.values(props.data.forms)[key].length);
    const [item, setItem] = useState([]);
    const [codeArr, setCodeArr] = useState([])

    const {
        modalProps,
        formProps,
        show,
        formLoading,
        formValues,
        formResult,
        resetField,
    } = useModalForm({
        defaultVisible: false,
        autoSubmitClose: false,
        autoResetForm: false,
        submit(data) {
            console.log(forms)
            let tempString = "";
            let tempCodeArr = [];
            let tempData = Object.values(data);
            let idx = 0;
            console.log(tempData);
            forms.reverse().forEach((obj) => {
                console.log("obj", obj);
                for (let i = 0; i < obj.length; i++) {
                    console.log(tempData[idx]);
                    if (tempData[idx] !== undefined) {
                        tempString.length === 0 ? tempString = `${(Object.keys(tempData[idx]))} ${(Object.values(tempData[idx]))} ` : tempString += `${(Object.keys(tempData[idx]))} ${(Object.values(tempData[idx]))} `;
                    }
                    idx++;
                }
                tempCodeArr.push(tempString);
                tempString = "";
            })
            console.log('tempCodeArr', tempCodeArr.reverse());
        },
        form,
    });

    const add = () => {
        const temp = []
        Object.values(props.data.forms)[key].map((item, index) => {
            return (
                temp.push(
                    <>
                        {
                            item.type === "text" &&
                            <>
                                <Col>
                                    <Form.Item name={[`${forms.length}${index}`, item.title]} label={item.title} rules={[{ required: true, message: 'Please fill this out' }]} style={{ width: 'auto' }}>
                                        <Input type={item.type} placeholder={item.placeHolder} onChange={props.onChange} name={index} />
                                    </Form.Item>
                                </Col>
                            </>
                        }
                    </>
                )
            )
        })
        setForms([...forms, temp]);
    }

    const removeForm = (index) => {
        console.log(index)
        // const tempForms = forms
        // // const tempFields = form.getFieldsValue()
        // for (let i = tempForms.length - item.length; i < tempForms.length; i++) {
        //     try {
        //         form.resetFields([`${i}`]);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }

        // tempForms.splice(tempForms.length - item.length, item.length)
        // console.log("tempForms", tempForms)
        // setForms([...tempForms])
    }

    // useEffect(() => {
    //     // console.log("rendering again")
    //     // const tempArray = []
    //     // setCodeArr([]);
    //     // console.log('codeArr', codeArr);
    //     // Object.values(props.data.forms)[key].map((item) => {
    //     //     tempArray.push(item)
    //     // })
    //     // setItem(tempArray)
    //     // form.resetFields();
    //     // setForm() 
    // }, [key])

    // useEffect(() => {
    //     console.log("rendering again")
    //     const tempArray = []
    //     setCodeArr([]);
    //     console.log('codeArr', codeArr);
    //     Object.values(props.data.forms)[key].map((item) => {
    //         tempArray.push(item)
    //     })
    //     setItem(tempArray)
    //     // form.resetFields();
    //     // setForm()
    // }, [forms])

    return (
        <>
            < Card hoverable style={{ width: 800, }
            } cover={< img alt="excel icon" src="../../../../excelIcon.ico" />} onClick={() => setOpen(true)} maskClosable={true} >
                <Meta title="Excel Write" description="Write something in a given cell in a worksheet." />
            </Card >
            <Modal {...modalProps} title="useModalForm" open={open} onCancel={() => setOpen(false)} okText="submit" width={1200}>
                <>
                    <Row>
                        <Col>
                            <Radio.Group defaultValue="a" buttonStyle="solid" onChange={(e) => setKey(e.target.value)}>
                                {Object.keys(props.data.forms).map((_, index) => {
                                    return (
                                        <Radio.Button value={index}>syntax: {index}</Radio.Button>
                                    )
                                })}
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Form layout="inline" {...formProps}>
                        <Row>
                        {forms.map((item, index) => {
                            console.log()
                            return (
                                <>
                                    <Row>
                                    <Col>
                                        <Button
                                            className="add-button"
                                            type="primary"
                                            shape="circle"
                                            icon={<MinusOutlined />}
                                            size={"large"}
                                            onClick={() => { removeForm(index) }}
                                        />
                                    </Col>
                                    {item}
                                    </Row>
                                </>
                            )
                        })}
                        </Row>
                        < Row justify="center">
                            <Col offset={8} span={4}>
                                <Button
                                    className="add-button"
                                    type="primary"
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    size={"large"}
                                    onClick={() => add()}
                                />
                            </Col>

                        </Row>

                    </Form>
                </>
            </Modal >
        </>
    )
};

{
    /* //!  for text file picker */
}
{
    /* {item[1] === "file" &&
      <Form.Item
          name={[`${item[0] + id}`, `${item[0]}`]}
          label={item[0]}
          rules={[{ required: true, message: 'Please input your username!' }]}
      >
      <input> // 
      </Form.Item>} */
}
{
    /* //!  for text date */
}
{
    /* {item[1] === "date" &&
      <Form.Item
          name={[`${item[0] + id}`, `${item[0]}`]}
          label={item[0]}
          rules={[{ required: true, message: 'Please input your username!' }]}
      >
      </Form.Item>} */
}
