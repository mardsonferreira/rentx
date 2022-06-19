import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { MarkedDateProps, DayProps } from '../../components/Calendar/types';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../util/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

import ArrowSvg from '../../assets/arrow.svg';

import { RentalPeriodProps } from './types';

import { RootStackParamList } from '../../routes/rootStackParams';

import {
    Container,
    Header,
    Title,
    RrentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';

interface CarParams {
    car: CarDTO;
}

type SchedulingScreenProp = StackNavigationProp<
    RootStackParamList,
    'Scheduling'
>;

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
        {} as DayProps
    );
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
        {} as MarkedDateProps
    );
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
        {} as RentalPeriodProps
    );

    const theme = useTheme();
    const navigation = useNavigation<SchedulingScreenProp>();
    const route = useRoute();

    const { car } = route.params as CarParams;

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates),
        });
    }

    function handleBack() {
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);

        const interval = generateInterval(start, end);

        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            start: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        });
    }

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
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RrentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.start}>
                            {rentalPeriod.start}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.end}>
                            {rentalPeriod.end}
                        </DateValue>
                    </DateInfo>
                </RrentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    enabled={!!rentalPeriod.end}
                />
            </Footer>
        </Container>
    );
}
