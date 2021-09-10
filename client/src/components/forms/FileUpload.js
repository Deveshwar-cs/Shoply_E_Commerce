import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import axios from 'axios';

import { Upload, Button, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload = () => {
  const { user } = useSelector((state) => state.auth);
  const [defaultFileList, setDefaultFileList] = useState([]);

  const handleOnChange = ({ file, fileList, event }) => {
    setDefaultFileList(fileList);

    // 1) resize
    if (defaultFileList.length > 0) {
      for (let i = 0; i < defaultFileList.length; i++) {
        Resizer.imageFileResizer(
          fileList[i].originFileObj,
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            console.log('uri', uri);
          },
          'base64'
        );
      }
    }

    // 2) send to cloudinary

    // 3) get response from cloudinary and set images [] in parent form component
  };

  return (
    <Upload
      accept="image/*"
      onChange={handleOnChange}
      fileList={defaultFileList}
      className="image-upload-grid"
      multiple
    >
      <Button icon={<UploadOutlined />}>Select File</Button>
    </Upload>
  );
};

export default FileUpload;
