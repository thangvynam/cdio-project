import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar, Nav } from "shards-react";

import UserActions from "./UserActions";

const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <Nav className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" />
          <Nav navbar className="border-left flex-row">
            <UserActions />
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  layout: PropTypes.string,
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
