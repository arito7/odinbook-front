import { useEffect, useState } from 'react';
import axios from '../configs/axios';

export default function usePeople() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get('/users/people')
      .then((res) => {
        if (res.data.success) {
          setPeople(res.data.people);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return people;
}
