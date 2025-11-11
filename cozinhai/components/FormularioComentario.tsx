import { useState } from "react";
import { Alert, Pressable, TouchableOpacity, View, Image } from "react-native";
import { Avatar, Button, Card, Icon, Modal, Portal, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker"

async function pedirPermissao() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
        Alert.alert("Permissão negada", "Precisamos de acesso a câmera para que você possa adicionar fotos ao seu comentário (fotos são opcionais)")
        return false
    }
    return true
}

export default function FormularioComentario() {
    //controlam o conteúdo dos campos do formulário
    const [comentarioString, setComentarioString] = useState("")
    const [foto, setFoto] = useState<string | null>(null)
    const [pontuacao, setPontuacao] = useState(0)

    //controla a altura do text input do comentário
    const [altura, setAltura] = useState(40)

    //controla a visibilidade do modal de visualização da foto tirada
    const [modalVisivel, setModalVisivel] = useState(false)

    async function tirarFoto() {
        const temPermissao = await pedirPermissao()
        if (!temPermissao) return

        const result = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0.7,
            allowsEditing: true
        })

        if (!result.canceled && result.assets.length > 0) {
            const foto = result.assets[0]
            setFoto(`data:image/jpeg;base64,${foto.base64}`)
        }
    }

    return (
        <View style={{ maxWidth: 325 }}>
            <Card mode="contained" >
                <Card.Content>
                    <Card.Title titleStyle={{ fontSize: 14 }} title="Deixe sua opinião!" left={() => <Avatar.Icon icon="comment-plus-outline" size={48} style={{ backgroundColor: 'teal', marginLeft: -10 }} />} />

                    <TextInput mode="outlined"
                        activeOutlineColor="#22577A"
                        label="Escreva um comentário"
                        value={comentarioString}
                        onChangeText={texto => setComentarioString(texto)}
                        multiline
                        onContentSizeChange={(e) => {
                            setAltura(e.nativeEvent.contentSize.height)
                        }}
                        style={{
                            height: Math.min(altura, 200),
                            textAlignVertical: "top"
                        }}
                    />

                    <Text style={{ marginTop: 16 }}>Dê uma pontuação a receita:</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Pressable onPress={() => { setPontuacao(i + 1) }}>
                                <Icon
                                    key={i}
                                    source={i < pontuacao ? "star" : "star-outline"}
                                    size={30}
                                    color={i < pontuacao ? "#22577A" : "#CCC"}
                                />
                            </Pressable>
                        ))}
                    </View>

                    <Text style={{ marginTop: 16 }}>Adicione uma imagem do seu prato:</Text>
                    <Button
                        icon="camera"
                        mode="contained-tonal"
                        onPress={tirarFoto}
                        style={{ marginBottom: 10, backgroundColor: "#22557A" }}
                        labelStyle={{ color: "white" }} >
                        Tirar Foto
                    </Button>
                    {foto && (
                        <>
                            <TouchableOpacity
                                onPress={() => setModalVisivel(true)}
                                onLongPress={() => setFoto(null)}
                                delayLongPress={1250}>
                                <Image
                                    source={{ uri: foto }}
                                    style={{ width: 150, height: 150, borderRadius: 10, alignSelf: "center" }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: "gray", alignSelf: "center" }}>Toque para expandir, segure para apagar</Text>
                        </>

                    )}
                    <Portal>
                        <Modal
                            visible={modalVisivel}
                            onDismiss={() => setModalVisivel(false)}
                            contentContainerStyle={{
                                backgroundColor: "transparent",
                                justifyContent: "center",
                                padding: 0,
                                alignItems: "center"
                            }}
                            style={{
                                margin: 0,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Image
                                source={{ uri: foto }}
                                style={{ width: 400, height: 400, borderRadius: 15 }} />
                        </Modal>
                    </Portal>
                </Card.Content>
            </Card>
        </View>
    )
}