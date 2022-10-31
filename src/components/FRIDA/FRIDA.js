import React, {
    useEffect,
    useState,
} from "react";
import {
    Form,
    Button,
    Space,
    Col,
    Row,
} from "antd";
import Forms from "../../components/Forms/Forms";

const testing = async (test) => {
    console.log("in testing function");
    const temp = await test;
    console.log("temp", temp);
    return temp;
};



function Frida(props) {
    const [form] = Form.useForm();
    const [forms, setForms] = useState([]); // forms array
    const [text, setText] = useState([]);
    const [elRefs, setElRefs] = React.useState([]); // reference array
    const [code, addCode] = useState([]);
    const [frida, setFrida] = useState([]); // Code generated for FRIDA parser
    const [idx, setIdx] = useState([]); //index to know when todo add or edit FRDIA code
    //! Function  which is triggered by the imperative handle from child


    const remove = (index) => {
        console.log("forms before remove", forms);
        const temp = [...forms];
        const tempFrida = [...frida];
        tempFrida.splice(index, 1);
        temp.splice(index, 1);
        setForms(temp);
        setFrida(tempFrida);
    };

    //! this will create array of refs from size of forms
    useEffect(() => {
        console.log("rendering")
    }, []);

    return (
        <>
            <div className="main">
                {forms.length === 0 ? (
                    <h1>Empty</h1>
                ) : (
                    forms.map((form, index) => {
                        return (
                            <Space
                                style={{
                                    display: "flex",
                                    marginBottom: 8,
                                }}
                                align="baseline"
                            >
                                {form}
                                <Button
                                    onClick={() => {
                                        console.log("index from click: ", index, form);
                                        remove(index);
                                        console.log(index);
                                        const temp = [...elRefs];
                                        temp.splice(index, 1);
                                        setElRefs(temp);
                                    }}
                                >
                                    Delete Action
                                </Button>
                            </Space>
                        );
                    })
                )}
                <Row>
                    <Col>
                        <Forms
                            variables={props.variables}
                            setVariables={props.setVariables}
                            setForms={setForms}
                            forms={forms}
                            code={code}
                            addCode={addCode}
                            frida={frida}
                            setFrida={setFrida}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default Frida;
