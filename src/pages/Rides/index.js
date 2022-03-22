import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';

import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap";

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from "../../firebase/firebase-config"
import avatar from "assets/images/users/avatar-2.jpg"
import Breadcrumbs from "components/Common/Breadcrumb"
import RideContact from "../../components/ride-card"
import { isEmpty, size, map } from "lodash"
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";


const users = [
  {
    id: 1,
    name: 'Ride Grobnik 132252',

  },
  {
    id: 2,
    name: 'Dubrovnik tk8',

  },
  {
    id: 2,
    name: 'Zagreb Airport 558g',

  },
  {
    id: 2,
    name: 'Zadar 4959',

  },{
    id: 2,
    name: 'Grobnik 667767',

  },
  {
    id: 2,
    name: 'Gorica jgjt858',

  }
]

//const db = getFirestore(app);

const Rides = () => {
  const [data,setData] = useState([])
  const fetchData =  () => {
    app.collection('telemetry_test').get().then((querySnapshot) => {
      querySnapshot.forEach(el => {
        var data = el.data()
        setData(arr => [...arr, data])
      })
    })
  }
  useEffect(() => {
    //  fetchData()
  },[])
  useEffect(() => {
    console.log(data)
  },[data])
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inspector Web app</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="All Rides" />
          <Row>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label>Select Car</Label>
                <InputGroup>
                  <select className="form-select">
                    <option>Rimac Concept One 588</option>
                    <option>Rimac Never xdggjtr</option>
                  </select>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup className="mb-4">
                <Label>Select Range</Label>
                <InputGroup>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="dd M,yyyy"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d"
                    }}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {map(users, (user, key) => (
              <RideContact user={user} key={"_user_" + key} />
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Rides;
