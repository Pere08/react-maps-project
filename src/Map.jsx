/* eslint-disable no-console */
import React, {
  useState,
  useCallback,
  memo,
} from 'react';
import {
  GoogleMap, Marker, Autocomplete, useJsApiLoader,
} from '@react-google-maps/api';

import styles from './map.css';

function Map() {
  const [zoom, setZoom] = useState(15);

  const [center, setCenter] = useState({
    lat: 41.39860674724766,
    lng: 2.1999917272411134,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.googleMapsApiKey,
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

  return isLoaded ? (
    <>
      <p>
        zoom:
        {' '}
        {zoom}
      </p>
      <p>
        lat:
        {' '}
        {center.lat}
      </p>
      <p>
        lng:
        {' '}
        {center.lng}
      </p>
      <GoogleMap
        mapContainerStyle={styles.containerStyle}
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
