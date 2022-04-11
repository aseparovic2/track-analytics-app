import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import { ADD_CAR, ALL_CARS, DELETE_CAR } from "../../graphql/queries/cars"
import { useMutation, useQuery } from "@apollo/client"
import Select from "react-select";


//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import { fireAlert } from "../../components/Common/Alert"
import { ALL_USERS } from "../../graphql/queries/users"


const CarList = props => {
  const [contact, setContact] = useState({});
  const [car, setCar] = useState({});
  const { loading, error, data } = useQuery(ALL_CARS);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: contact,
    validationSchema: Yup.object({
      //_id: Yup.string().required("ID is required"),
     // description: Yup.string().required("Please Enter Vehicle Description"),
      //vin: Yup.array().required("Please Enter Vehicle VIN nu,ber"),
    }),
    onSubmit: (values) => {
      console.log('aleeeee' , values)
      if (isEdit) {
        //edit car

      } else {
        //add new car

        setCar({
           battery: "999kWh",
           body: values.body,
           color: "PURPLE",
           licence: values.licence,
           model:values.model,
           power: values.power,
           range: "999 km",
           torque: values.torque,
           transmission: "SINGLE-SPEED GEARBOXES",
                  user_id: {
                      link: "6247454e1f27938b40b66efb"
                  }
        })
        addCar().then(res => {
          fireAlert("Add Vehicle","Vehicle added successfully","success")
          console.log(res.data.insertOneCar)
          let arr = [...vehicles]
          arr.push(res.data.insertOneCar)
          setVehicles(arr)
        })
      }
      toggle();
    },
  });

  const [userList, setUserList] = useState([]);
  const [vehicles, setVehicles] = useState([])
  const [id, setId] = useState("")
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteCar, {}] = useMutation(DELETE_CAR, {
    variables: {
      carId: id
    }});

  const [addCar] = useMutation(ADD_CAR, {
    variables: {
      carData: car
    }});

  const { data: usersData} = useQuery(ALL_USERS);

  useEffect(() => {
     console.log(usersData)
  }, [usersData])


  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: vehicles.length, // replace later with size(users),
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];


  const contactListColumns = [
    {
      text: "ID",
      dataField: "_id",
    },
    {
      text: "Model",
      dataField: "model",
      sort: true,
    },
    {
      text: "Body",
      dataField: "body",
      sort: true,
    },
    {
      text: "Color",
      dataField: "color",
      sort: true,
      hidden: true,
    },
    {
      text: "Battery",
      dataField: "battery",
      sort: true,
      hidden: true,
    },
    {
      text: "Licence",
      dataField: "licence",
      sort: true,
    },
    {
      text: "Power",
      dataField: "power",
      sort: true,
    },
    {
      text: "Range",
      dataField: "range",
      sort: true,
      hidden: true,
    },
    {
      text: "Torque",
      dataField: "torque",
      sort: true,
    },
    {
      text: "Transmission",
      dataField: "transmission",
      sort: true,
      hidden: true,
    },
    {
      text: "Owner ID",
      dataField: "email",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => {
        console.log(user)
        return (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {user?.user_id?.email}
              </Link>
            </h5>
          </>
        )
      },
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            />
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
               id="deletetooltip"
                onClick={() => onClickDelete(user)}
                />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (data?.cars !== undefined) {
      console.log(data?.cars)
      setVehicles(data.cars)
    }
  }, [data])


  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = arg => {
    const user = arg;
    console.log(user)
    setContact({
      _id: user._id,
      model: user.model,
      body: user.body,
      licence: user.licence,
      power: user.power,
      torque: user.torque,
      ownerEmail: user.user_id.email,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = async (users) => {
    await setId(users._id);
    deleteCar().then((res) => {
      let newState = [...vehicles]
      let index = newState.findIndex((i) => {
        return i._id === res.data.deleteOneCar._id
      })
      newState.splice(index, 1)
      setVehicles(newState)
      fireAlert("Delete Vehicle","Vehicle deleted successfully","success")
    })

    setDeleteModal(true);
  };

  const handleDeleteUser = () => {

  };

  const handleUserClicks = () => {
    setUserList("");
    setContact({})
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Car List</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Engineer" breadcrumbItem="Vehicle List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={vehicles}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={vehicles}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Vehicle
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit Vehicle" : "Add Vehicle"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Owner</Label>
                                                 <Select
                                                   value={usersData?.users.find((o) => {
                                                     return o._id === validation.values._id
                                                   })}
                                                   isMulti={false}
                                                   getOptionValue={(option) => option._id}
                                                   getOptionLabel={(option) => option.email}
                                                   onChange={validation.handleChange}
                                                   options={usersData?.users}

                                                 />
                                              </div>
                                            </Col>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Model</Label>
                                                <Input
                                                  name="model"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.model || ""}
                                                  invalid={
                                                    !!(validation.touched.model && validation.errors.model)
                                                  }
                                                />
                                                {validation.touched.model && validation.errors.model ? (
                                                  <FormFeedback type="invalid">{validation.errors.model}</FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Body</Label>
                                                <Input
                                                  name="body"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.body || ""}
                                                  invalid={
                                                    !!(validation.touched.body && validation.errors.body)
                                                  }
                                                />
                                                {validation.touched.body && validation.errors.body ? (
                                                  <FormFeedback type="invalid">{validation.errors.body}</FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Licence</Label>
                                                <Input
                                                  name="licence"
                                                  label="Licence"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.licence || ""}
                                                  invalid={
                                                    !!(validation.touched.licence && validation.errors.licence)
                                                  }
                                                />
                                                {validation.touched.licence && validation.errors.licence ? (
                                                  <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                                                ) : null}
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                               <Button color={"primary"} type={"submit"}>Save</Button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      );
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CarList);
