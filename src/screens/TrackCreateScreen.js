import '../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Map from '../components/Map';
import { useLocation } from '../hooks/useLocation';
import { Context as LocationContext } from '../context/LocationContext';
import { withNavigationFocus } from 'react-navigation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation } = useContext(LocationContext);

  const [err] = useLocation(isFocused, addLocation);

  return (
    <>
      <Text h3>Create a Track</Text>
      <Map />

      {err ? <Text>Please enable loation services.</Text> : null}
      <TrackForm />
    </>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
