import React from 'react';

import { Container, Title } from './styles';

interface ButtonProps {
    title: string;
    color?: string;
    onPress: () => void;
}

export function Button({ title, ...rest }: ButtonProps) {
    return (
        <Container {...rest}>
            <Title>{title}</Title>
        </Container>
    );
}
