import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { Container, Header, HeaderContent, TotalCars } from './styles';

export function Home() {
    const carData = [
        {
            brand: 'audi',
            name: 'RS 5 Coupé',
            rent: {
                period: 'ao dia',
                price: 120,
            },
            thumbnail:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPaKOCq-C-wQ_j5LAXajH4_hm0FBHBsAaaA&usqp=CAU',
        },
        {
            brand: 'audi',
            name: 'RS 5 Coupé',
            rent: {
                period: 'ao dia',
                price: 120,
            },
            thumbnail:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPaKOCq-C-wQ_j5LAXajH4_hm0FBHBsAaaA&usqp=CAU',
        },
    ];
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    <TotalCars>Total de 12 caros</TotalCars>
                </HeaderContent>
            </Header>

            <Car data={carData[0]} />
            <Car data={carData[1]} />
        </Container>
    );
}
