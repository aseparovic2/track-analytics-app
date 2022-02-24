import React from "react"
import MetaTags from "react-meta-tags"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

const EmailVerificationMessage = () => {
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <MetaTags>
          <title>Email Verification | INSPECTOR </title>
        </MetaTags>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                {/*LOGO GOES HERE*/}
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
                          <i className="bx bxs-envelope h1 mb-0 text-primary" />
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p>
                          We have sent you verification email{" "}
                          <span className="font-weight-semibold">
                            example@abc.com
                          </span>
                          , Please check it
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Did&apos;t receive an email ?{" "}
                  <a href="#" className="fw-medium text-primary">
                    {" "}
                    Resend{" "}
                  </a>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default EmailVerificationMessage
