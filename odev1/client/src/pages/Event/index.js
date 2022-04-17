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
    console.log(data.event)
    const { event } = data
    return (
        <>
            <div className={styles.eventTitle}>
                <span>Etkinlik sahibi</span>
                <span>Adress</span>
                <span>Katılımcılar</span>
            </div>
            <div className={styles.eventContent}>
                <div>
                    {event.user.username}
                </div>
                <div>
                    {event.location.name}
                </div>

                <div className={styles.eventParticipants}>
                    {
                        event.participants.map((item, i) => (
                            <div className={styles.eventOneParticipant}> {item.user.username} </div>
                        ))

                    }
                </div>

            </div>
        </>
    )
}

export default Event
