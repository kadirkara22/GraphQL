import React, { useEffect } from 'react'
import { List, Skeleton } from 'antd';
import { useQuery } from '@apollo/client';
import Loading from 'components/Loading';
import { GET_EVENTS, EVENTS_SUBSCRIPTION } from './queries'
import styles from './styles.module.css'
import { Link } from 'react-router-dom';

const Home = () => {

    const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

    useEffect(() => {
        subscribeToMore({
            document: EVENTS_SUBSCRIPTION,
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

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <List
                className="demo-loadmore-list"
                loading={false}
                itemLayout="horizontal"
                //loadMore={loadMore}
                dataSource={data.events}
                renderItem={item => (
                    <List.Item>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<Link to={`/event/${item._id}`} className={styles.listTitle}>{item.title}</Link>}
                                description={<Link to={`/event/${item._id}`} className={styles.listItem}>{item.desc.slice(0, 200) + "..."}</Link>}
                                className={styles.event_content}
                            />
                            <div className={styles.date}>{new Date(item.date).toLocaleDateString()}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Home
