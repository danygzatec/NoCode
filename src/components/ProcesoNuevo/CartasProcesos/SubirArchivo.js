import React from 'react';
import './SubirArchivo.css';
import { Card, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export default function SubirArchivo() {

    const props = {
        action: '',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList)
            }
        }
    }

    return (
        <>
            <Card
                title="InsertRow"
                style={{
                    width: 500,
                    marginLeft:500,
                    marginTop:100,
                }}
            >
                <Upload {...props} action={"http://localhost:3000"} accept='.xlsx' beforeUpload={(file) =>{
                    console.log({file})
                    return false
                }}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <Link to='/proceso-excel'><Button>Confirm</Button></Link>
            </Card>
        </>
    )
}

