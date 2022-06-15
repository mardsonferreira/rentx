import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';

import { InputProps } from './types';

export function Input({ iconName, value, ...rest }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme();

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container isFocused={isFocused}>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={
                        isFocused || isFilled
                            ? theme.colors.main
                            : theme.colors.text_detail
                    }
                />
            </IconContainer>
            <InputText
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}
            />
        </Container>
    );
}
