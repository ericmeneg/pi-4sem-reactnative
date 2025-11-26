import { useEffect, useState } from "react";
import { Alert, Pressable, TouchableOpacity, View, Image } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, Icon, Modal, Portal, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker"
import { useAuth } from "../app/_layout";
import { IRecipe } from "../interfaces/recipe.interface";

interface FormularioComentarioProps {
    recipe: IRecipe
}

async function pedirPermissao() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
        Alert.alert("Permissão negada", "Precisamos de acesso a câmera para que você possa adicionar fotos ao seu comentário dessa formma (fotos são opcionais)")
        return false
    }
    return true
}

async function pedirPermissaoGaleria() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted'){
        Alert.alert("Permissão negada","Precisamos de acesso a sua galeria para que você possa adicionar fotos ao seu comentário dessa forma (fotos são opcionais)")
        return false
    }
    return true
}

export default function FormularioComentario({ recipe }: FormularioComentarioProps) {
    //controlam o conteúdo dos campos do formulário
    const [comentarioString, setComentarioString] = useState("")
    const [foto, setFoto] = useState<string | null>(null)
    const [pontuacao, setPontuacao] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingInicial, setLoadingInicial] = useState(true)
    const [comentarioExistente, setComentarioExistente] = useState<any | null>(null)

    //controla a altura do text input do comentário
    const [altura, setAltura] = useState(40)

    //controla a visibilidade do modal de visualização da foto tirada e seleção de método de upload de foto
    const [modalVisivel, setModalVisivel] = useState(false)
    const [escolherMetodoVisivel, setEscolherMetodoVisivel] = useState(false)

    const { user, token } = useAuth()

    async function fetchComentario() {
        try {
            const url = `https://pi-3sem-backend.onrender.com/user/${user.id}/reviews`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) throw new Error("Erro ao buscar reviews");

            const todasReviews = await response.json();

            const reviewDaReceita = todasReviews.find(
                (review: any) => review.recipeId == recipe.id
            );

            setComentarioExistente(reviewDaReceita || null);
        } catch (error) {
            console.log("Erro ao buscar comentário:", error);
        } finally {
            setLoadingInicial(false);
        }
    }

    useEffect(() => {
        fetchComentario();
    }, [user.id, token, recipe.id]);


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

    async function escolherDaGaleria() {
        const temPermissao = await pedirPermissaoGaleria()
        if (!temPermissao) return

        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            quality: 0.7,
            allowsEditing: true
        })

        if (!result.canceled && result.assets.length > 0) {
            const img = result.assets[0]
            setFoto(`data:image/jpeg;base64,${img.base64}`)
        }
    }

    async function enviarComentario() {
        if (loading) return

        setLoading(true)

        const url = `https://pi-3sem-backend.onrender.com/user/${user.id}/${recipe.id}/reviews`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ grade: pontuacao, comment: comentarioString, imageBase64: foto }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Requisição falhou. Status:${response.status} Mensagem de erro: ${errorText}`
                );
            }
            await fetchComentario()
            Alert.alert("Comentário enviado com sucesso!")
        } catch (err) {
            Alert.alert("Erro ao enviar o comentário", "Tente novamente");
        } finally {
            setLoading(false)
        }
    }

    if (loadingInicial) {
        return (
            <View style={{ width: "100%" }}>
                <Card mode="contained">
                    <Card.Content style={{ alignItems: "center", paddingVertical: 30 }}>
                        <ActivityIndicator color="#22577A" size="large" />
                        <Text style={{ marginTop: 10 }}>Carregando...</Text>
                    </Card.Content>
                </Card>
            </View>
        );
    }

    if (comentarioExistente && !loadingInicial) {
        return (
            <View style={{ width: "100%" }}>
                <Card mode="contained">
                    <Card.Content>
                        <Card.Title
                            title="Seu comentário"
                            left={() => (
                                <Avatar.Icon
                                    icon="comment-check-outline"
                                    size={48}
                                    style={{ backgroundColor: "teal", marginLeft: -10 }}
                                />
                            )} />
                        <Text style={{ marginTop: 10, marginBottom: 10 }}>
                            {comentarioExistente.comment}
                        </Text>

                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            {Array.from({ length: 5 }, (_, i) => (  
                                    <Icon
                                        key={i}
                                        source={i < comentarioExistente.grade ? "star" : "star-outline"}
                                        size={30}
                                        color={i < comentarioExistente.grade ? "#22577A" : "#CCC"}
                                    />
                            ))}
                        </View>
                        {comentarioExistente.imageBase64 && (
                            <Image
                                source={{ uri: comentarioExistente.imageBase64 }}
                                style={{ width: 150, height: 150, borderRadius: 10, alignSelf: "center", marginTop: 10 }} />
                        )}
                    </Card.Content>
                </Card>
            </View>
        )
    }

    return (
        <View style={{ width: "100%" }}>
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
                        onPress={() => setEscolherMetodoVisivel(true)}
                        style={{ marginBottom: 10, backgroundColor: "#22557A" }}
                        labelStyle={{ color: "white" }} >
                        Adicionar Imagem
                    </Button>
                    <Portal>
                        <Modal visible={escolherMetodoVisivel} onDismiss={()=> setEscolherMetodoVisivel(false)}>
                            <Card style={{padding: 20, margin: 13}}>
                                <Button buttonColor="#22557A" textColor="#FFFF" style={{marginBottom: 10}} onPress={() => {setEscolherMetodoVisivel(false); tirarFoto()}}>
                                    Tirar foto
                                </Button>
                                <Button buttonColor="#22557A" textColor="#FFFF" onPress={() => {setEscolherMetodoVisivel(false); escolherDaGaleria()}}>
                                    Escolher da galeria
                                </Button>
                            </Card>
                        </Modal>
                    </Portal>
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
                    <Button
                        mode="contained-tonal"
                        onPress={enviarComentario}
                        disabled={loading}
                        loading={loading}
                        style={{ marginBottom: 10, backgroundColor: "#22557A" }}
                        labelStyle={{ color: "white" }}>
                        Enviar
                    </Button>
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