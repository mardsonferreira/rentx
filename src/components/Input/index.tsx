import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';

import { InputProps } from './types';

export function Input({ iconName }: InputProps) {
    const theme = useTheme();
    return (
        <Container>
            <Feather
                name={iconName}
                size={24}
                color={theme.colors.text_detail}
            />
        </Container>
    );
}
