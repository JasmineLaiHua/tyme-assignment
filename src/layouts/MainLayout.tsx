import { Outlet } from 'react-router-dom';

import Showcase from './Showcase';
import Footer from './Footer';
import Header from './NavMenu';

import '@/styles/layouts/MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="layout">
      <Header />
      <Showcase />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
