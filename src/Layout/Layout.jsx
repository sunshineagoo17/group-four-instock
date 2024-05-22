import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='page-max-width'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;