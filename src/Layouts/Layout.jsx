import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-full flex flex-col h-screen justify-between relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
