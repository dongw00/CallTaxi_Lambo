import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import person_icon from '../../assets/icon/person_icon2.png';

const DEFAULT_LAT = 37.600707;
const DEFAULT_LNG = 126.86456;
const GOOGLE_MAPS_API = `${process.env.REACT_APP_GOOGLE_API}`;

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API}&libraries=drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="Maps" />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 37.600707, lng: 126.86456 }}>
    {props.isMarkerShown && (
      <Marker
        icon={person_icon}
        position={{ lat: props.lat, lng: props.lng }}
      />
    )}
  </GoogleMap>
));

class Maps extends React.PureComponent {
  state = {
    isMarkerShown: false,
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  getLocation = (lat, lng) => {
    this.setState({ lat: lat, lng: lng });
  };

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    const { lat, lng } = this.state;

    return (
      <MyMapComponent
        lat={lat}
        lng={lng}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

export default Maps;
