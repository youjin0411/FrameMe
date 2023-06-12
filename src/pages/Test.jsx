import React, { useState } from 'react';
import axios from 'axios';

const UploadPhotos = () => {
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    const photoArray = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        photoArray.push(reader.result);
        if (photoArray.length === fileArray.length) {
          setPhotos(photoArray);
        }
      };
    });
  };

  const handleUpload = async () => {
    try {
      if (photos.length === 0) {
        console.error('No photos selected');
        return;
      }

      // axios를 사용하여 서버에 사진 데이터 전송
      await axios.post(
        'https://port-0-framemeserver-7xwyjq992llisq9g9j.sel4.cloudtype.app//upload',
        { photos },
        {
          withCredentials: true,
          crossDomain: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Photos uploaded successfully');
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Photos</button>
    </div>
  );
};

export default UploadPhotos;