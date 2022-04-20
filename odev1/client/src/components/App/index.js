import { Row, Col } from 'antd';
import styles from './styles.module.css'

import {
  Routes,
  Route,
} from "react-router-dom";
import Home from 'pages/Home';
import Event from 'pages/Event';
import HeaderMenu from 'components/HeaderMenu';
import PostCounter from 'components/PostCounter';

function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">

        <Col span={12} >
          <Row>
            <Col span={18}><HeaderMenu /></Col>
            <Col span={6}><PostCounter /></Col>
          </Row>

          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<Event />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
