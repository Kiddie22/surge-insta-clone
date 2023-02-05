import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { Card, CardBody } from 'reactstrap';
import { useState } from 'react';

const NewPostForm = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const instance = axios.create();
  const [image, setImage] = useState();
  const token = useSelector((state) => state.token);

  const handleFormSubmit = async (e) => {
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
        pictureUrl: imageUrl,
        description,
      };
      await instance.post(`api/posts`, submitPost, {
        headers: { authorization: `Bearer ${token}` },
      });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="text-center card my-3">
      <CardBody>
        <form onSubmit={handleFormSubmit}>
          <Typography variant="h6" gutterBottom>
            CREATE POST
          </Typography>
          <div className="mb-3">
            <TextField
              fullWidth
              label="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              name="description"
            />
          </div>
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
          <div id="error-msg"></div>
          <Button type="submit" variant="contained" className="mt-2">
            CREATE POST
          </Button>
          <div id="error-msg"></div>
        </form>
      </CardBody>
    </Card>
  );
};

export default NewPostForm;
