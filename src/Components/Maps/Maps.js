/* global google */
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';

import { putAction } from '../../actions/putAction';

import person_icon from '../../assets/icon/rsz_car.png';

const DEFAULT_LAT = 35.160148;
const DEFAULT_LNG = 126.851424;
const GOOGLE_MAPS_API = `${process.env.REACT_APP_GOOGLE_API}`;

const _ = require('lodash');
const {
  SearchBox,
} = require('react-google-maps/lib/components/places/SearchBox');
const {
  MarkerWithLabel,
} = require('react-google-maps/lib/components/addons/MarkerWithLabel');

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API}&libraries=drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="Maps" />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: DEFAULT_LAT,
          lng: DEFAULT_LNG,
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center
          );
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      putAction().then(data => {
        console.log(data);
      });
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(37.598243, 126.865281),
          destination: new google.maps.LatLng(37.600436, 126.865474),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      const gmo = document.querySelectorAll('div.gmnoprint');
      console.log(gmo);
    },
  })
)(props => (
  <GoogleMap
    defaultZoom={15.5}
    defaultCenter={{ lat: 35.158596, lng: 126.851628 }}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}>
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '5%',
          marginTop: '53px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) => (
      <Marker key={index} position={marker.position} />
    ))}
    <MarkerWithLabel
      position={{ lat: 35.158894, lng: 126.851331 }}
      labelAnchor={{ x: 0, y: 0 }}
      labelStyle={{
        backgroundColor: 'yellow',
        fontSize: '10px',
        padding: '5px',
      }}>
      <div>Hello There!</div>
    </MarkerWithLabel>
    <Marker icon={person_icon} position={{ lat: 35.157008, lng: 126.850137 }} />
  </GoogleMap>
));
class Maps extends React.PureComponent {
  render() {
    return <MyMapComponent onMarkerClick={this.handleMarkerClick} />;
  }
}

export default Maps;
