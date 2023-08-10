

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Camera as VisionCamera, useCameraDevices } from 'react-native-vision-camera'
import Sound from 'react-native-sound'
import RNFetchBlob from 'rn-fetch-blob'
import { useIsFocused } from '@react-navigation/native'
Sound.setCategory('Playback');
const OpenCameraScreen = ({ navigation, camera = true, route }) => {
    const { uri } = route?.params || {}
    const [seconds, setSeconds] = useState(0);
    const cameraRef = useRef(null);
    const soundRef = useRef()
    const [isPlay, setIsPlay] = useState(false)

    const loadSound = (path) => {
        let audio = new Sound(path, '')
        soundRef.current = audio
    }
    useEffect(() => {
        if (uri) {
            loadSound(uri)
        }
    }, [uri])
    const getPermissions = async () => {

        const cameraPermission = await VisionCamera.requestCameraPermission()
        const microphonePermission = await VisionCamera.getMicrophonePermissionStatus()
    }
    useEffect(() => {
        getPermissions()
    }, [])

    const devices = useCameraDevices()
    const frontCamera = devices.front
    const [inret, setInret] = useState(null)
    async function setsecondss() {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
        setInret(intervalId)
    }
    const startVideo = async () => {
     
        setIsPlay(true)
        setsecondss()
        soundRef.current?.play()
        cameraRef.current.startRecording({
            flash: 'on',
            onRecordingFinished: (video) => {
                navigation.navigate('VideoPlayer', { video: video?.path, audio: uri })
                soundRef.current?.pause()
                soundRef.current?.reset()
                clearInterval(inret)
                setSeconds(0)
            },
            onRecordingError: (error) => console.error("error===>>", error),
        })
    }
    const stopVideo = async () => {
        setIsPlay(false)
        await cameraRef.current.stopRecording()
    }
    const focused = useIsFocused()
    if (frontCamera == null) return <Text>Loading.....</Text>


    return (
        <>
            <VisionCamera
                ref={cameraRef}
                style={StyleSheet.absoluteFillObject}
                device={frontCamera}
                isActive={focused}
                video={true}
                audio={false}
            />
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
                    <TouchableOpacity style={{ backgroundColor: 'red', flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80, width: 80, borderRadius: 50, }} onPress={!isPlay ? startVideo : stopVideo}>
                        <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16 }}>{isPlay ? "Stop" : 'Start'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default OpenCameraScreen

const styles = StyleSheet.create({})