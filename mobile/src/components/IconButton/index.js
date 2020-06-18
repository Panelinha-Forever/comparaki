import React from 'react';

import { TouchableOpacity } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

export default function IconButton({ onPress, color, name, size }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5 size={size} color={color} name={name} />
    </TouchableOpacity>
  );
}
