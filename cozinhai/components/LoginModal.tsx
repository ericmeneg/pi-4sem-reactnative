import { Button, Dialog, Text, TextInput } from "react-native-paper";

export default function LoginModal(){
    return(
        <Dialog dismissable={false} visible={true}>
            <Dialog.Title>Bem vindo! Vamos te conectar</Dialog.Title>
            <Dialog.Content>
                <TextInput label = "Nome de usuário" 
                style={{marginBottom: 15}}
                />
                <TextInput label = "Senha" />
                <Button>Entrar</Button>
                <Text>Não tem uma conta? <Button>Fazer cadastro</Button></Text>
            </Dialog.Content>
        </Dialog>
    )
}