import React from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

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

export function SignUpFirstStep() {
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
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
                        <FormTitle>1.Dados</FormTitle>
                        <Input iconName="user" placeholder="Nome" />

                        <Separator />

                        <Input iconName="mail" placeholder="Email" />

                        <Separator />

                        <Input iconName="credit-card" placeholder="CNH" />
                    </Form>

                    <Button title="Próximo" />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
