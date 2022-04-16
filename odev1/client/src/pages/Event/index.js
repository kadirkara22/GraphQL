import { useQuery } from '@apollo/client';
import Loading from 'components/Loading';
import React from 'react'
import { useParams } from 'react-router-dom'
import { GET_EVENT } from './queries'
import { Typography } from 'antd';
import styles from './styles.module.css'
import Item from 'antd/lib/list/Item';
const { Title } = Typography;

const Event = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_EVENT, {
        variables: {
            id,
        }
    });

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    console.log(data)
    const { event } = data
    return (
        <div>
            <Title level={3}>{event.title}</Title>
            <div>
                {event.location.name}
            </div>
            <div>
                {event.user.username}
            </div>
            <div>

            </div>

            {/* <Comments post_id={id} /> */}
        </div>
    )
}

export default Event
