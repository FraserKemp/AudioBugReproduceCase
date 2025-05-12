import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, SafeAreaView, Pressable, Text} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../App.tsx';

type Props = NativeStackScreenProps<Routes, 'CameraScreen'>;
export const CameraScreen = ({navigation}: Props) => {
  const camera = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const device = useCameraDevice('back');

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission();

  useEffect(() => {
    (async () => {
      try {
        await requestCameraPermission();
        await requestMicPermission();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const startRecording = useCallback(() => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');

      console.log('Starting recording');
      camera.current.startRecording({
        onRecordingError: error => {
          console.error('Recording failed!', error);
          console.log('stopped recording video!');
        },
        onRecordingFinished: video => {
          console.log(`Recording successfully finished! ${video.path}`);
          // TODO set up navigation to go to another screen for us then to go back.
          navigation.navigate('PreviewScreen', {
            path: video.path,
            type: 'video',
          });
          console.log('stopped recording video!');
        },
      });
      setIsRecording(true);
      console.log('Recording has started');
    } catch (e) {
      console.error('failed to start recording!', e, 'camera');
    }
  }, [navigation]);

  const stopRecording = useCallback(async () => {
    try {
      if (camera.current == null) {
        throw new Error('Camera ref is null!');
      }
      await camera.current.stopRecording();
      setIsRecording(false);
      console.log('Recording STOPPED!');
    } catch (e) {
      console.error('failed to stop recording!', e);
    }
  }, [camera]);

  if (!hasCameraPermission && !hasMicrophonePermission) {
    return (
      <>
        <Text>No Permissions granted</Text>
      </>
    );
  }

  if (device == null) {
    return (
      <>
        <Text>No Device found</Text>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        audio={true}
        ref={camera}
      />
      {isRecording ? (
        <Pressable style={styles.stopButton} onPress={stopRecording} />
      ) : (
        <Pressable style={styles.recordButton} onPress={startRecording} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, alignItems: 'center'},
  recordButton: {
    position: 'absolute',
    bottom: 100,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'red',
    opacity: 0.5,
  },
  stopButton: {
    position: 'absolute',
    bottom: 100,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    opacity: 0.5,
  },
});
