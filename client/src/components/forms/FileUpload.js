import { useState, useEffect, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import axios from 'axios';

import { Upload, Button, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload = () => {
  const { user } = useSelector((state) => state.auth);
  const [defaultFileList, setDefaultFileList] = useState([]);
  //
  const [imgURLs, setimgURLs] = useState([]);

  const [progress, setProgress] = useState(0);

  console.log('url state', imgURLs);

  console.log('defaultFileList', defaultFileList);

  const resizeAndUpload = ({ onSuccess, onError, file, onProgress }) => {
    // const config = {
    //   headers: { 'content-type': 'multipart/form-data', authToken: user.token },
    //   onUploadProgress: (event) => {
    //     const percent = Math.floor((event.loaded / event.total) * 100);
    //     setProgress(percent);
    //     if (percent === 100) {
    //       setTimeout(() => setProgress(0), 1000);
    //     }
    //     onProgress({ percent: (event.loaded / event.total) * 100 });
    //   },
    // };
    // 1) resize – maybe use beforeUpload hook for this task
    Resizer.imageFileResizer(
      file,
      720,
      720,
      'JPEG',
      85,
      0,
      (uri) => {
        //console.log('uri', uri);
        // 2) send to cloudinary
        axios
          .post(
            `${process.env.REACT_APP_API}/images`,
            { image: uri },
            {
              headers: {
                authToken: user.token,
              },
              onUploadProgress: (event) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                  setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
              },
            }
          )
          .then((res) => {
            setimgURLs((prevItems) => [...prevItems, res.data]);
            onSuccess('Ok');
            message.success(`${file.name} upload successfully`);
          })
          .catch((error) => {
            console.log(error);
            onError(error);
          });
      },
      'base64'
    );

    // 3) get response from cloudinary and set images [] in parent form component
  };

  const handleChange = ({ fileList }) => {
    setDefaultFileList(fileList);
  };

  return (
    <Form.Item label="Upload product images">
      <Upload
        name="image"
        accept="image/*"
        defaultFileList={defaultFileList}
        customRequest={resizeAndUpload}
        onChange={handleChange}
        //className="image-upload-grid"
        listType="picture"
        multiple
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Form.Item>
  );
};

export default memo(FileUpload);
