import React from "react"
import MetaTags from 'react-meta-tags';
import {
  Container
} from "reactstrap"


const Dashboard = () => {
  return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Inspector Web app</title>
          </MetaTags>
          <Container fluid>
            <h4>Dashboard</h4>
          </Container>
        </div>
      </React.Fragment>
    )
}

export default Dashboard;
