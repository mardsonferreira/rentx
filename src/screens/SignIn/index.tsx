import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Form,
    Footer,
    Separator,
} from './styles';

export function SignIn() {
    const theme = useTheme();

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <Title>Estamos{'\n'}Quase lá</Title>
                <Subtitle>
                    Faça seu login para começar{'\n'} uma experiência incrível
                </Subtitle>
            </Header>

            <Form>
                <Input
                    iconName="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />

                <Separator />

                <PasswordInput
                    iconName="lock"
                    placeholder="Senha"
                />
            </Form>

            <Footer>
                <Button
                    title="Login"
                    onPress={() => {}}
                    enabled={false}
                    loading={false}
                />

                <Separator />

                <Button
                    title="Criar conta gratuita"
                    color={theme.colors.background_secondary}
                    onPress={() => {}}
                    enabled={false}
                    loading={false}
                    light
                />
            </Footer>
        </Container>
    );
}
