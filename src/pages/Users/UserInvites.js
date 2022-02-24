import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"


const UserInvites = () => {

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inspector Web app</title>
        </MetaTags>
        <Container fluid>
          <div className="container-fluid">
            <Breadcrumbs title="Users" breadcrumbItem="Invites" />
            <Row>
              <h4>USER INVITES</h4>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default UserInvites
