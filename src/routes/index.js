import React from "react"
import { Redirect } from "react-router-dom"



// Authentication related pages
import Login from "../pages/Authentication/Login"
import ForgetPwd from "../pages/Authentication/Password/ForgetPassword"
import Register from "../pages/Authentication/Register"
import UserActivate from "../pages/Authentication/Invites/UserActivate"
import EmailVerificationMessage from "../pages/Authentication/Email/EmailVerificationMessage"
import EmailVerificationCode from "../pages/Authentication/Invites/EmailVerificationCode"
import ConfirmMail from "../pages/Authentication/Email/ConfirmEmail"
// Dashboard
import Dashboard from "../pages/Dashboard/index"
// Users
import Users from "../pages/Users/Users"
import UserProfiles from "../pages/Users/UserProfile"
import UserInvites from "../pages/Users/UserInvites"
import Rides from "../pages/Rides"
import CarList from "../pages/Cars"



const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: Users },
  { path: "/user-invites", component: UserInvites },
  { path: "/user-profile/:id", component: UserProfiles},
  { path: "/telemetry-data", component: Rides},
  { path: "/vehicles", component: CarList},
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/user-activate", component: UserActivate},
  { path: "/email-verification-message", component: EmailVerificationMessage },
  { path: "/email-verification-code" ,component: EmailVerificationCode },
  { path: "/email-confirmed", component: ConfirmMail }
]

export { publicRoutes, authProtectedRoutes }
