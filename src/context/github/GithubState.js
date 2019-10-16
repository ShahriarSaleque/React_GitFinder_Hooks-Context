import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import { SEARCH_USERS, GET_REPOS, GET_USER, SET_LOADING } from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Search Users
  const searchUsers = async name => {
    setLoading();

    const res = await fetch(
      `https://api.github.com/search/users?q=${name}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await res.json();
    const gitnames = data.items;

    dispatch({
      type: SEARCH_USERS,
      payload: gitnames
    });
  };

  //Get User

  //Get Repos

  //SetLoading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
