/* global google */
import React, { Fragment, PureComponent } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';

import style from '../../assets/css/Map.module.css';

import car_icon from '../../assets/icon/rsz_car.png';

/* 현재 위치 */
let START_BOOL = false;
let CAR_LAT = 35.15443;
let CAR_LON = 126.851584;
let M_LAT = 35.158596;
let M_LON = 126.851628;

const GOOGLE_MAPS_API = `${process.env.REACT_APP_GOOGLE_API}`;
const GET_INFO_URL =
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
      fetch(GET_INFO_URL, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          M_LAT = data.Item.mLat;
          M_LON = data.Item.mLon;
        });

      const refs = [];

      /* Search destination */
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
        if (START_BOOL) {
          console.log('호출');
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
              console.log(`Car[${CAR_LAT}, ${CAR_LON}] M[${M_LAT}, ${M_LON}]`);
              if (data.Item.selc === 5) {
                START_BOOL = false;
                stopTaxi();
              }
            })
            /* Moving Car marker function */
            .then(() =>
              this.setState({
                onMarkerMounted: ref => {
                  refs.marker = ref;
                },
                onPositionChanged: () => {
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
        }
      }, 800);

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
    componentDidMount: function() {
      function handleClick(e) {
        e.preventDefault();
        console.log('호출');
      }
    },
  })
)(props => (
  <GoogleMap
    defaultZoom={15.5}
    defaultCenter={{ lat: 35.158596, lng: 126.851628 }}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <SearchBox
      ref={props.onSearchBoxMounted}
      controlPosition={google.maps.ControlPosition.TOP}
      onPlacesChanged={props.onPlacesChanged}>
      <input
        type="text"
        placeholder="목적지를 입력해주세요."
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '95vw',
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
      <Marker
        key={index}
        position={marker.position}
        defaultAnimation={google.maps.Animation.DROP}
      />
    ))}
    <Marker
      position={{ lat: M_LAT, lng: M_LON }}
      defaultAnimation={google.maps.Animation.DROP}
    />
    >
    <Marker
      ref={props.onMarkerMounted}
      icon={car_icon}
      position={{ lat: CAR_LAT, lng: CAR_LON }}
      defaultAnimation={google.maps.Animation.DROP}
      onPositionChanged={props.onPositionChanged}
    />
  </GoogleMap>
));

class Maps extends PureComponent {
  render() {
    return (
      <Fragment>
        <button className={style.callBtn}>호출</button>
        <MyMapComponent
          clat={CAR_LAT}
          clng={CAR_LON}
          mlat={M_LAT}
          mlon={M_LON}
        />
      </Fragment>
    );
  }
}

export default Maps;
