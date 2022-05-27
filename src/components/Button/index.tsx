import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { ButtonProps } from './types';

import { Container, Title } from './styles';

export function Button({
    title,
    color,
    enabled = true,
    onPress,
    loading = false,
    ...rest
}: ButtonProps) {
    const theme = useTheme();

    return (
        <Container
            color={color ? color : theme.colors.main}
            onPress={onPress}
            enabled={enabled}
            style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.shape} />
            ) : (
                <Title>{title}</Title>
            )}
        </Container>
    );
}
