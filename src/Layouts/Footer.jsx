import React from 'react';

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer w-screen p-10 bg-blue-600 text-primary-content footer-center absolute bottom-0">
      <div>
        <p className="text-center text-white">
          Copyright &copy; {footerYear} All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
