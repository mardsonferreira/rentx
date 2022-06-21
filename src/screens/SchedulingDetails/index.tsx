import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getPlatformDate } from '../../util/getPlatformDate';

import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../util/getAccessoryIcon';

import api from '../../services/api';

import { RootStackParamList } from '../../routes/rootStackParams';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';

interface CarParams {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

type SchedulingDetailsScreenProp = StackNavigationProp<
    RootStackParamList,
    'SchedulingDetails'
>;

export function SchedulingDetails() {
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
        {} as RentalPeriod
    );

    const theme = useTheme();
    const navigation = useNavigation<SchedulingDetailsScreenProp>();
    const route = useRoute();

    const { car, dates } = route.params as CarParams;

    async function handleFinishRental() {
        try {
            setLoading(true);
            const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`);

            const unavailable_dates = [
                ...scheduleByCar.data.unavailable_dates,
                ...dates,
            ];

            await api.post('/schedules_byuser', {
                user_id: 1,
                car,
                startDate: format(
                    getPlatformDate(new Date(dates[0])),
                    'dd/MM/yyyy'
                ),
                endDate: format(
                    getPlatformDate(new Date(dates[dates.length - 1])),
                    'dd/MM/yyyy'
                ),
            });

            await api.put(`/schedules_bycars/${car.id}`, {
                id: car.id,
                unavailable_dates,
            });

            navigation.navigate('Confirmation', {
                nextScreenRoute: 'Home',
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível confirmar o agendamento');
        } finally {
            setLoading(false);
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    const rentTotal = useMemo(() => {
        return Number(dates.length * car.price);
    }, [dates, car]);

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(
                getPlatformDate(new Date(dates[dates.length - 1])),
                'dd/MM/yyyy'
            ),
        });
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map((accessory) => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleFinishRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}
