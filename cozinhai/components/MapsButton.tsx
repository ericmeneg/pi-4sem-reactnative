import React from 'react';
import { Button } from 'react-native-paper';

interface INavigateButtonProps {
    title: string;
    onPress: () => void;
}

export default function NavigateButton({ title, onPress }: INavigateButtonProps) {
    return (
        <Button buttonColor="#22577A" mode="contained" onPress={onPress}>
            {title}
        </Button>
    );
}