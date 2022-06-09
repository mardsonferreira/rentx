import { RectButtonProps } from 'react-native-gesture-handler';

export interface ButtonProps extends RectButtonProps {
    title: string;
    color?: string;
    enabled?: boolean;
    onPress: () => void;
    loading?: boolean;
    light?: boolean;
}

export interface ButtonTextProps {
    light: boolean;
}
