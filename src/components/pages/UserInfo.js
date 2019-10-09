import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repo from "../repos/Repo";

const UserInfo = ({ loading, user, repos, match, getUser, getRepos }) => {
  useEffect(() => {
    getUser(match.params.login);

    getRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  if (user && repos) {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      company,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = user;

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Go Back To Main Screen
        </Link>
        Hireable:
        {hireable ? (
          <i className='fas fa-check text-success ml-2' />
        ) : (
          <i className='fas fa-times-circle text-danger ml-2' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              style={{ width: "150px" }}
              alt=''
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public_Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public_Gists: {public_gists}</div>
        </div>
        <h3>Latest Github Repos-</h3>
        <Repo repos={repos} />
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

UserInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired
};

export default UserInfo;
