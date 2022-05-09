import React, { createContext, useContext } from 'react';
import usePeople from '../hooks/usePeople';
import useFriendRequests from '../hooks/useFriendRequests';
import { usePosts } from '../hooks/usePosts';

/**
 * This context provides data provided by the api, to the entire app.
 */

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [posts, updatePosts] = usePosts();
  const [people, updatePeople] = usePeople();
  const [requests, pendingRequests, updateRequests] = useFriendRequests();

  const value = {
    posts,
    people,
    requests,
    pendingRequests,
    updatePeople,
    updateRequests,
    updatePosts,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
