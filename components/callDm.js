// import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import { View } from 'react-native';
// function CallPage(props) {
//   randomUserID = String(Math.floor(Math.random() * 100000))
//   return (
//       <View style={{flex: 1}}>
//                 <ZegoUIKitPrebuiltCall
//         appID={2106807763}
//         appSign={'3601ef63bef061e250d607571df00dea5137a324c008768392e903c59f8ba28a'}
//         userID={randomUserID}
//         userName={'user_' + randomUserID}
//         callID={"onoononecall"} // callID can be any unique string. 
//         config={{
//           ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
//           onCallEnd: (callID, reason, duration) => {
//             props.navigation.navigate('HomePage');
//           },
//         }}
//       />
//       </View>
//   )
// }
// export default CallPage;

import React, { useRef , useEffect } from 'react';

import { StyleSheet, View, Text, Button, Image } from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
// import KeyCenter from "./KeyCenter";

export default function DmCallPage({navigation, route}) {
  const prebuiltRef = useRef();
  randomUserID = String(Math.floor(Math.random() * 100000));

  useEffect(() => {
    return () => {
        ZegoUIKitPrebuiltCallService.hangUp(); // Cleanup when component unmounts
        console.log('CallPage cleanup on unmount');
    };
}, []);

  const updateCall = useMutation(api.calllog.updateCallLog);
  const fromId = route.params.fromId
  const toId = route.params.toId
  const callId = route.params.callId
  const email = route.params.email
  const name = route.params.name
  const video = route.params.video


  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        ref={prebuiltRef}
        appID={2106807763}
        appSign={'3601ef63bef061e250d607571df00dea5137a324c008768392e903c59f8ba28a'}
        userID={email}
        userName={name}
        callID={callId}

        config={{
          // ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          turnOnCameraWhenJoining:video,
          avatarBuilder: ({ userInfo }) => {
            return <View style={{ width: '100%', height: '100%' }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                source={{ uri: `https://robohash.org/${userInfo.userID}.png` }}
              />
            </View>
          },
          onCallEnd: (callID, reason, duration) => {
            console.log('########CallPage onCallEnd');
            ZegoUIKitPrebuiltCallService.hangUp();
            updateCall({callLogId:callId, status:"COMPLETED"})
            navigation.navigate('DmChat', {fromId, toId});
          },
          timingConfig: {
            isDurationVisible: true,
            onDurationUpdate: (duration) => {
              console.log('########CallWithInvitation onDurationUpdate', duration);
              if (duration === 10 * 60) {
                ZegoUIKitPrebuiltCallService.hangUp();
              }
            }
          },
          topMenuBarConfig: {
            buttons: [
              ZegoMenuBarButtonName.minimizingButton,
            ],
          },
          onWindowMinimized: () => {
            console.log('[Demo]CallPage onWindowMinimized');
            navigation.navigate('DmChat',{fromId, toId});
          },
          onWindowMaximized: () => {
            console.log('[Demo]CallPage onWindowMaximized');
            props.navigation.navigate('DmCallPage', {
              fromId,name,email,toId, callId
            });
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});