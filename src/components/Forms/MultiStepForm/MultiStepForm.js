import React, { useState, useEffect } from "react";
import { Button, message, Steps } from "antd";
import "antd/dist/antd.css";
import Reader from "./reader";
import GroupSelect from "./GroupSelect";
import Testform from "../../../Test/testForm";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
const db = getFirestore();


// function RenderFunctions(functions, group, collection) {
//   console.log("render", functions);
//   return functions.functions
//     .filter(
//       (element) =>
//         element.collection === functions.collection &&
//         element.group == functions.group
//     )
//     .map((item) => (
//       <>
//         {console.log("item", item)}
//         <Button
//           style={{
//             height: 120,
//             borderRadius: 40,
//             borderColor: "white",
//           }}
//           onClick={(element) => {
//             //add(item);
//             console.log('click')
//           }}
//         >
//           <div className="imgp">
//             <img src="favicon.ico" alt="logo" style={{ width: 70 }} />
//             <p style={{ color: "black", marginLeft: 0 }}>
//               <b>{item.function}</b>
//             </p>
//           </div>
//         </Button>
//       </>
//     ));
// }

function MultiStepForm(props) {
  const add = async (data) => {
    const colRef = doc(db, data.collection, data.function);
    const docSnap = await getDoc(colRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
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

  function RenderFunctions(functions, group, collection) {
    console.log("render", functions);
    return functions.functions
      .filter(
        (element) =>
          element.collection === functions.collection &&
          element.group == functions.group
      )
      .map((item) => (
        <>
          {console.log("item", item)}
          <Button
            style={{
              height: 120,
              borderRadius: 40,
              borderColor: "white",
            }}
            onClick={() => {
              add(item);
              console.log('click', item)
            }}
          >
            <div className="imgp">
              <img src="favicon.ico" alt="logo" style={{ width: 70 }} />
              <p style={{ color: "black", marginLeft: 0 }}>
                <b>{item.function}</b>
              </p>
            </div>
          </Button>
        </>
      ));
  }

  const [current, setCurrent] = useState(0);
  const [collection, setCollection] = useState("null");
  const [group, SetGroup] = useState("null");
  const steps = [
    {
      title: "Choose the reader",
      content: <Reader collection={collection} setCollection={setCollection} />,
    },
    {
      title: "Choose the function group",
      content: <GroupSelect group={group} SetGroup={SetGroup} add={add}/>,
    },
    {
      title: "Choose the function",
      content: (
        <RenderFunctions
          functions={props.functions}
          collection={collection}
          group={group}
        />
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  useEffect(() => {
    console.log("group", group);
  }, []);

  return (
    <>
      <Steps current={current} items={items} style={{ padding: 25 }} />
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            style={{ justifyContent: "right" }}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default MultiStepForm;
