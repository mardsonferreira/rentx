interface CarData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    };
    thumbnail: string;
}

export interface CarProps {
    data: CarData;
}
