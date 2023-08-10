import React, { useEffect, useState } from 'react';
import { View, Button, PermissionsAndroid, Platform, Text, ToastAndroid, TouchableOpacity, FlatList, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FFmpegKit2, { FFmpegKit, FFmpegKitConfig } from 'ffmpeg-kit-react-native';
///import SplashScreen from 'react-native-splash-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'
const CombineAudioAndVideo = ({ navigation }) => {
  const [list, setList] = useState([
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952",
      "uri": 'http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg'
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796",
      "uri": 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3'
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355",
      "uri": 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-button.m4a'
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776",
      "uri": 'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'
    }
  ])
  return (
    <View>
      <View style={{ height: 50 }} />
      <Text style={{ fontSize: 30, color: '#000' }}>Select audio</Text>
      <FlatList
        data={list}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OpenCameraScreen', { uri: item?.uri })
              }}
              style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
              <Image source={{ uri: item?.url }} style={{ width: 40, height: 40, marginRight: 10 }} />
              <Text style={{ fontSize: 16, color: '#000' }} >Song{index + 1}</Text>
            </TouchableOpacity>
          )

        }}
      />
    </View>
  );
};

export default CombineAudioAndVideo;