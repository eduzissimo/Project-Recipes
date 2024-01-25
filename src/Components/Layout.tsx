import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const showFooter = ['/meals', '/drinks', '/profile'].includes(location.pathname);

  return (
    <>
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}

export default Layout;
