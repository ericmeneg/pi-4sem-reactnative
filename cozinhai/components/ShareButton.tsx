import React from 'react'
import { Share } from "react-native"
import { Button } from "react-native-paper"

interface IShareButtonProps {
    recipeUrl: string,
    recipeTitle: string
}

async function onShare(recipeUrl: string, recipeTitle: string) {
    try {
        const result = await Share.share({
            message: "Olha essa receita que eu encontrei no CozinhAI!\n" + { recipeUrl },
            url: recipeUrl,
            title: recipeTitle
        })
    } catch (error) {
        console.error(error)
    }
}

export default function ShareButton(ShareButtonProps: IShareButtonProps) {
    return (
        <Button icon="share-variant" mode="contained" onPress={() => { onShare(ShareButtonProps.recipeUrl, ShareButtonProps.recipeTitle) }}>
            Compartilhar
        </Button>
    )
}