import { RectButtonProps } from "react-native-gesture-handler";

interface CarData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    };
    thumbnail: string;
}

export interface CarProps extends RectButtonProps {
    data: CarData;
}
