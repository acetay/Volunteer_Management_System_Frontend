import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    // <div className="min-h-screen md:h-screen  w-screen flex flex-col h-auto justify-between relative">
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
