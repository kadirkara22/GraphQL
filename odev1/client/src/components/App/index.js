import { Row, Col } from 'antd';
import styles from './styles.module.css'

import {
  Routes,
  Route,
} from "react-router-dom";
import Home from 'pages/Home';
import Event from 'pages/Event';

function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={12} className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<Event />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
