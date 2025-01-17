import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import MyNavbar from "./BootstrapComponents/MyNavbar";
import MyVerticallyCenteredModal from "./BootstrapComponents/MyVerticallyCenteredModal";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCircleDown, faCircleUp, faSort } from "@fortawesome/free-solid-svg-icons";
import { Commit, noOfUsers } from "./api/api";
import Marker from "google-map-react"
import LeaderBoard from "./BootstrapComponents/LeaderBoard";

import './App.css'

library.add(fab, faCircleDown, faCircleUp);

import { Row, Col, Container, Card, Stack } from "react-bootstrap";

const AnyReactComponent = ({ author, location }) => (
  <>
    <div className="marker" style={{ height: "100px", width: "100px" }}></div>
    <Card className="marker-pointer" style={{ width: '12rem' }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{location}</Card.Text>
      </Card.Body>
    </Card>
  </>

);

async function getMessages() {
  const response = await fetch(".netlify/functions/discord", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return response;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [User, setUser] = useState([]);
  const [HeatMap, setHeatMap] = useState([]);
  const [UserStruc, setUserStruc] = useState([]);


  const renderHeatMap = (owner, repo) => {
    console.log(owner)
    console.log(repo)
    Commit(owner, repo)
      .then((val) => {
        setUser(val);
        render()
      })
      .catch((error) => {
        console.log(error.message);
      });
    noOfUsers(owner, repo)
      .then((response) => {

        /*
        [{login: "", counter: ""}, ....]
        */
        //response.sort()
        setUserStruc(response);
        console.log(response)
        render()
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  useEffect(() => {
    let position = [];
    if (User.length != 0) {
      User.map((val) => {
        UserStruc.map(el => {
          if (el.login == val.username) {
            for (let i = 0; i < el.counter; i++) {
              position.push(val.coord);
            }
          }
        });
      });
      setHeatMap(position);
    }
    console.log(User)

  }, [User, UserStruc])


  const defaultProps = { center: { lat: 45.5019, lng: -73.5674 }, zoom: 17 };

  const [announcements, setAnnouncements] = useState([]);

  const fetchData = async () => {
    getMessages()
      .then((res) => res.data)
      .then((announcements) => {
        setAnnouncements(announcements);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const heatMapData = {
    positions: HeatMap,
    options: {
      radius: 50,
      opacity: 0.6,
    },
  };

  const formClickHandler = () => {
    setShowForm(true);
  };

  const onSubmitHandler = (usersSubmission) => {
    // setUserInputs({ "owner": usersSubmission.githubOwnerUsername, "repo": usersSubmission.repositoryName })
    renderHeatMap(usersSubmission.githubOwnerUsername, usersSubmission.repositoryName)
  };

  return (
    <>
      <MyVerticallyCenteredModal onSubmit={onSubmitHandler} show={showForm} onHide={() => setShowForm(false)} />
      <MyNavbar onShow={formClickHandler} />
      <Container style={{ height: "100vh", maxWidth: "none" }}>
        <Row style={{ maxHeight: "100vh" }}>
          <Col lg={8} style={{ padding: "0" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBhll2fXJ6qdqAJlBfBHv4g5y30vdM1IqY" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              heatmapLibrary={true}
              heatmap={heatMapData}
            >


              {
                User.map(user => (
                  <AnyReactComponent
                    lat={user.coord.lat}
                    lng={user.coord.lng}
                    author={user.Name}
                    location={user.location}
                  />
                ))
              }




            </GoogleMapReact>
          </Col>
          <Col style={{ overflow: "hidden", padding: "0" }}>
            <Stack style={{ alignItems: "center", height: "100vh", overflowY: "scroll", scrollbarWidth: "none" }}>
              <Container style={{ width: "100%" }}>
                <Card border="white" style={{ width: "100%", margin: "auto" }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "2rem", margin: "auto", width: "fit-content", marginBottom: "15px" }}>
                      LeaderBoard
                    </Card.Title>
                    {
                      UserStruc.map(user => (
                        <Card.Text><b>{user.login}</b> has commited {user.counter} times</Card.Text>
                      ))
                    }
                    
                  </Card.Body>
                </Card>
              </Container>
              <hr style={{ width: "100%" }} />
              <Card.Title style={{ fontSize: "2rem", margin: "auto", width: "fit-content", marginBottom: "15px" }}>
                Announcements
              </Card.Title>
              {announcements.map((announcement, index) => {
                return (
                  <>
                    <Container style={{ width: "100%" }} key={index}>
                      <Card border="white" style={{ width: "100%", margin: "auto" }} key={index}>
                        <Card.Body>
                          <Card.Title style={{ fontSize: "1rem" }}>
                            {announcement.author} · <span style={{ color: "grey", fontSize: "0.8rem" }}>{announcement.timestamp}</span>
                          </Card.Title>
                          <Card.Img variant="top" src={typeof announcement.image[0] != "undefined" ? announcement.image[0].url : image} style={{ objectFit: "cover", marginBottom: "0.7rem", marginTop: "0.4rem" }} />
                          <Card.Text>{announcement.content}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Container>
                    <hr style={{ width: "100%" }} />
                  </>
                );
              })}
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
