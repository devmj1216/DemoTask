import React from 'react';
import {StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {ICONSTYLE} from '../../utils/interface';

const Icons = ({color, iconStyle, onPress, size, name}: ICONSTYLE) => {
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={iconStyle}
      onPress={onPress}
    />
  );
};

export default Icons;

const styles = StyleSheet.create({});
