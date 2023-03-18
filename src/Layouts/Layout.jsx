import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen h-auto">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
