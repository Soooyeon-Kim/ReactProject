import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import { AlignRightOutlined } from '@ant-design/icons';

function NavBar() {
  const [visible, setVisible] = useState(true)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'relative', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a style= {{color: "#adafff"}} href="/">PORTFOLIO</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <div>
          <span style={{top:"17px", right: "50px", position:"absolute"}}>
        <Button type="primary" onClick={ showDrawer} style={{backgroundColor: "#ADAFFF", borderColor: "#ADAFFF", justifyContent:"right"}}>
        Open
        </Button></span>
        <Drawer
        title="another page"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        >
        <LeftMenu mode="inline" />
        <RightMenu mode="inline" />
        </Drawer>
      </div>
     {/* <Button
        className="menu__mobile-button"
        type="primary"
        onClick={showDrawer}>Button</Button>
      <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        > 
        <LeftMenu mode="inline" />
        <RightMenu mode="inline" />
      </Drawer>   */}
      </div>
    </nav>
  )
}

export default NavBar