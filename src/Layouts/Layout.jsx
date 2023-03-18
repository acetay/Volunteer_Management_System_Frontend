import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen h-auto relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
