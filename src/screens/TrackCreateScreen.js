import '../_mockLocation';
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Map from '../components/Map';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from "expo-location";
import { Context as LocationContext } from "../context/LocationContext";

const TrackCreateScreen = () => {
    const { addLocation } = useContext(LocationContext);
    const [err, setErr] = useState(null);

    const startWatching = async () => {
        try {
          const { granted } = await requestForegroundPermissionsAsync();
          await watchPositionAsync(
            {
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            },
            location => {
                addLocation(location);
            }
          )
          if (!granted) {
            throw new Error('Location permission not granted');
          }
        } catch (e) {
          setErr(e);
        }
      };

    useEffect(() => {
        startWatching();
      }, [])

    return(
        <>
            <Text h3>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable loation services.</Text> : null}
        </>
    )
};

const styles = StyleSheet.create({

});

export default TrackCreateScreen;