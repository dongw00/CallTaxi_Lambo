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

import car_icon from '../../assets/icon/rsz_car.png';

/* 현재 위치 */
const DEFAULT_LAT = 35.160148;
const DEFAULT_LNG = 126.851424;
let SELECT_VALUE = 0;
let CAR_LAT = 35.15443;
let CAR_LON = 126.851584;
let M_LAT = 35.158596;
let M_LON = 126.851628;

const GOOGLE_MAPS_API = `${process.env.REACT_APP_GOOGLE_API}`;
const LAMBDA_GET_URL =
  'https://cyj1ma1ju7.execute-api.us-east-2.amazonaws.com/test/getcarlocation';

const {
  SearchBox,
} = require('react-google-maps/lib/components/places/SearchBox');
const {
  MarkerWithLabel,
} = require('react-google-maps/lib/components/addons/MarkerWithLabel');

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="Maps" />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      /* init */
      fetch(
        'https://cyj1ma1ju7.execute-api.us-east-2.amazonaws.com/test/getcarlocation',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(res => res.json())
        .then(data => {
          SELECT_VALUE = data.Item.select;
          console.log(`selc=${SELECT_VALUE}`);
          switch (SELECT_VALUE) {
            case 0:
              M_LAT = 35.158926;
              M_LON = 126.850904;
              break;
            case 1:
              M_LAT = 35.158755;
              M_LON = 126.850573;
              break;
            case 2:
              M_LAT = 35.155086;
              M_LON = 126.848545;
              break;
            case 3:
              M_LAT = 35.158689;
              M_LON = 126.855465;
              break;
            case 4:
              M_LAT = 35.155078;
              M_LON = 126.852287;
              break;
            default:
              M_LAT = 35.158926;
              M_LON = 126.850904;
              break;
          }
        });
      const refs = [];

      this.setState({
        position: null,
        markers: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },

        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          this.setState({
            markers: nextMarkers,
          });
        },
      });

      /* Fetch car location */
      const callTaxi = setInterval(() => {
        fetch(
          'https://cyj1ma1ju7.execute-api.us-east-2.amazonaws.com/test/getcarlocation',
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then(res => res.json())
          .then(data => {
            CAR_LAT = data.Item.cLat;
            CAR_LON = data.Item.cLon;
            SELECT_VALUE = data.Item.select;
            console.log(`Car[${CAR_LAT}, ${CAR_LON}] M[${M_LAT}, ${M_LON}]`);
            console.log(`slec=${SELECT_VALUE}`);
            if (SELECT_VALUE === 5) stopTaxi();
          })
          .then(() =>
            this.setState({
              onMarkerMounted: ref => {
                refs.marker = ref;
              },
              onPositionChanged: () => {
                console.log('position changed');
                const obj = [
                  {
                    position: {
                      lat: CAR_LAT,
                      lng: CAR_LON,
                    },
                  },
                ];
                this.setState({
                  markers: obj,
                });
              },
            })
          );
      }, 5000);

      /* Stop fetching */
      const stopTaxi = () => {
        console.log('stop calling');
        clearInterval(callTaxi);
      };
    },
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {},
  })
)(props => (
  <GoogleMap
    defaultZoom={15.5}
    defaultCenter={{ lat: 35.158596, lng: 126.851628 }}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <SearchBox
      ref={props.onSearchBoxMounted}
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
      position={{ lat: M_LAT, lng: M_LON }}
      labelAnchor={{ x: 0, y: 0 }}
      labelStyle={{
        backgroundColor: 'yellow',
        fontSize: '10px',
        padding: '5px',
      }}>
      <div>
        <button type="submit" onClick={props.callTaxi}>
          호출
        </button>
      </div>
    </MarkerWithLabel>
    <Marker
      ref={props.onMarkerMounted}
      icon={car_icon}
      position={{ lat: CAR_LAT, lng: CAR_LON }}
      defaultAnimation={google.maps.Animation.DROP}
      onPositionChanged={props.onPositionChanged}
    />
  </GoogleMap>
));

class Maps extends React.PureComponent {
  render() {
    return (
      <MyMapComponent clat={CAR_LAT} clng={CAR_LON} mlat={M_LAT} mlon={M_LON} />
    );
  }
}

export default Maps;
