import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container
} from "reactstrap"
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from "../../firebase/firebase-config"

//const db = getFirestore(app);

const Dashboard = () => {
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
            <h4>Dashboard</h4>
          </Container>
        </div>
      </React.Fragment>
    )
}

export default Dashboard;
