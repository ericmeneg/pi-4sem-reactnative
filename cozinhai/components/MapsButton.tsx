import React from 'react';
import { Button } from 'react-native-paper';

interface INavigateButtonProps {
    title: string;
    onPress: () => void;
}

export default function NavigateButton({ title, onPress }: INavigateButtonProps) {
    return (
        <Button mode="contained" onPress={onPress}>
            {title}
        </Button>
    );
}