import { useState } from 'react';
import axios from 'axios';

const AddImage = (props) => {
  const { user } = props;
  const instance = axios.create();
  const [image, setImage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ml_default');
        const dataRes = await instance.post(
          'https://api.cloudinary.com/v1_1/dhdbpguyk/upload',
          formData
        );
        imageUrl = dataRes.data.url;
      }
      const submitPost = {
        image: imageUrl,
      };
      await instance.post(
        `api/auth/${user._id}`,
        submitPost
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="form-control"
          type="file"
          id="formFile"
          name="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit" className="btn btn-primary m-1">
        Submit
      </button>
    </form>
  );
};

export default AddImage;
