import { Link } from "expo-router";
import { Button, Dialog, Text, TextInput } from "react-native-paper";
import MapsButton from "./MapsButton";

export default function LoginModal(){
    return(
        <Dialog dismissable={false} visible={true}>
            <Dialog.Title>Bem vindo! Vamos te conectar</Dialog.Title>
            <Dialog.Content>
                <TextInput label = "Nome de usuário" 
                style={{marginBottom: 15}}
                />
                <TextInput secureTextEntry={true} label = "Senha" style={{marginBottom: 15}}/>
                <MapsButton title="Entrar" onPress={()=>{}}/>
                <Text style={{marginTop: 15}}>Não tem uma conta? <Link style={{color: "blue"}} href="/">Fazer cadastro</Link></Text>
            </Dialog.Content>
        </Dialog>
    )
}