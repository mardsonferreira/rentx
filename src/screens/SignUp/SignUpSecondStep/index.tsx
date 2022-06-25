import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import { RootStackParamList } from '../../../routes/rootStackParams';

import api from '../../../services/api';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
    Separator,
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicence: string;
    };
}

type SignUpSecondStepScreenProp = StackNavigationProp<
    RootStackParamList,
    'SignUpSecondStep'
>;

export function SignUpSecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation<SignUpSecondStepScreenProp>();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        try {
            const schema = Yup.object().shape({
                password: Yup.string().required('Senha é obrigatória'),
                passwordConfirm: Yup.string().oneOf(
                    [Yup.ref('password'), null],
                    'As senhas não são iguais'
                ),
            });

            const data = {
                password,
                passwordConfirm,
            };

            await schema.validate(data);

            await api.post('/users', {
                name: user.name,
                email: user.email,
                driver_license: user.driverLicence,
                password,
            });

            navigation.navigate('Confirmation', {
                nextScreenRoute: 'SignIn',
                title: 'Conta criada!',
                message: `Agora é só fazer login\ne aproveitar.`,
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                Alert.alert('Opa', err.message);
            } else {
                Alert.alert('Opa', 'Não foi possível cadastrar');
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>Cria sua{'\n'} conta</Title>
                    <Subtitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />

                        <Separator />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir Senha"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Button
                        title="Cadastrar"
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
