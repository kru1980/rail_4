import React from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

const BsNavLink = ({ title, route }) => {
  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};

const LogOutFn = () => {
  //Ебучие рога, если делаем логоут с главной страницы header приложения не обновляется
  TODO: axios
    .get("/users/logout")
    .then(() => Cookies.remove("jwt"))
    .then(() => Router.push("/login"))
    .catch(err => console.log(err));
};

const Logout = () => {
  return (
    <span
      className="nav-link port-navbar-link clickable"
      onClick={() => LogOutFn()}
    >
      Logout
    </span>
  );
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isAuthenticated: this.props.isAuthenticated // данные получим через контекст из _app, там посадим слушателя
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      isAuthenticated: this.props.isAuthenticated
    });
  }
  render() {
    const { isAuthenticated } = this.state;
    return (
      <div>
        <Navbar
          className="port-navbar port-default absolute"
          color="transparent"
          dark
          expand="md"
        >
          <NavbarBrand className="port-navbar-brand" href="/">
            Rail 2
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Home" route="/" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink title="About" route="/about" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Portfolios" route="/portfolios" />
              </NavItem>
              {/* <NavItem className="port-navbar-item">
                <BsNavLink title="Blog" route="/blog" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Cv" route="/cv" />
              </NavItem> */}
              {!isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <BsNavLink title="Registration" route="/registration" />
                </NavItem>
              )}
              {!isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <BsNavLink title="Login" route="/login" />
                </NavItem>
              )}

              {isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <Logout />
                  {/* logout это ссылка, а не компанент */}
                </NavItem>
              )}

              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
