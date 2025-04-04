import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { PhoneOutlined, MessageOutlined } from '@ant-design/icons';
import '@/styles/layouts/Footer.scss';

const colStyle: React.CSSProperties = {
  color: '#fff',
};


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8} style={colStyle}>
          <h3>Quick Links</h3>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>Home</Col>
            <Col xs={24} sm={8}>Whitepaper</Col>
            <Col xs={24} sm={8}>FAQs</Col>
            <Col xs={24} sm={8}>About Us</Col>
            <Col xs={24} sm={8}>Marketplace</Col>
            <Col xs={24} sm={8}>News</Col>
            <Col xs={24} sm={8}>Our Teams</Col>
            <Col xs={24} sm={8}>Roadmap</Col>
            <Col xs={24} sm={8}>Community</Col>
          </Row>
        </Col>
        <Col xs={24} sm={6} style={colStyle}>
          <h3>Contact Us</h3>
          <Row gutter={[16, 16]}>
            <Col xs={24}><PhoneOutlined /> +84 123 456 789</Col>
            <Col xs={24}><MessageOutlined /> icebear@yopmail.com</Col>
          </Row>
        </Col>
        <Col xs={24} sm={10}>
          <h3>Subscribe</h3>
          <Row gutter={[16, 16]}>
            <Col xs={18}>
              <Input placeholder="Enter your email" />
            </Col>
            <Col xs={6}>
              <Button type="primary" block style={{ backgroundColor: '#8b4fd8' }}>
                Subscribe
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ice Bear. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
