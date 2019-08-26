import React from "react";
import Link from "../activeLink";

const Header = () => {
  return (
    <nav>
      <Link activeClassName="active" href="/">
        <a className="nav-link home-link" title="Main Page">
          Main Page
        </a>
      </Link>

      <Link activeClassName="active" href="/about" as="about">
        <a className="nav-link" title="About Page">
          About Page
        </a>
      </Link>
      <Link activeClassName="active" href="/portfolios" as="portfolios">
        <a className="nav-link" title="Batman Page">
          Portfolios Page
        </a>
      </Link>
    </nav>
  );
};

export default Header;
