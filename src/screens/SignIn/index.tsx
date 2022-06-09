import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';

import { Container, Header, Title, Subtitle, Footer, Separator } from './styles';

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
