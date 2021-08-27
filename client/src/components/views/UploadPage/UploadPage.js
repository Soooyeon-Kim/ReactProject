import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload  from '../../utils/FileUpload'
import Axios from 'axios';
const { TextArea } = Input;

const GraduStatuss = [
    { key: 1, value: "재학" },
    { key: 2, value: "석사 졸업" },
    { key: 3, value: "학사 졸업" },
    { key: 4, value: "박사 졸업" }
]



function UploadPage(props) {

    const [Title, setTitle] = useState("")
    const [Introduction, setIntroduction] = useState("")
    const [License, setLicense] = useState("")
    const [Major, setMajor] = useState("")
    const [GraduStatus, setGraduStatus] = useState(1) 
    const [Images, setImages] = useState([])


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const introductionChangeHandler = (event) => {
        setIntroduction(event.currentTarget.value)
    }

    const licenseChangeHandler = (event) => {
        setLicense(event.currentTarget.value)
    }

    const majorChangeHandler = (event) => {
        setMajor(event.currentTarget.value)
    }

    const graduStatusSelectChangeHandler = (event) => {
        setGraduStatus(event.currentTarget.value)
    }

    
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    
    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Introduction || !License ||
            !GraduStatus || !Major || !Images.length === 0 ) {
            return alert('모든 양식을 입력해주셔야 합니다.')
        }

        const body = {
            // 로그인 아이디
            writer: props.user.userData._id,
            title: Title,
            images: Images,
            major: Major,
            graduStatus: GraduStatus,
            license: License,
            introduction: Introduction,
        }

        // 서버에 채운 값들을 request로 전송
        Axios.post('/api/profile', body)
            .then(response => {
                if (response.data.success) {
                    alert('프로필 업로드에 성공하였습니다.')
                    props.history.push('/')
                } else {
                    alert('프로필 업로드에 실패하였습니다.')
                    props.history.push('/')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Upload Profile</h2>
            </div>


            <Form onSubmit={submitHandler} >
                {/* 사진 업로드 */}
                <FileUpload refreshFunction={updateImages} />
                

                <br />
                <br />
                <label>이름</label>
                <Input
                    onChange={titleChangeHandler}
                    value={Title}
                />
                <br />
                <br />
                <label>전공</label>
                <Input
                    onChange={majorChangeHandler}
                    value={Major}
                />
                <br />
                <br />
                <label>자격증</label>
                <Input
                    onChange={licenseChangeHandler}
                    value={License}
                />
                <br />
                <br />
                <label>졸업 상태</label>
                <br />
                <br />
                <select onChange={graduStatusSelectChangeHandler} value={GraduStatus}>
                    {GraduStatuss.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                        ))}
                </select>
                <br />
                <br />
                <label>소개</label>
                <TextArea
                    onChange={introductionChangeHandler}
                    value={Introduction}
                />
                <br />
                <br />
                <br />
                <br />
                <Button
                     type="submit"
                     onClick={submitHandler}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadPage