import React from 'react';
import { StatusBar, ListRenderItem } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

interface ICar {
    id: string;
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    };
    thumbnail: string;
};

export function Home() {
    const carData = {
            id: '1',
            brand: 'audi',
            name: 'RS 5 Coupé',
            rent: {
                period: 'ao dia',
                price: 120,
            },
            thumbnail:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPaKOCq-C-wQ_j5LAXajH4_hm0FBHBsAaaA&usqp=CAU',
        };

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

            <CarList
                data={[1,2,3,4,5,6,7]}
                keyExtractor={item => String(item)}
                renderItem={({item}) => <Car data={carData}/>}
            />
        </Container>
    );
}
