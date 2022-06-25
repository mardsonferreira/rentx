import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../util/getAccessoryIcon';

import { CarDTO } from '../../dtos/CarDTO';

import { RootStackParamList } from '../../routes/rootStackParams';

import api from '../../services/api';

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo,
} from './styles';

interface CarParams {
    carId: string;
}

type CarDetailsScreenProp = StackNavigationProp<
    RootStackParamList,
    'CarDetails'
>;

export function CarDetails() {
    const [car, setCar] = useState<CarDTO>({} as CarDTO);

    const navigation = useNavigation<CarDetailsScreenProp>();
    const route = useRoute();
    const theme = useTheme();
    const { carId } = route.params as CarParams;
    const scrollY = useSharedValue(0);
    const netInfo = useNetInfo();

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        };
    });

    const sliderCarStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollY.value, [0, 150], [1, 0]),
        };
    });

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car });
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchOnlineData() {
            const response = await api.get(`/cars/${carId}`);
            setCar(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchOnlineData();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary },
                ]}
            >
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>

                <Animated.View style={sliderCarStyleAnimation}>
                    <CarImages>
                        <ImageSlider
                            imagesUrl={
                                !!car.photos
                                    ? car.photos
                                    : [
                                          {
                                              id: car.thumbnail,
                                              photo: car.thumbnail,
                                          },
                                      ]
                            }
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>
                            R${' '}
                            {netInfo.isConnected === true ? car.price : '...'}
                        </Price>
                    </Rent>
                </Details>

                {car.accessories && (
                    <Accessories>
                        {car.accessories.map((accessory) => (
                            <Accessory
                                key={accessory.id}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))}
                    </Accessories>
                )}

                <About>{car.about}</About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmRental}
                    enabled={netInfo.isConnected === true}
                />

                {netInfo.isConnected === false && (
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e agendar
                        seu carro.
                    </OfflineInfo>
                )}
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    },
});
