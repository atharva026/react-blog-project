import React from 'react';

function Footer({ linkedinLink, githubLink }) {
  return (
    <footer
      id="footer"
      style={{ backgroundColor: '#262626' }}
      className="text-white p-4"
    >
      <div className="text-center text-lg break-words container mx-auto">
        © {new Date().getFullYear()} Copyright :
        <a href="/" className="text-white hover:underline">
          BlogBox
        </a>{' '}
        | Made by :{' '}
        <a
          href={linkedinLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-400"
        >
          Atharva Mane
        </a>{' '}
        -{' '}
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 pl-2"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;