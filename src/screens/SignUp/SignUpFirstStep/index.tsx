import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import { RootStackParamList } from '../../../routes/rootStackParams';

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

type SignUpFirstStepScreenProp = StackNavigationProp<
    RootStackParamList,
    'SignUpFirstStep'
>;

export function SignUpFirstStep() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicence, setDriverLicence] = useState('');

    const navigation = useNavigation<SignUpFirstStepScreenProp>();

    function handleBack() {
        navigation.goBack();
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicence: Yup.string().required('CNH obrigatória.'),
                email: Yup.string()
                    .required('E-mail obrigatório.')
                    .email('Digite um email válido'),
                name: Yup.string().required('Name obrigatório.'),
            });

            const data = {
                name,
                email,
                driverLicence,
            };

            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', { user: data });
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
                        <FormTitle>1.Dados</FormTitle>
                        <Input
                            iconName="user"
                            placeholder="Nome"
                            onChangeText={setName}
                            value={name}
                        />

                        <Separator />

                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <Separator />

                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            onChangeText={setDriverLicence}
                            value={driverLicence}
                        />
                    </Form>

                    <Button title="Próximo" onPress={handleNextStep} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
