import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import VideoPlayer from 'react-native-video-player';
import {SafeAreaView, Text} from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';

import colors from '../utils/colors';
import {globalStyle} from '../utils/globalStyles';
import {height, width} from '../utils/globalFunction';

const VideoScreen = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  const uri = route?.params?.item?.path;

  return (
    <SafeAreaView style={globalStyle.container}>
      {uri ? (
        <View style={globalStyle.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon size={20} color={colors.white} name="chevron-left" />
          </TouchableOpacity>
          <VideoPlayer
            video={{uri: uri}}
            videoWidth={width}
            videoHeight={height - 60}
            thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          />
        </View>
      ) : (
        <Text>No Video Found</Text>
      )}
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  backButton: {margin: 12},
});
