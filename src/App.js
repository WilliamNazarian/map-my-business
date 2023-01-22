import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import MyNavbar from "./BootstrapComponents/MyNavbar";
import MyVerticallyCenteredModal from "./BootstrapComponents/MyVerticallyCenteredModal";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCircleDown, faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { Commit, noOfUsers } from "./api/api";

library.add(fab, faCircleDown, faCircleUp);



const AnyReactComponent = ({ text }) => <div>{text}</div>;

function App() {

  const [showForm, setShowForm] = useState(false)
  const [User, setUser] = useState([])
  const [HeatMap, setHeatMap] = useState([]);
  const [UserStruc, setUserStruc] = useState([]);



  useEffect(() => {
    Commit().then(val => {
      setUser(val)
      noOfUsers()
    }
    ).catch((error) => { console.log(error.message) })
  }, [])
  useEffect(() => {
    noOfUsers().then((response) => {
      setUserStruc(response)
    }).catch((error) => {
      console.log(error.message)
    })
  }, [])

  useEffect(() => {
    let position = []
    if (User.length != 0) {
      User.map((val) => {
        console.log(val)
        UserStruc.map(el => {
          if (el.login == val.username) {
            for (let i = 0; i < el.counter; i++) {
              position.push(val.coord);
            }
          }
        })
      })
      setHeatMap(position)
    }
    console.log(position)

  }, [User])


  const defaultProps = { center: { lat: 45.5019, lng: -73.5674 }, zoom: 11 };

  const heatMapData = {
    positions: HeatMap,
    options: {
      radius: 50,
      opacity: 0.6,
    }
  }


  const formClickHandler = () => {
    setShowForm(true);
  };

  return (
    <>
      {<MyVerticallyCenteredModal show={showForm} onHide={() => setShowForm(false)} />}
      <MyNavbar onShow={formClickHandler} />
      {/*Important! Always set the container height explicitly */}
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBhll2fXJ6qdqAJlBfBHv4g5y30vdM1IqY" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} heatmapLibrary={true} heatmap={heatMapData}>
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </>
  );
}

export default App;
