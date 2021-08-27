import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
function ProfileInfo(props) {
    const dispatch = useDispatch();


    return (
        <div>
            <Descriptions title="Profile Info">
                <Descriptions.Item label="name">{props.detail.title}</Descriptions.Item>
                <Descriptions.Item label="graduStatus">{props.detail.graduStatus}</Descriptions.Item>
                <Descriptions.Item label="Major">{props.detail.major}</Descriptions.Item>
                <Descriptions.Item label="License">{props.detail.license}</Descriptions.Item>
                <Descriptions.Item label="Introduction">{props.detail.introduction}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            </div>


        </div>
    )
}

export default ProfileInfo