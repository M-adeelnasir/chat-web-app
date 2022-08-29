import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userRegister } from '../redux/actions/authActions';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });
  const [preview, setPreview] = useState('');

  const { userName, email, password, confirmPassword, image } = state;

  const hanldeOnChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHendle = (e) => {
    if (e.target.files.length !== 0) {
      setstate({
        ...state,
        [e.target.name]: e.target.files[0],
      });

      setPreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const register = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('image', image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>

        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                onChange={hanldeOnChange}
                name="userName"
                value={state.userName}
                className="form-control"
                placeholder="User Name"
                id="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={hanldeOnChange}
                name="email"
                value={state.email}
                className="form-control"
                placeholder="Email"
                id="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={hanldeOnChange}
                name="password"
                value={state.password}
                className="form-control"
                placeholder="Password"
                id="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                onChange={hanldeOnChange}
                name="confirmPassword"
                value={state.confirmPassword}
                className="form-control"
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {preview ? <img src={preview} /> : ''}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    onChange={fileHendle}
                    name="image"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/login"> Login Your Account </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
