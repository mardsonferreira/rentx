import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { RootStackParamList } from '../../routes/rootStackParams';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Form,
    Footer,
    Separator,
} from './styles';

type SignInScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const theme = useTheme();
    const navigation = useNavigation<SignInScreenProp>();
    const { signIn } = useAuth();

    async function handleSignIn() {
        const schema = Yup.object().shape({
            email: Yup.string()
                .required('E-mail obrigatório.')
                .email('Digite um email válido'),
            password: Yup.string().required('A senha obrigatória.'),
        });

        try {
            await schema.validate({ email, password });

            signIn({ email, password });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                Alert.alert('Opa', err.message);
            } else {
                Alert.alert(
                    'Errou na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                );
            }
        }
    }

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>Estamos{'\n'}Quase lá</Title>
                        <Subtitle>
                            Faça seu login para começar{'\n'} uma experiência
                            incrível
                        </Subtitle>
                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <Separator />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />

                        <Separator />

                        <Button
                            title="Criar conta gratuita"
                            color={theme.colors.background_secondary}
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
