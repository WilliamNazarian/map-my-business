
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Row, Col, Container, Button, ListGroup, Card, Stack } from 'react-bootstrap';
import image from "./logo512.png";
import axios from 'axios'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const BOT_TOKEN = 'MTA2NjQ2Nzg5MzMyMTE1ODY5Ng.Gf2Kc0.7gL6mbWaTwI_Ni39VZCa7ZIL1bogPpd92vurRg';
const CHANNEL_ID = '1066469784742527106';

async function getMessages() {
  const response = await fetch('http://localhost:8888/.netlify/functions/discord', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    return response;
}


const AnyReactComponent = ({ text }) => <div>{text}</div>;

function App() {
  const defaultProps = {
    center: {
      lat: 45.5019,
      lng: -73.5674
    },
    zoom: 11
  };

  const [announcements, setAnnouncements] = useState([]);


  const fetchData = async () =>{

    getMessages()
      .then(res => res.data)
      .then(announcements => {
        console.log(announcements)
        setAnnouncements(announcements)
      })

  }

  useEffect(()=>{
      fetchData();
  },[]);
  
  const heatMapData = {
    positions: [
      { lat: 55.5, lng: 34.56 },
      { lat: 34.7, lng: 28.4 },
    ],
    options: {
      radius: 20,
      opacity: 0.6,
    }
  }

  return (
    // Important! Always set the container height explicitly
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
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </Col>
        <Col style={{overflow: "hidden", padding: "0"}}>
          {/* <Button onClick={() => getMessages()} variant="primary">sendMessage</Button> */}
          <Stack style={{alignItems: "center", height: "100vh", overflowY: "scroll", scrollbarWidth: "none"}}>
            {
              announcements.map( (announcement, index) => {
                return (
                  <>
                  <Container style={{width: "100%"}}>
                  <Card border="white" style={{ width: '100%', margin: "auto" }} key={index}>
                    <Card.Body>
                      <Card.Title style={{ fontSize: "1rem" }}>{announcement.author} · <span style={{ color: "grey", fontSize: "0.8rem"}}>{announcement.timestamp}</span></Card.Title>
                      <Card.Img variant="top" src={(typeof(announcement.image[0]) != 'undefined' ) ? announcement.image[0].url : image} style={{objectFit: "cover", marginBottom: "0.7rem", marginTop: "0.4rem"}} />
                      <Card.Text>
                      {announcement.content}
                      </Card.Text>
                    </Card.Body>

                  </Card>    
                      
                  </Container>
                  <hr style={{width: "100%"}}/>   
                  </>  
                )
              })
            }

          </Stack>
        </Col>
      </Row>
    </Container >
  );
}

export default App;