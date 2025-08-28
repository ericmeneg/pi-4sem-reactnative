import { Share } from "react-native"
import { Button } from "react-native-paper"

async function onShare() {
    try {
        const result = await Share.share({
            message: "Olha essa receita que eu encontrei no CozinhAI!\nhttps://exemplo.com.br",
            url: "https://exemplo.com.br",
            title: "CozinhAI - Exemplo"
        })
    } catch (error) {
        console.error(error)
    }
}

export default function ShareButton() {
    return (
        <Button icon="share-variant" mode="contained" onPress={onShare}>
            Compartilhar
        </Button>
    )
}