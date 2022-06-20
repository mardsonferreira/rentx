import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Bullet } from '../Bullet';

import { Container, ImagesIndexes, CarImageWrapper, CarImage } from './styles';

interface ImageSliderProps {
    imagesUrl: {
        id: string;
        photo: string;
    }[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
    const [imageIndexSelected, setImageIndexSelected] = useState(0);

    const indexChanged = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setImageIndexSelected(index);
    });

    return (
        <Container>
            <ImagesIndexes>
                {imagesUrl.map((item, index) => (
                    <Bullet
                        key={item.id}
                        active={imageIndexSelected === index}
                    />
                ))}
            </ImagesIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item.photo }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanged.current}
            />
        </Container>
    );
}
