import { RectButtonProps } from "react-native-gesture-handler";
import { Car as ModelCar } from "../../database/model/Car";

export interface CarProps extends RectButtonProps {
    data: ModelCar;
}
