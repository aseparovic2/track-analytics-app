import PropTypes from 'prop-types';
import React from "react";
import { Link } from "react-router-dom";


// Import menuDropdown
import ProfileMenu from "../Common/TopbarDropdown/ProfileMenu";
import smallLogo from 'assets/images/rimac-logo.png'


//i18n
import { withTranslation } from "react-i18next";



const Header = props => {

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">

            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={smallLogo} alt="" height="80" width="80"/>
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={smallLogo} alt="" height="100" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
            {/*<NotificationDropdown />*/}
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  t: PropTypes.any,
};


export default (withTranslation()(Header));
