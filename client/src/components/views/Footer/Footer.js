import React from 'react'
import { HeartTwoTone } from '@ant-design/icons';


function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> Welcome <HeartTwoTone twoToneColor="#eb2f96" /></p>
        </div>
    )
}

export default Footer