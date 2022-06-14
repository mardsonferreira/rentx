import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, IconContainer, InputText } from './styles';

import { InputProps } from './types';

export function PasswordInput({ iconName, ...rest }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const theme = useTheme();

    function handlePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    return (
        <Container>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </IconContainer>

            <InputText secureTextEntry={isPasswordVisible} {...rest} />

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
