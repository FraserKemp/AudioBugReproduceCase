import React, {useMemo} from 'react';
import {Text, Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../App.tsx';
import Video from 'react-native-video';

type Props = NativeStackScreenProps<Routes, 'PreviewScreen'>;
const PreviewScreen = ({navigation, route}: Props) => {
  const {path} = route.params;
  console.log(path);
  const source = useMemo(() => ({uri: `file://${path}`}), [path]);
  console.log(source);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Video
        source={source}
        style={StyleSheet.absoluteFill}
        paused={false}
        resizeMode="cover"
        allowsExternalPlayback={false}
        automaticallyWaitsToMinimizeStalling={false}
        disableFocus={true}
        repeat={true}
        controls={false}
        playWhenInactive={true}
        ignoreSilentSwitch="ignore"
      />
      <Pressable
        style={{margin: 20, padding: 20, backgroundColor: 'green'}}
        onPress={navigation.goBack}>
        <Text>GO BACK</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreviewScreen;
