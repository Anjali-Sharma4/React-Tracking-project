import React from "react";
import axios from 'axios';
import {
	withGoogleMap,
	withScriptjs,
	GoogleMap,
	Polyline,
	Marker
} from "react-google-maps";
class Map extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		progress: [],
		path: [],
		counter:0,
		lat:0,
		lng:0,
		data:[]
	};
	// componentWillMount() {
	// 	this.path = this.state.path.map((coordinates, i, array) => {
	// 		if (i === 0) {
 //        		return { ...coordinates, distance: 0 }; // it begins here!
 //    		}
 //    		const { lat: lat1, lng: lng1 } = coordinates;
	// 		console.log("coordinates",coordinates)
 //    		const latLong1 = new window.google.maps.LatLng(lat1, lng1);
 //    		console.log("latlng1",latLong1);
	// 	    const { lat: lat2, lng: lng2 } = array[0];
	// 	    const latLong2 = new window.google.maps.LatLng(lat2, lng2);
	// 	    console.log("latlng2",latLong2);
	// 	    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
	// 			latLong1,
	// 			latLong2
	// 		);
 //    			return { ...coordinates, distance };
	// 	}
	// )};
		// velocity = 5;
			// initialDate = new Date();
// getDistance = () => {
//      seconds between when the component loaded and now
//     const differentInTime = (new Date() - this.initialDate) / 10000; // pass to seconds
//     return differentInTime * this.velocity; // d = v*t -- thanks Newton!
// };
componentDidMount = () => {
	axios.get('http://localhost:8000/LiveMap/coordinates/')
	.then(res => {
		console.log( "res",res.data)
		var data = res.data;
		var path=[];
		for (var i=0; i< data[0].position.length; i++) {
			path.push({lat: parseFloat(data[0].position[i].latitude), lng: parseFloat(data[0].position[i].longitude)})
		}
		// console.log("path1",path)
		this.setState({
			path:path
		});
	})
	.catch(err => {})
	this.interval = window.setInterval(this.moveObject, 1000);
};
componentWillUnmount = () => {
	window.clearInterval(this.interval);
};
moveObject = () => {
	const progress = this.state.path.slice(0,this.state.counter)
	if(this.state.counter < this.state.path.length)
	{
		this.setState({ counter:this.state.counter+1 });
    }
    // console.log("path",this.state.path)
	this.setState({ progress });
	// console.log("progress",progress)
};
render = () => {
	return (
		<div>
		 
		<GoogleMap
		defaultZoom={16}
		defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
		> 
		{this.state.progress && (
			<React.Fragment>
			<Polyline
			path={this.state.progress}
			options={{ strokeColor: "#FF0000 " }}
			/>
			<Marker
			position={this.state.progress[this.state.progress.length - 1]}
			/>

			</React.Fragment>
			)}
		</GoogleMap>
		</div>
		);
};
}

const MapComponent = withScriptjs(withGoogleMap(Map));

export default () => (
	<MapComponent
	googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZyk30qeWjK_Ba8d08upoqsj9wkfJ-L1g&libraries=geometry,drawing,places"
	loadingElement={<div style={{ height: `100%` }} />}
	containerElement={<div style={{ height: `900px`, width: "1000px" }} />}
	mapElement={<div style={{ height: `100%` }} />}
	/>
	);
