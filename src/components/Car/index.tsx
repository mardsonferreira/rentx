import React from 'react';

import Gasoline from '../../assets/gasoline.svg';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';

import { CarProps } from './types';

export function Car({ data, ...rest }: CarProps) {
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <Gasoline />
                    </Type>
                </About>
            </Details>

            <CarImage
                source={{
                    uri: data.thumbnail,
                }}
                resizeMode="contain"
            />
        </Container>
    );
}
