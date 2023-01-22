import React from "react";
import GoogleMapReact from 'google-map-react';
import { Row, Col, Container, Button, ListGroup, Card, Stack } from 'react-bootstrap';
import axios from 'axios'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const BOT_TOKEN = 'MTA2NjQ2Nzg5MzMyMTE1ODY5Ng.Gf2Kc0.7gL6mbWaTwI_Ni39VZCa7ZIL1bogPpd92vurRg';
const CHANNEL_ID = '1066469784742527106';

async function getMessages() {
  fetch('http://localhost:8888/.netlify/functions/discord', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => console.log(data))
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
      <Row style={{ height: "100vh" }}>
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
        <Col>
          {/* <Button onClick={() => getMessages()} variant="primary">sendMessage</Button> */}
          <Stack gap={3}>
            <Card border="light" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>Alec Tufenkjian</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Stack>
        </Col>
      </Row>
    </Container >
  );
}

export default App;