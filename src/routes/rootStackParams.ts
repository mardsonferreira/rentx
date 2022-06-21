import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
    Splash: undefined;
    SignIn: undefined;
    SignUpFirstStep: undefined;
    SignUpSecondStep: {
        user: {
            name: string;
            email: string;
            driverLicence: string;
        };
    };
    Home: undefined;
    CarDetails: {
        car: CarDTO;
    };
    Scheduling: {
        car: CarDTO;
    };
    MyCars: undefined;
    SchedulingDetails: {
        car: CarDTO;
        dates: string[];
    };
    Confirmation: {
        title: string;
        message: string;
        nextScreenRoute: string;
    };
};

export type RootTabParamList = {
    HomeTab: undefined;
    Profile: undefined;
    MyCars: undefined;
}
