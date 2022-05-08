import { useEffect, useState } from 'react';
import axios from '../configs/axios';

export default function usePeople() {
  const [people, setPeople] = useState([]);

  const update = () => {
    axios
      .get('/users/people')
      .then((res) => {
        if (res.data.success) {
          setPeople(res.data.people);
        }
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    update();
  }, []);

  return [people, update];
}
