import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImages } from './styles';

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
        </Container>
    );
}
