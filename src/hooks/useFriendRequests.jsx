import { useEffect, useState } from 'react';
import axios from '../configs/axios';

/**
 * handle no friends
 * handle no requests
 */
export const useFriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axios
      .get('/users/requests')
      .then((res) => {
        if (res.data.success) {
          const { requests, pendingRequests } = res.data;
          setRequests(requests);
          setPendingRequests(pendingRequests);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return [requests, pendingRequests];
};
