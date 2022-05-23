import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';

import api from '../../services/api';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
} from './styles';

interface MyCarsProps {
    id: string;
    user_id: string;
    car: CarDTO;
}

export function MyCars() {
    const [cars, setCars] = useState<MyCarsProps[]>([]);
    const [loading, setLoding] = useState(true);

    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoding(false);
            }
        }

        fetchCars();
    }, []);

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton color={theme.colors.shape} onPress={handleBack} />

                <Title>
                    Seus agendamentos{'\n'}
                    estão aqui.
                </Title>

                <SubTitle>Conforto, segurança e praticidade.</SubTitle>
            </Header>

            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>05</AppointmentsQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <Car data={item.car} />}
                />
            </Content>
        </Container>
    );
}
