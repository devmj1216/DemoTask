import {Alert, Dimensions} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const requestStoragePermission = async () => {
  try {
    const permissionStatus = await check(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    console.log('permissionStatus', permissionStatus);
    if (permissionStatus !== RESULTS.GRANTED) {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert('Permission denied');
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error checking permission:', error);
    return false;
  }
};

export const width = Dimensions.get('window')?.width;

export const height = Dimensions.get('window')?.height;
