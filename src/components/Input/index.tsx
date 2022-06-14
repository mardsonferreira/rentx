import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';

import { InputProps } from './types';

export function Input({ iconName, ...rest }: InputProps) {
    const theme = useTheme();
    return (
        <Container>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </IconContainer>
            <InputText {...rest} />
        </Container>
    );
}
