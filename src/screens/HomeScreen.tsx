import React, {useState} from 'react';

import {
  View,
  Linking,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {fetchVideo} from '../redux/actions/fetchVideoActions';
import {Image, SafeAreaView, Text} from '@gluestack-ui/themed';

import colors from '../utils/colors';
import strings from '../utils/strings';
import {ICONS} from '../../assets/icons';
import {globalStyle} from '../utils/globalStyles';
import {requestStoragePermission} from '../utils/globalFunction';

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

  const removeVideo = (pathToRemove: string) => {
    // Use filter to create a new array excluding the item with the specified id
    const updatedVideoData = videoData.filter(
      (video: any) => video?.path !== pathToRemove,
    );
    setSelectedVideos(updatedVideoData);
    dispatch(fetchVideo(updatedVideoData));
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        style={{margin: 24}}
        onPress={() =>
          navigation.navigate('VideoScreen', {
            item: item,
          })
        }>
        <Image
          size="lg"
          alt={strings.imageLoad}
          style={styles.rederImage}
          source={{uri: 'https://dummyimage.com/600x400/000/fff'}}
        />
        <Icon
          size={18}
          name="minuscircle"
          color={colors.red}
          style={styles.removeIcon}
          onPress={() => removeVideo(item?.path)}
        />
        <Text style={styles.renderText}>{`Video ${index + 1}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyle.container}>
      <View style={globalStyle.container}>
        {videoData?.length || selectedVideos?.length ? (
          <FlatList
            numColumns={2}
            data={selectedVideos}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}
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
  noData: {
    opacity: 0.6,
    color: colors.white,
  },
  safeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rederImage: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.white,
  },
  removeIcon: {
    top: -6,
    right: -6,
    position: 'absolute',
  },
  renderText: {
    fontSize: 12,
    paddingTop: 6,
    color: colors.white,
    textAlign: 'center',
  },
  icon: {
    bottom: 30,
    marginBottom: 24,
    position: 'absolute',
  },
});
