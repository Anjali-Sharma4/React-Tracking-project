import React, { Component } from "react";
import { Map, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import '../LeafletCluster.css';
import MarkerClusterGroup from "react-leaflet-markercluster";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import axios from 'axios';
import {
  GoogleMap,
  Polyline
} from "react-google-maps";
export default class LeafletCluster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat:18.559008,
      lng:-68.388881,
      zoom: 15,
      maxZoom: 30,
      path : [],
      progress: [],
      counter: 0
    };
  }
   componentWillMount() {
        let data ;
       axios.get('http://localhost:8000/LiveMap/coordinates/')
            .then(res => {
            console.log( "here",res)
            data = res.data;
            this.setState({
                path : data

            });
        console.log("hi",this.state.paths)
        })
        .catch(err => {})
        this.interval = window.setInterval(this.moveObject, 1000);
    }


    velocity = 5;
    initialDate = new Date();
    getDistance = () => {
    const differentInTime = (new Date() - this.initialDate) / 1000;
    return differentInTime * this.velocity;
  };
    componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 1000);
  };
  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };
  moveObject = () => {
    const distance = this.getDistance();
    if (!distance) {
      return;
    }
    // ------------ERROR---------------------------
    const progress = this.state.path.filter(
      coordinates => coordinates.distance < distance
    );
    this.setState({ progress });
  };
  customIconCreateFunction(cluster) {
      return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom",
      iconSize: L.point(40, 40, true)
    });
  }
  renderPopup(index) {
  return (
    <Tooltip
      tipSize={5}
      anchor="bottom-right"
      longitude={this.state.path[index].position[0].longitude}
      latitude={this.state.path[index].position[0].latitude}
       onMouseLeave={() => this.setState({ popupInfo: null })}
       closeOnClick={true}
    >
      <p>
       <strong>Vehicle Number: {this.state.path[index].vehicle_number}</strong>
        <br />
                Speed: {this.state.path[index].speed}
        <br />
                Location: {this.state.path[index].current_location}
      </p>
    </Tooltip>
  );
}
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={4} maxZoom={20}>
        <ReactLeafletGoogleLayer googleMapsLoaderConf={{KEY: 'AIzaSyDZyk30qeWjK_Ba8d08upoqsj9wkfJ-L1g'}}/>
        <MarkerClusterGroup
          showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
          iconCreateFunction={this.customIconCreateFunction}
        >
          {this.state.path.map((marker, index) => {
           <Polyline>
             path={this.state.progress}
              options={{ strokeColor: "#FF0000 " }}
            </Polyline>
            // console.log(this.state.paths[0].position[0].latitude)
            // console.log("Hi",marker.position[0].latitude)
            return (

              <Marker zoom={4} key={index} position={{lat:Number.parseFloat(marker.position[0].latitude), lng: Number.parseFloat(marker.position[0].longitude)}} >
              {this.renderPopup(index)}
              </Marker>

            );
          })}
        </MarkerClusterGroup>
      </Map>
    );
  }
}
// {this.state.progress && (
//          <>
//            <Polyline
//              path={this.state.progress}
//              options={{ strokeColor: "#FF0000 " }}
//            />
//            <Marker
//              position={this.state.progress[this.state.progress.length - 1]}
//            />
//          </>
//        )}