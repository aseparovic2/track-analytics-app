import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { withRouter, useHistory } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"
import { getAuth } from "firebase/auth"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [username, setusername] = useState("User")
  const history = useHistory();
  const authentication = getAuth();

  useEffect(() => {
   setusername(authentication?.currentUser?.email)
  }, [authentication])

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        console.log(obj)
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.username)
      }
    }
  }, [])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
            onClick={() => {
              history.push('/user-profile/1')
            }}
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="#">
            <i className="bx bx-wrench font-size-16 align-middle me-1"/>
            {props.t("Settings")}
          </DropdownItem>
          <div className="dropdown-divider"/>
          <div className="dropdown-item" onClick={() => {
            localStorage.removeItem("authUser")
            history.push('/')
          }}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
            <span>{props.t("Logout")}</span>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

export default withRouter((withTranslation()(ProfileMenu))
)
