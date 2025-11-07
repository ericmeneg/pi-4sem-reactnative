import { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { Avatar, Card, Icon, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker"

async function pedirPermissao(){
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
    const [foto, setFoto] = useState()
    const [pontuacao, setPontuacao] = useState(0)

    //controla a altura do text input do comentário
    const [altura, setAltura] = useState(40)

    return (
        <View style={{ maxWidth: 275 }}>
            <Card mode="contained" >
                <Card.Content>
                    <Card.Title titleStyle={{ fontSize: 14 }} title="Deixe sua opinião!" left={() => <Avatar.Icon icon="comment-plus-outline" size={48} style={{ backgroundColor: 'teal', marginLeft: -10 }} />} />
                    <TextInput mode="outlined"
                        activeOutlineColor="#22577A"
                        label="Escreva um comentário"
                        value={comentarioString}
                        onChangeText={texto => setComentarioString(texto)}
                        multiline
                        onContentSizeChange={(e)=>{
                            setAltura(e.nativeEvent.contentSize.height)
                        }}
                        style={{
                            height: Math.min(altura, 200),
                            textAlignVertical: "top"
                        }} 
                        />
                    <Text style={{marginTop: 16}}>Dê uma pontuação a receita:</Text>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        {Array.from({ length: 5 }, (_, i) => (
                        <Pressable onPress={()=>{setPontuacao(i+1)}}>
                        <Icon
                          key={i}
                          source={i < pontuacao ? "star" : "star-outline"}
                          size={30}
                          color={i < pontuacao ? "#22577A" : "#CCC"}
                        />
                        </Pressable>
                      ))}
                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}