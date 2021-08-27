import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Card, Row, Carousel } from 'antd';
import  Meta  from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import { graduStatus } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {

    const [Profiles, setProfiles] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        graduStatus: []
    })

    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        const body = {
            skip: Skip,
            limit: Limit
        }

        getProfiles(body)

    }, [])

    const getProfiles = (body) => {
        
        axios.post('/api/profile/profiles', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProfiles([...Profiles, ...response.data.profileInfo])
                    } else {
                        setProfiles(response.data.profileInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 정보를 가져오는데 실패 했습니다.")
                }
            })
    }


    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        const body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        }

        getProfiles(body)
        setSkip(skip)
    }


    const renderCards = Profiles.map((profile, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<a href={`/profile/${profile._id}`} ><ImageSlider images={profile.images} /></a>}
            >
                <Meta
                    title={profile.title}
                    description={`${profile.major}`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        const body = {
            skip: 0,
            limit: Limit,
            filters: filters,
            
        }

        getProfiles(body)
        setSkip(0)

    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProfiles(body)

    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h1>Elice Portfolio</h1><br /><br />
            </div>

            {/* Filter */}

            {/* CheckBox */}
            {/* <Checkbox list={graduStatus} handleFilters={filters => handleFilters(filters, "graduStatus")} /> */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <Checkbox list={graduStatus} handleFilters={filters => handleFilters(filters, "graduStatus")} />
                </Col>
            </Row>
            {/* RadioBox */}



            {/* Search */}

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>
            {/* Cards */}


            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>

            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHanlder}>더보기</button>
                </div>
            }

        </div>
    )
}

export default LandingPage