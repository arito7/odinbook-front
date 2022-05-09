import { useEffect, useState } from 'react';
import axios from '../configs/axios';

/**
 * @returns [requests, pendingRequests, updateRequests]
 */
export default function useFriendRequests() {
  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  function updateRequests() {
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
  }

  useEffect(() => {
    updateRequests();
  }, []);

  return [requests, pendingRequests, updateRequests];
}
