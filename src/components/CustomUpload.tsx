import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, GetProp, Upload, UploadProps, message } from 'antd'
import React, { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
  
const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
type Parms = {
}
function CustomUpload() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj as FileType, (url) => {
            setLoading(false);
            setImageUrl(url);
          });
        }
      };

  return (
    <Form.Item
        name="file"
        label="Upload"
        rules={[{required:true}]}
        >
        <Upload
            listType="picture-card"
            className="avatar-uploader-2"
            showUploadList={false}
            customRequest={(info:any)=>{console.log(info)}}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            
            <>Click to Upload</>
        </Upload>
        </Form.Item>
  )
}

export default CustomUpload