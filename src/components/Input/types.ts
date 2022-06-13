import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
}
