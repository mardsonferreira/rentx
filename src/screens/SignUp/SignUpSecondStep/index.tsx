import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

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

export function SignUpSecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation();
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

            // send data to API
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                return Alert.alert('Opa', err.message);
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
