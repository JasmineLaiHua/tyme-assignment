import { Link } from 'react-router-dom';
import { Flex, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { purple } from '@ant-design/colors';


const logoStyle: React.CSSProperties = {
  color: purple[6],
  fontSize: 24,
  fontWeight: 'bold',
};

const menuStyle: React.CSSProperties = {
  backgroundColor: '#27272a',
  color: '#fff',
};

const items = [
  {
    key: 'Home',
    label: (
      <Link to="/home">
        Home
      </Link>
    ),
    className: 'menu-item',
  },
  {
    key: 'About',
    label: (
      <Link to="/about">
        About
      </Link>
    ),
    className: 'menu-item',
  },
  {
    key: 'Teams',
    label: (
      <Link to="/teams">
        Teams
      </Link>
    ),
    className: 'menu-item',
  },
  {
    key: 'Marketplace',
    label: (
      <Link to="/marketplace">
        Marketplace
      </Link>
    ),
    className: 'menu-item',
  },
  {
    key: 'Whitepaper',
    label: (
      <Link to="/whitepaper">
        Whitepaper
      </Link>
    ),
    className: 'menu-item',
  },
];

const NavMenu = () => {

  const [current, setCurrent] = useState('Marketplace');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        padding: '0 24px',
        backgroundColor: 'rgb(39, 39, 42)',
        height: '64px'
      }}
    >
      <div style={logoStyle}>
        <span>NFT Market</span>
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={menuStyle}
      />
    </Flex>
  );
};

export default NavMenu;
