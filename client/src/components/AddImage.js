import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddImage = (props) => {
  const { user } = props;
  const instance = axios.create();
  const [image, setImage] = useState();
  const navigate = useNavigate();

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
      await instance.post(`api/auth/${user._id}`, submitPost);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group p-2">
        <input
          type="file"
          className="form-control"
          id="formFile"
          name="file"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className="btn btn-secondary"
          type="submit"
          id="inputGroupFileAddon04"
        >
          Change picture
        </button>
      </div>
    </form>
  );
};

export default AddImage;
