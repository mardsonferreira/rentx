import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUpFirstStep: undefined;
    SignUpSecondStep: {
        user: {
            name: string;
            email: string;
            driverLicence: string;
        };
    };
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
