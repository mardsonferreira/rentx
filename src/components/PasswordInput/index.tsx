import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, IconContainer, InputText } from './styles';

import { InputProps } from './types';

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme();

    function handlePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

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
                secureTextEntry={isPasswordVisible}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}
            />

            <BorderlessButton onPress={handlePasswordVisibility}>
                <IconContainer>
                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}
