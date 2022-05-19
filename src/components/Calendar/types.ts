import { DateData } from 'react-native-calendars';

export interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disabledTouchEvent?: boolean;
    };
}

export interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress: (date: DateData) => void;
}

export interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}
