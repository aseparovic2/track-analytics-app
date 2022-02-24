import React, { useEffect, useState } from "react"
import { Button, Row, Col, Card, CardBody, Modal, Container, Alert, Form, FormFeedback, Input } from "reactstrap"
import MetaTags from "react-meta-tags"
import { useHistory } from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { removeBodyCss } from "../../helpers/removeBodyCss"
import { useFormik } from "formik"
import * as Yup from "yup"
import DataTable from "../../components/Common/DataTable/DataTable"
import { useMutation, useQuery } from "jsonapi-react"
import { fireAlert } from "../../components/Common/Alert"


const Users = () => {

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inspector Web app</title>
        </MetaTags>
        <Container fluid>
          <div className="container-fluid">
            <Breadcrumbs title="Permissions" breadcrumbItem="Users" />
            <Row>
              <h4>USERS</h4>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Users
