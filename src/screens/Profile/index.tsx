import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section,
    Separator,
} from './styles';

export function Profile() {
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>(
        'dataEdit'
    );
    const theme = useTheme();
    const navigation = useNavigation();
    const { user } = useAuth();

    function handleBack() {
        navigation.goBack();
    }

    function handleSignOut() {}

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected);
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape}
                                onPress={handleBack}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut}>
                                <Feather
                                    name="power"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            <Photo
                                source={{
                                    uri: 'https://avatars.githubusercontent.com/u/5270702?v=4',
                                }}
                            />
                            <PhotoButton onPress={() => {}}>
                                <Feather
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content
                        style={{
                            marginBottom: useBottomTabBarHeight(),
                        }}
                    >
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option active={option === 'passwordEdit'}>
                                <OptionTitle
                                    active={option === 'passwordEdit'}
                                    onPress={() =>
                                        handleOptionChange('passwordEdit')
                                    }
                                >
                                    Trocar Senha
                                </OptionTitle>
                            </Option>
                        </Options>

                        {option === 'dataEdit' ? (
                            <Section>
                                <Input
                                    iconName="user"
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                />

                                <Separator />

                                <Input
                                    iconName="mail"
                                    editable={false}
                                    defaultValue={user.email}
                                />

                                <Separator />

                                <Input
                                    iconName="credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={user.driver_license}
                                />
                            </Section>
                        ) : (
                            <Section>
                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Senha atual"
                                />

                                <Separator />

                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Nova senha"
                                />

                                <Separator />

                                <PasswordInput
                                    iconName="lock"
                                    placeholder="Repitir senha"
                                />
                            </Section>
                        )}
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
