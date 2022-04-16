import React from 'react'
import { List, Avatar, Button, Skeleton } from 'antd';

const list = [
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Rodrigo",
            "last": "Gomes"
        },
        "email": "rodrigo.gomes@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/86.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/86.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/86.jpg"
        },
        "nat": "BR"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Rodrigo",
            "last": "Gomes"
        },
        "email": "rodrigo.gomes@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/86.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/86.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/86.jpg"
        },
        "nat": "BR"
    }
]
const Home = () => {
    return (
        <div>
            <List
                className="demo-loadmore-list"
                loading={false}
                itemLayout="horizontal"
                //loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>content</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Home
