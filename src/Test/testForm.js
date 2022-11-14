import React, { useState, useForm, useEffect } from "react";
import {
    Form,
    Input,
    Card,
    Modal,
    Button,
    Popover,
    Row,
    Col,
    Tabs,
    Radio,
    message,
    Upload,
} from "antd";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import { useModalForm } from "sunflower-antd";
import "../App.css";
import { set } from "firebase/database";
import { render } from "less";
import { array } from "i/lib/util";
import { map } from "@firebase/util";

const buttonWidth = 70;
const { Meta } = Card;



function Testform(props) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [key, setKey] = useState(0);
    const [forms, setForms] = useState([]);
    const [size] = useState(Object.values(props.data.forms)[key].length);
    const [item, setItem] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempVar, setTempVar] = useState(new Map());
    const [itemType, setItemType] = useState([]);

    const test = (item) => {
        console.log(item.target.value)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const description = Object.values(props.data.description).map((text) => {
        return (
            <>
                <p style={{ color: "black", textAlign: "left" }}>{text}</p>
            </>
        );
    });

    const info = {
        name: "file",
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                "0%": "#108ee9",
                "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    const parameters = <>{props.data.parameters}</>;
    const syntax = Object.values(props.data.syntax).map((text) => {
        return (
            <>
                <p style={{ color: "black", textAlign: "left" }}>{text}</p>
            </>
        );
    });

    const examples = Object.values(props.data.examples).map((text) => {
        return (
            <>
                <p style={{ color: "black", textAlign: "left" }}>{text}</p>
            </>
        );
    });
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
        //! handles submit logic for the forms
        submit(data) {
            console.log(forms);
            let tempString = "";
            let tempCodeArr = [];
            let tempData = Object.values(data);
            let idx = 0;
            console.log(tempData);
            console.log("item arr", itemType);
            itemType.forEach((element) => {
                switch (element.key) {
                    case "set":
                        const tempSet = Object.values(tempData.shift()); 
                        tempCodeArr.push(tempSet[0]);
                        tempVar.get(element.key) === undefined ? setTempVar(tempVar.set(element.key, tempSet[0])) : setTempVar(tempVar.set(tempVar.get(element.key).concat(tempSet[0])));
                        break;
                    case "text":
                        tempCodeArr.push(tempData.shift());
                        break;
                    case "filepicker":
                        tempCodeArr.push(Object.values(tempData.shift())[0].file.name);
                        break;
                    default:
                        tempCodeArr.push(element.val)
                        break;
                }

            })

            console.log(tempCodeArr)
            console.log(tempVar);
            for (const item of tempVar) {
                console.log(item);
            }
            setTempVar(tempVar.clear());


            // !  Switch evaluate the key  
            // tempData.forEach((item) => {
            //     console.log("item", item);
            //     // // const  [key, value] = console.log(Object.entries(item));
            //     // // console.log(`${key}: ${value}`);
            //     //! for some reason delcaring it doesn't work :/ 
            //     for (const [key, value] of Object.entries(item)) {
            //         console.log(`${key}: ${value}`);
            //     }
            // })

            // console.log(tempData);
            // forms.reverse().forEach((obj) => {
            //     console.log("obj", obj);
            //     for (let i = 0; i < obj.length; i++) {
            //         console.log(tempData[idx]);
            //         if (tempData[idx] !== undefined) {
            //             tempString.length === 0
            //                 ? (tempString = `${Object.keys(tempData[idx])} ${Object.values(
            //                     tempData[idx]
            //                 )} `)
            //                 : (tempString += `${Object.keys(tempData[idx])} ${Object.values(
            //                     tempData[idx]
            //                 )} `);
            //         }
            //         idx++;
            //     }
            //     tempCodeArr.push(tempString);
            //     tempString = "";
            // });
            // console.log(props.code);
            // props.setCode(props.code.set(props.id, tempCodeArr.reverse()));
        },
        form,
    });

    //! these are the examples are being rendered
    const renderSyntaxCards = () => {
        console.log("inside the render cards");
        const cardArr = [];
        let temp = [];
        for (let i = 1; i <= Object.values(props.data.templates).length; i++) {
            temp.push(
                <Col>
                    <div onClick={() => { addCard(Object.values(props.data.templates)[i - 1].syntax) }}>
                        <Card
                            style={{
                                width: 300,
                            }}
                        >
                            {i}
                            <h3 style={{ color: "black", textAlign: "left" }}>{Object.values(props.data.templates)[i - 1].example}</h3>
                        </Card>
                    </div>
                </Col>
            );
            if (i % 3 === 0) {
                cardArr.push(
                    <Row gutter={[12, 24]}>
                        {temp}
                    </Row>
                );
                temp = [];
            }
        }
        cardArr.push(
            <Row gutter={[12, 24]}>
                {temp}
            </Row>
        )
        return cardArr.map((item) => {
            return (
                <>
                    {item}
                </>
            )
        })
    };

    //! add new line with example blocks function 
    const addCard = (index) => {
        const temp = [];
        const itemTypeArr = itemType;
        Object.values(props.data.forms)[index].map((item, index) => {
            itemTypeArr.push({ key: item.type, val: item.title })
            // setItemType([...itemType, { key: item.type, val: item.title }]);
            console.log(item);
            switch (item.type) {
                case "text":
                    temp.push(
                        <>
                            {
                                <>
                                    <Col>
                                        <Form.Item
                                            name={[`${forms.length}${index}`, item.title]}
                                            rules={[
                                                { required: true, message: "Please fill this out" },
                                            ]}
                                            style={{ width: "auto" }}
                                        >
                                            <Input
                                                type={item.type}
                                                placeholder={item.placeHolder}
                                                onChange={props.onChange}
                                                name={index}
                                            />
                                        </Form.Item>
                                    </Col>
                                </>
                            }
                        </>
                    );
                    break;
                case "filepicker":
                    temp.push(
                        <>
                            {
                                <>
                                    <Col>
                                        <Form.Item
                                            name={[`${forms.length}${index}`, item.title]}
                                            rules={[
                                                { required: true, message: "Please fill this out" },
                                            ]}
                                            style={{ width: "auto" }}
                                        >
                                            <Upload {...info}>
                                                <Button icon={<UploadOutlined />}>upload file</Button>
                                            </Upload>
                                        </Form.Item>

                                    </Col>
                                </>
                            }
                        </>
                    );
                    break;
                case "word":
                    temp.push(
                        <>
                            {
                                <>
                                    <Col>
                                        <Form.Item
                                            name={[`${forms.length}${index}`, item.title]}
                                            rules={[
                                                { required: false, message: "Please fill this out" },
                                            ]}
                                            style={{ width: "auto" }}
                                            title={item.title}
                                        >
                                            {item.title}

                                        </Form.Item>
                                    </Col>
                                </>
                            }
                        </>
                    );
                    break;
                case "variable":
                    temp.push(
                        <>
                            {
                                <>
                                    <Col>
                                        <Form.Item
                                            name={[`${forms.length}${index}`, item.title]}
                                            label={item.title}
                                            rules={[
                                                { required: true, message: "Please fill this out" },
                                            ]}
                                            style={{ width: "auto" }}
                                        >
                                            <Input
                                                type={item.type}
                                                placeholder={item.placeHolder}
                                                onChange={test}
                                                name={index}
                                            />
                                        </Form.Item>
                                    </Col>
                                </>
                            }
                        </>
                    );
                    break;
                case "get":
                    break;
                case "set":
                    temp.push(
                        <>
                            {
                                <>
                                    <Col>
                                        <Form.Item
                                            name={[`${forms.length}${index}`, item.title]}
                                            rules={[
                                                { required: true, message: "Please fill this out" },
                                            ]}
                                            style={{ width: "auto" }}
                                        >
                                            <Input
                                                type={item.type}
                                                placeholder={item.placeHolder}
                                                onChange={props.onChange}
                                                name={index}
                                            />
                                        </Form.Item>
                                    </Col>
                                </>
                            }
                        </>
                    );
                    break;
                default:
                    console.log(item.title);
            }
        });
        setItemType(itemTypeArr);
        setForms([...forms, temp]);
    }

    const add = () => {
        const temp = [];
        Object.values(props.data.forms)[key].map((item, index) => {
            console.log(item);
            switch (item.type) {
                case "text":
                    temp.push(
                        <>
                            {
                                <>
                                    <Col>
                                        <Form.Item
                                            name={[`${forms.length}${index}`, item.title]}
                                            label={item.title}
                                            rules={[
                                                { required: true, message: "Please fill this out" },
                                            ]}
                                            style={{ width: "auto" }}
                                        >
                                            <Input
                                                type={item.type}
                                                placeholder={item.placeHolder}
                                                onChange={props.onChange}
                                                name={index}
                                            />
                                        </Form.Item>
                                    </Col>
                                </>
                            }
                        </>
                    );
                    break;
                case "filepicker":
                    temp.push(
                        <>
                            {
                                <>
                                    <Col>
                                        <Upload {...info}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Col>
                                </>
                            }
                        </>
                    );
                    break;
                case "word":
                    temp.push(
                        <>
                            {
                                <>
                                    <p style={{ color: "black" }}>{item.title}</p>
                                </>
                            }
                        </>
                    );
                    break;
            }
        });
        setForms([...forms, temp]);
    };

    const removeForm = (index) => {
        const tempForm = forms;
        const tempArr = itemType;
        tempForm.splice(index, 1);
        console.log(tempArr);
        console.log(Object.values(props.data.forms)[key]);
        tempArr.splice(index, Object.values(props.data.forms)[key].length);
        console.log(tempArr);
        setForms([...tempForm]);
        setItemType([...tempArr]);
    };

    return (
        <>
            <Card
                hoverable
                style={{ width: 800 }}
                cover={<img alt="excel icon" src={props.data.src} width="100" height="200"/>}
                onClick={() => setOpen(true)}
                maskClosable={true}
            >
                <Meta title={props.function} description={props.data.description[1]} />
            </Card>
            <Modal
                {...modalProps}
                title="useModalForm"
                open={open}
                onCancel={() => setOpen(false)}
                okText="submit"
                width={1200}
                height={800}
            >
                <Row>
                    <Col>
                        <div className="demo">
                            <div style={{ marginLeft: buttonWidth, whiteSpace: "nowrap" }}>
                                <Popover
                                    placement="topLeft"
                                    title="Description"
                                    content={description}
                                    trigger="click"
                                    className="popover-position"
                                >
                                    <Button>Description</Button>
                                </Popover>
                                <Popover
                                    placement="topLeft"
                                    title="Parameters"
                                    content={parameters}
                                    trigger="click"
                                    className="popover-position"
                                >
                                    <Button>Parameters</Button>
                                </Popover>
                                <Popover
                                    placement="top"
                                    title="Syntax"
                                    content={syntax}
                                    trigger="click"
                                    className="popover-position"
                                >
                                    <Button>Syntax</Button>
                                </Popover>
                                <Popover
                                    placement="topRight"
                                    title="Examples"
                                    content={examples}
                                    trigger="click"
                                >
                                    <Button>Examples</Button>
                                </Popover>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Radio.Group
                            defaultValue="a"
                            buttonStyle="solid"
                            onChange={(e) => setKey(e.target.value)}
                            value={key}
                        >
                            {Object.keys(props.data.forms).map((_, index) => {
                                return (
                                    <Radio.Button value={index}>syntax: {index}</Radio.Button>
                                );
                            })}
                        </Radio.Group>
                    </Col>
                </Row>
                <Form layout="inline" {...formProps}>
                    <Row>
                        {forms.map((item, index) => {
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
                                                onClick={() => {
                                                    removeForm(index);
                                                }}
                                            />
                                        </Col>
                                        {item}
                                    </Row>
                                </>
                            );
                        })}
                    </Row>
                    <Row justify="center">
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

                    <Row>
                        <Button type="primary" onClick={showModal}>
                            Examples
                        </Button>
                        <Modal
                            title="Pick the example that looks most similar to what you are trying to achieve  "
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1000}
                        >
                            {renderSyntaxCards()}
                        </Modal>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
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

export default Testform;
