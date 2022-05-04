import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
    About,
} from './styles';

export function CarDetails() {
    return (
        <Container>
            <Header>
                <BackButton />
            </Header>

            <CarImages>
                <ImageSlider
                    imagesUrl={[
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPaKOCq-C-wQ_j5LAXajH4_hm0FBHBsAaaA&usqp=CAU',
                    ]}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborgine</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <About>
                    Este é um automóvel esportivo. Surgiu do lendário touro de lide indultado na praca real Maestranza de Sevilla.
                </About>
            </Content>
        </Container>
    );
}
