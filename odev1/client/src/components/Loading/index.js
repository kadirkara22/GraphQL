import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from "./styles.module.css"
const Loading = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div className={styles.Loading}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default Loading
