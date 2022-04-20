import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, GET_EVENT_MUTATION, GET_LOCATIONS } from './queries'
const { Option } = Select;
const NewEventForm = () => {
    const navigate = useNavigate();
    const [saveEvent, { loading }] = useMutation(GET_EVENT_MUTATION)
    const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS)
    const { loading: get_locations_loading, data: locations_data } = useQuery(GET_LOCATIONS)

    const handleSubmit = async (values) => {
        try {
            await saveEvent({
                variables: {
                    data: values,
                }
            })
            message.success('Event Saved', 4);
            navigate('/');
        } catch (err) {
            message.error('Event is not Saved', 10);
        }
    }

    return (
        <Form
            name="basic"
            onFinish={handleSubmit}
            autoComplete="off"
        >
            <Form.Item
                name="title"
                rules={[{ required: true, message: 'Please input Event Title!' }]}

            >
                <Input placeholder="Title" disabled={loading} />
            </Form.Item>

            <Form.Item
                name="desc"
                rules={[{ required: true, message: 'Please input Event description!' }]}
            >
                <Input.TextArea size="large" placeholder="description" disabled={loading} />
            </Form.Item>
            <Form.Item
                name="location_id"
                rules={[{ required: true, message: 'Please select location!' }]}
            >
                <Select disabled={get_locations_loading || loading} loading={get_locations_loading} placeholder="select your location">
                    {
                        locations_data && locations_data.locations.map((item) =>
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        )
                    }

                </Select>
            </Form.Item>

            <Form.Item
                name="date"
                rules={[{ required: true, message: 'Please input Date!' }]}>
                <DatePicker disabled={loading} />
            </Form.Item>
            <Form.Item
                name="user_id"
                rules={[{ required: true, message: 'Please select user!' }]}
            >
                <Select disabled={get_users_loading || loading} loading={get_users_loading} placeholder="select your user">
                    {
                        users_data && users_data.users.map((item) =>
                            <Option key={item.id} value={item.id}>{item.username}</Option>
                        )
                    }

                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewEventForm
