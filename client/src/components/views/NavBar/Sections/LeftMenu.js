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
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu
