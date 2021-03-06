/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";



function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail" style= {{margin:"10px 0 0 0"}}>
          <a style={{fontSize: "15px"}} href="/login">login</a>
        </Menu.Item>
        <Menu.Item key="app" style= {{margin:"10px 0 0 0"}} >
          <a style={{fontSize: "15px"}} href="/register">sign up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload" style= {{margin:"10px 0 0 0"}}>
          <a href="/profile/upload">Upload Profile</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>๋ก๊ทธ์์</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);