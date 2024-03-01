import React from 'react';
import {StyleSheet, View} from 'react-native';

import VideoPlayer from 'react-native-video-player';
import {SafeAreaView, Text} from '@gluestack-ui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Icons} from '../components';

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
          <Icons
            size={20}
            color={colors.white}
            name="chevron-left"
            iconStyle={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <VideoPlayer
            autoplay
            endWithThumbnail
            video={{uri: uri}}
            videoWidth={width}
            thumbnail={{uri: uri}}
            videoHeight={height - 60}
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
