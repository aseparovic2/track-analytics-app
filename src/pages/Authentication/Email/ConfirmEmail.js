import React from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

const ConfirmMail = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Confirm Mail | INSPECTOR</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5">

        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <p className="mt-3">INSPECTOR</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bx-mail-send h1 mb-0 text-primary" />
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Success !</h4>
                        <p className="text-muted">
                          You have verified you e-mail.Please log-in now.
                        </p>
                        <div className="mt-4">
                          <Link to="/login" className="btn btn-success">
                            Login
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default ConfirmMail
