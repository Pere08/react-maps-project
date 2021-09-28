/* eslint-disable no-console */
import React, {
  useState,
  useCallback,
  memo,
  useEffect,
} from 'react';
import {
  GoogleMap, Marker, Autocomplete, useJsApiLoader,
} from '@react-google-maps/api';
import { useDispatch } from 'react-redux';

import styles from './Map.styles';
import actionTypes from './redux/actions/actionTypes';

function Map() {
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(15);

  const [center, setCenter] = useState({
    lat: 41.39860674724766,
    lng: 2.1999917272411134,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_googleApi,
    libraries: ['places'],
  });

  const [, setMap] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onMarkerLoad = (marker) => {
    console.log('marker: ', marker);
  };

  const [autocomplete, setAutocomplete] = useState(null);

  const onAutocompleteLoad = (autocompleteParam) => {
    console.log('autocomplete: ', autocompleteParam);

    setAutocomplete(autocompleteParam);
  };

  const onAutocompletePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log(place);

      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    dispatch({
      type: actionTypes.SEND_DATA,
      data: [center],
    });
  }, [center]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={styles.container}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
          <div className="slidecontainer">
            <input
              type="range"
              min="10"
              max="20"
              value={zoom}
              onChange={(event) => setZoom(+event.target.value)}
              style={styles.sliderStyles}
            />
          </div>
          <Marker
            onLoad={onMarkerLoad}
            position={center}
          />
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onAutocompletePlaceChanged}
          >
            <input
              type="text"
              placeholder="Search here..."
              style={styles.searchInputStyle}
            />
          </Autocomplete>
        </>
      </GoogleMap>
    </>
  ) : <></>;
}

export default memo(Map);
