import { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import axios from 'axios';

import { Upload, Button, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { setImgInUpload } from '../../store/actions/productActions';

const FileUpload = () => {
  const { user } = useSelector((state) => state.auth);
  const { createProductInProgress } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  // Images data to send to parent form
  const [uploadedImages, setUploadedImages] = useState([]);

  // set images [] in Redux store for parent form component
  useEffect(() => {
    dispatch(setImgInUpload(uploadedImages));
  }, [uploadedImages]);

  // clear defaultFileList when product create
  useEffect(() => {
    if (createProductInProgress) {
      setFileList([]);
      //dispatch(clearImgInProductForm());
    }
  }, [createProductInProgress]);

  const resizeAndUpload = ({ onSuccess, onError, file, onProgress }) => {
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
                onProgress({
                  percent: (event.loaded / event.total) * 100,
                });
              },
            }
          )
          .then((res) => {
            let img = {
              ...res.data,
              uid: file.uid,
              name: file.name,
            };
            onSuccess(file);
            setUploadedImages((prevItems) => [...prevItems, img]);
            message.success(`${file.name} upload successfully`);
          })
          .catch((error) => {
            console.log(error);
            onError(error);
            message.error(`${file.name} upload failed`);
          });
      },
      'base64'
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Delete from uploadedImages state and Cloudinary
  const handleRemove = (file) => {
    const deletedImg = uploadedImages.filter((img) => img.uid === file.uid)[0];

    setUploadedImages([
      ...uploadedImages.filter((img) => img.uid !== file.uid),
    ]);

    const config = {
      headers: {
        authToken: user.token,
      },
      //Take note of the `data` keyword. This is the request body in DELETE method.
      data: {
        public_id: deletedImg.public_id,
      },
    };

    axios.delete(`${process.env.REACT_APP_API}/images`, config);
  };

  return (
    <Form.Item label="Upload product images (5 images maximum at once)">
      <Upload
        accept="image/*"
        fileList={fileList}
        customRequest={resizeAndUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        listType="picture"
        multiple
        maxCount={5}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Form.Item>
  );
};

export default memo(FileUpload);
