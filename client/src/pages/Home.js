import { Typography, Row, Col } from 'antd';

import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/home/CategoryList';
import SubcategoryList from '../components/home/SubcategoryList';

const { Title } = Typography;

const Home = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Jumbotron text={['New Arrivals', 'Best Sellers']} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#f6ffed',
              fontSize: 30,
              margin: '40px 0',
            }}
          >
            New Arrivals
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 20, offset: 2 }}
          md={{ span: 20, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
        >
          <NewArrivals />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#fff1f0',
              fontSize: 30,
              margin: '40px 0',
            }}
          >
            Best Sellers
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 20, offset: 2 }}
          md={{ span: 20, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
        >
          <BestSellers />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#efdbff',
              fontSize: 30,
              margin: '40px 0',
            }}
          >
            Categories
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 20, offset: 2 }}
          md={{ span: 20, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
        >
          <CategoryList />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#efdbff',
              fontSize: 30,
              margin: '0 0 40px',
            }}
          >
            Subcategories
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 20, offset: 2 }}
          md={{ span: 20, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
        >
          <SubcategoryList />
        </Col>
      </Row>
    </>
  );
};

export default Home;
