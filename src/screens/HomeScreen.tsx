import React, {useState} from 'react';

import {
  View,
  Linking,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {Image, SafeAreaView, Text} from '@gluestack-ui/themed';

import {fetchVideo} from '../redux/actions/fetchVideoActions';

import {Icons, ItemSeparator} from '../components';

import colors from '../utils/colors';
import strings from '../utils/strings';
import {ICONS} from '../../assets/icons';
import {globalStyle} from '../utils/globalStyles';
import {height, requestStoragePermission} from '../utils/globalFunction';

const HomeScreen = () => {
  const dispatch: any = useDispatch();
  const videoData: any = useSelector((state: any) => state.video.videoData);

  const navigation: any = useNavigation();
  const [selectedVideos, setSelectedVideos] = useState<any>(videoData);

  const onPressSelect = async () => {
    try {
      const granted = await requestStoragePermission();
      if (granted) {
        ImagePicker.openPicker({
          mediaType: 'video',
        })
          .then(res => {
            setSelectedVideos((prevSelectedVideos: any) => [
              ...prevSelectedVideos,
              res,
            ]);
            dispatch(fetchVideo([...videoData, res]));
          })
          .catch(err => {
            console.log('err', err);
          });
      } else {
        console.log('Storage permission denied');
        openAppSettings();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };

  const removeVideo = (modificationDate: string) => {
    const updatedVideoData = videoData.filter(
      (video: any) => video?.modificationDate !== modificationDate,
    );
    setSelectedVideos(updatedVideoData);
    dispatch(fetchVideo(updatedVideoData));
  };

  const onPressVideo = (item: any) => {
    navigation.navigate('VideoScreen', {
      item: item,
    });
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.renderVideo}>
        <ImageBackground
          resizeMode="cover"
          alt={strings.imageLoad}
          style={styles.rederImage}
          source={{uri: item?.path}}>
          <Icons
            size={45}
            name="play-circle"
            color={colors.black}
            iconStyle={styles.playIcon}
            onPress={() => onPressVideo(item)}
          />
        </ImageBackground>
        <Icons
          size={21}
          color={colors.red}
          name="minus-circle"
          iconStyle={styles.removeIcon}
          onPress={() => removeVideo(item?.modificationDate)}
        />
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      <StatusBar hidden />
      <View style={globalStyle.container}>
        {videoData?.length || selectedVideos?.length ? (
          <FlatList
            numColumns={2}
            data={selectedVideos}
            renderItem={renderItem}
            ListHeaderComponent={ItemSeparator}
            ListFooterComponent={ItemSeparator}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            columnWrapperStyle={styles.columnStyle}
          />
        ) : (
          <View style={styles.safeView}>
            <Text style={styles.noData}>{strings.noData}</Text>
          </View>
        )}
        <SafeAreaView style={styles.safeView}>
          <TouchableOpacity style={styles.icon} onPress={onPressSelect}>
            <Image size="sm" source={ICONS.plus} alt={strings.noImage} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  columnStyle: {
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
  noData: {
    opacity: 0.6,
    color: colors.white,
  },
  safeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  renderVideo: {
    width: '49%',
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rederImage: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    height: height / 3,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
  },
  playIcon: {
    alignSelf: 'center',
  },
  removeIcon: {
    top: -6,
    right: -6,
    position: 'absolute',
  },
  icon: {
    bottom: 30,
    marginBottom: 24,
    position: 'absolute',
  },
});
