import React, { useEffect } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card
import CardDrive from "../../components/card-drive"

const SharedDrives = props => {
  const users = [
    {
      id: 1268554,
      name: 'Test Drive 1268554',
      designation: 'Owner 9778',
    },
    {
      id: 8879825,
      name: '8879825 Testing',
      designation: 'Owner 5588',
    },
    {
      id: 998568,
      name: 'Testing 998568',
      designation: 'Owner 9889',
    }
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Shared data - Rimac Telemetry App</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Shared" breadcrumbItem="Telemetry" />

          <Row>
            {map(users, (user, key) => (
              <CardDrive user={user} key={"_user_" + key} />
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(SharedDrives)
