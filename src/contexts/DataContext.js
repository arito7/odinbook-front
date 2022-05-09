import React, { createContext, useContext } from 'react';
import usePeople from '../hooks/usePeople';
import useFriendRequests from '../hooks/useFriendRequests';

/**
 * This context provides data provided by the api, to the entire app.
 */

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [people, updatePeople] = usePeople();
  const [requests, pendingRequests, updateRequests] = useFriendRequests();
  const value = {
    people,
    updatePeople,
    requests,
    pendingRequests,
    updateRequests,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
