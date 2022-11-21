import { Button, Modal, Input, Form, List, Tabs, Typography } from "antd";
import React, { forwardRef, useState } from "react";
import "./Forms.css";

//components
import MostUsedFunctions from "./MostUsedFunctions";
import AllFunctions from "./AllFunctions";
import ListTest from "../../Test/ListTest";
import Readers from "./Readers/Readers";
import Conditions from "./Conditions";
import Iterators from "./Iterators";
import Title from "antd/lib/skeleton/Title";
import MultiStepForm from "./MultiStepForm/MultiStepForm";

const Forms = forwardRef((props, items) => {
    //modal
    const [open, setOpen] = useState(false);
    const [closed, setClosed] = useState(false);
    const [filteredList, setFilteredList] = useState(items);
    const [component, setComponent] = useState("nothing");

    const onChange = (key) => {
        console.log(key);
    };

    //search
    const { Search } = Input;
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    return (
        <>
            <Button onClick={() => setOpen(true)} className="forms-button">
                Create New Function
            </Button>
            <Modal
                title="Ingresa el tipo de reader que quieras utilizar"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={900}
            >
                <Title level={4}>Ingresa el tipo de reader que quieras utilizar</Title>
                <Search
                    placeholder="Búsqueda"
                    onChange={inputHandler}
                    className="search "
                    enterButton
                />
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    centered
                    items={[
                        {
                            label: "Readers",
                            key: "2",
                            children: (
                                <>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginTop: 17,
                                            marginLeft: "32%",
                                        }}
                                    >
                                        <Readers
                                            forms={props.forms}
                                            setForms={props.setForms}
                                            variables={props.variables}
                                            setVariables={props.setVariables}
                                            code={props.code}
                                            setCode={props.setCode}
                                            id={props.id}
                                            setId={props.setId}
                                            functions={props.functions}
                                            status={props.status}
                                            setStatus={props.setStatus}
                                            setUpdate={props.setUpdate}
                                        />
                                    </span>
                                </>
                            ),
                        },
                        {
                            label: "Functions",
                            key: "3",
                            children: (
                                <>
                                    <p style={{ color: "black", marginBottom: -4 }}>
                                        Most Used Functions
                                    </p>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginLeft: "6%",
                                        }}
                                    >
                                        <div className="most-used-functions">
                                            <ListTest
                                                input={inputText}
                                                forms={props.forms}
                                                setForms={props.setForms}
                                                setNumberList={props.setNumberList}
                                                numberList={props.numberList}
                                                id={props.id}
                                                setId={props.setId}
                                                code={props.code}
                                                setCode={props.setCode}
                                                functions={props.functions}
                                                className="most-used-functions" status={props.status}
                                                setStatus={props.setStatus}
                                                setUpdate={props.setUpdate}
                                                variables={props.variables}
                                                setVariables={props.setVariables}

                                            />
                                        </div>
                                    </span>
                                    <p
                                        style={{ color: "black", marginTop: 10, marginBottom: -3 }}
                                    >
                                        All Functions
                                    </p>
                                    <span style={{ display: "inline-block", marginLeft: 50 }}>
                                        <div className="most-used-functions">
                                            <AllFunctions />
                                        </div>
                                    </span>
                                </>
                            ),
                        },
                        {
                            label: "Conditions",
                            key: "4",
                            children: (
                                <>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginTop: 17,
                                            marginLeft: "39%",
                                        }}
                                    >
                                        <Conditions
                                            forms={props.forms}
                                            setForms={props.setForms}
                                            variables={props.variables}
                                            setVariables={props.setVariables}
                                            code={props.code}
                                            setCode={props.setCode}
                                            id={props.id}
                                            setId={props.setId} setUpdate={props.setUpdate}

                                        />
                                        <Iterators
                                            forms={props.forms}
                                            setForms={props.setForms}
                                            variables={props.variables}
                                            setVariables={props.setVariables}
                                            code={props.code}
                                            setCode={props.setCode}
                                            id={props.id}
                                            setId={props.setId}
                                            setUpdate={props.setUpdate}
                                        />
                                    </span>
                                </>
                            ),
                        },
                        {
                            label: "Scripts",
                            key: "5",
                            children: (
                                <>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginTop: 17,
                                            marginLeft: "39%",
                                        }}
                                    >
                                        <MultiStepForm
                                            forms={props.forms}
                                            setForms={props.setForms}
                                            variables={props.variables}
                                            setVariables={props.setVariables}
                                            code={props.code}
                                            setCode={props.setCode}
                                            id={props.id}
                                            setId={props.setId}
                                            functions={props.functions}
                                        />
                                    </span>
                                </>
                            ),
                        },
                    ]}
                />
                <></>
            </Modal>
        </>
    );
});

export default Forms;
