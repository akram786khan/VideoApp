import { ActivityIndicator, BackHandler, Dimensions, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Video from 'react-native-video'
import RNFetchBlob from 'rn-fetch-blob'
import { FFmpegKit, FFmpegKitConfig } from 'ffmpeg-kit-react-native'
const VideoPlayer = ({ route, navigation }) => {
  const { video, audio } = route?.params || {}
  const ref = useRef()
  const [newVideo, setNewVideo] = useState('')
  const downloadDir = 'file://' + RNFetchBlob.fs.dirs.CacheDir
  // SplashScreen.hide()
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted.');
          return
        } else {
          console.log('Storage permission denied.');
        }
      } catch (err) {
        console.warn('Error requesting storage permission:', err);
      }
    }
  };
  useEffect(() => {
    // Set up FFmpegKit

    FFmpegKitConfig.enableStatisticsCallback((statistics) =>
      console.log(`FFmpegKit Statistics: ${statistics}`)
    );
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'CombineAudioAndVideo' }]
      })
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
    })
      .fetch('GET', audio)
      .then(res => {

        combineAudioAndVideo(video, 'file://' + res.path())
      });
  }, [video, audio])
  const outputFilePath = `${downloadDir}/${Date.now()}output.mp4`;
  const combineAudioAndVideo = async (video, audio) => {

    try {
      await requestStoragePermission();

      const ffmpegCommand = `-i ${video} -i ${audio} -c:v copy -c:a aac ${outputFilePath}`;

      // Execute FFmpeg command
      FFmpegKit.executeAsync(ffmpegCommand, async completedExecution => {
        setNewVideo(outputFilePath)
      })
    } catch (error) {
      console.error('Error combining audio and video:', error);
    }
  };
  if (newVideo) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Video
          source={{ uri: newVideo }}
          ref={ref}
          // fullscreen={true}
          repeat={true}
          resizeMode='cover'
          style={styles.backgroundVideo}
        />
      </View>
    )
  }
  return <View style={{ flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }} >
    <ActivityIndicator size={'large'} color={'#f00'} />
  </View>
}

export default VideoPlayer
const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height
  },
});