import React from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail" style= {{margin:"10px 0 0 0"}}>
      <a style={{fontSize: "15px"}} href="/">Home</a>
    </Menu.Item>
    <SubMenu style= {{margin:"10px 0 0 0", fontSize: "15px"}} key="SubMenu" title="Submenu">
      <MenuItemGroup title="About">
        <Menu.Item key="setting:1"><a href="https://kdt.lms.elice.io/home">Hello Elice!</a></Menu.Item>
        <Menu.Item key="setting:2"><a href = "https://kdt-gitlab.elice.io/">Projects</a></Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Reference">
        <Menu.Item key="setting:3"><a href = "https://ant.design/">ant design</a></Menu.Item>
        <Menu.Item key="setting:4"><a href = "https://ko.reactjs.org/docs/forms.html">React</a></Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu
