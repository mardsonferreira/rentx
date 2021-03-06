import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

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
    const { user, signOut, updateUser } = useAuth();
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>(
        'dataEdit'
    );
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    const theme = useTheme();
    const navigation = useNavigation();
    const netInfo = useNetInfo();

    function handleBack() {
        navigation.goBack();
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        if (
            netInfo.isConnected === false &&
            optionSelected === 'passwordEdit'
        ) {
            Alert.alert(
                'Você está offline',
                'Para mudar a senha, conecte-se a internet'
            );
        } else {
            setOption(optionSelected);
        }
    }

    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
        }
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                name: Yup.string().required('Nome é obrigatório'),
            });

            const data = { name, driverLicense };
            await schema.validate(data);

            await updateUser({
                id: user.id,
                user_id: user.id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token,
            });

            Alert.alert('Perfil atualizado');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Não foi possível atualizar o perfil!');
            }
        }
    }

    async function handleSignOut() {
        Alert.alert(
            'Tem certeza?',
            'Lembre-se, que se você sair, vai precisar de internet para conectar-se novamente',
            [
                {
                    text: 'Cancelar',
                    onPress: () => {},
                },
                {
                    text: 'Sair',
                    onPress: () => signOut(),
                },
            ]
        );
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
                            {!!avatar && (
                                <Photo
                                    source={{
                                        uri: avatar,
                                    }}
                                />
                            )}
                            <PhotoButton onPress={handleSelectAvatar}>
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
                                    defaultValue={name}
                                    onChangeText={setName}
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
                                    defaultValue={driverLicense}
                                    onChangeText={setDriverLicense}
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

                        <Button
                            title="Salvar Alterações"
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
