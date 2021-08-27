import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProfileImage from './Sections/ProfileImage';
import ProfileInfo from './Sections/ProfileInfo';
import { Row, Col } from 'antd';

function DetailProfilePage(props) {

    const profileId = props.match.params.profileId

    const [Profile, setProfile] = useState({})

    useEffect(() => {
        axios.get(`/api/profile/profiles_by_id?id=${profileId}&type=single`)
            .then(response => {
                setProfile(response.data[0])
            })
            .catch(err => alert(err))
    }, [])



    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Profile.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* ProfileImage */}
                    <ProfileImage detail={Profile} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProfileInfo */}
                    <ProfileInfo detail={Profile} />
                </Col>
            </Row>





        </div>
    )
}

export default DetailProfilePage