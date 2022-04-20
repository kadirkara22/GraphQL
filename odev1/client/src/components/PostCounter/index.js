import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { Badge, Avatar } from 'antd';
import { useQuery, useSubscription } from '@apollo/client';
import { EVENT_COUNT_SUBSCRIPTION } from './queries';
import { GET_EVENTS } from 'pages/Home/queries';
const PostCounter = () => {
    const { loading, data, subscribeToMore } = useQuery(GET_EVENTS);

    useEffect(() => {
        subscribeToMore({
            document: EVENT_COUNT_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                return {
                    events: [
                        subscriptionData.data.eventCreated,
                        ...prev.posts

                    ]
                }
            }
        })

    }, [subscribeToMore])
    //const { loading, data } = useSubscription(EVENT_COUNT_SUBSCRIPTION)
    console.log(loading, data)
    return (
        <div className={styles.container}>
            <Badge count={loading ? '?' : data.events.length} size="small">
                <Avatar shape="square" size="mideum">
                    <span className={styles.counterTitle}>Posts</span>
                </Avatar>
            </Badge>
        </div>
    )
}

export default PostCounter
