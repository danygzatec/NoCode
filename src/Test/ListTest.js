import React, { useState } from "react";
import { Button, Form, Badge, Col, Row } from "antd";
import Testform from "./testForm";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { data } from "autoprefixer";
function searchFunction(input, nameSearch) {
  try {
    let text = input.toUpperCase();
    const name = nameSearch.toUpperCase();
    return name.search(text) > -1;
  } catch (e) {
    return false;
  }
}
function ListTest(props) {
  const filteredData = props.functions.filter((el) =>
    searchFunction(props.input, el.function)
  );
  //
  const db = getFirestore();
  const add = async (data) => {
    const colRef = doc(db, data.collection, data.function);
    const docSnap = await getDoc(colRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      console.log(props.variables);
      props.setForms([
        ...props.forms,
        {
          id: props.id,
          form: (
            <Testform
              function={data.function}
              data={docSnap.data()}
              variables={props.variables}
              setVariables={props.setVariables}
              code={props.code}
              setCode={props.setCode}
              id={props.id}
              status={props.status}
              setStatus={props.setStatus}
              setUpdate={props.setUpdate}
            />
          ),
        },
      ]);
      props.setId(props.id + 1);
      // props.setNumberList([...props.numberList, props.id]);
    } else {
      console.log("no such document!");
    }
  };
  console.log("filter", filteredData);
  return (
    <Row span={10} gutter={[9, 9]} justify={'center'}>
      {filteredData.map((item) => (
        <>
          <Col >
            <Button
              style={{ height: 120, borderRadius: 40, borderColor: "white", marginLeft: 30 }}
              onClick={(event) => {
                add(item);
              }}
            >
              <div className="imgp">
                <img src={item.src} alt="logo" style={{ width: 80,  }} />
                <p style={{ color: "black", marginLeft: 0,  }}>
                  <b>{item.function}</b>
                </p>
              </div>
            </Button>
          </Col>
        </>
      ))}
    </Row>
  );
}
export default ListTest;
