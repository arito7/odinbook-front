import { useEffect, useState } from 'react';
import axios from '../configs/axios';
import local from '../helpers/localStorage';

// handle when user has no posts
export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  function update() {
    axios
      .get('/posts', { headers: { Authorization: `Bearer ${local.getJwt()}` } })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.posts);
          setPosts(res.data.posts);
        }
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    update();
  }, []);

  return [posts, update];
};
