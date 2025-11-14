import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import ReceitaInfo from "../../components/ReceitaInfo";
import ReceitaSteps from "../../components/ReceitaSteps";
import { IComment } from "../../interfaces/comment.interface";
import { Card, Icon, Text, Avatar } from "react-native-paper";
import Logo from "../../components/Logo";
import { IRecipe } from "../../interfaces/recipe.interface";
import { useEffect, useState } from "react";

const SPOONACULAR_API_KEY = ""
let commentTestArray: IComment[] = [
    {
        userId: "1",
        date: new Date("December 10, 2024 10:15:00"),
        comment: "Bem fácil e gostoso!",
        grade: 5,
    },
    {
        userId: "2",
        date: new Date("June 6, 2025 8:10:00"),
        comment: "É bom mas fez uma sujeira...",
        grade: 3
    },
    {
        userId: "3",
        date: new Date("August 10, 2025 15:27:00"),
        comment: "Não é o melhor que eu já fiz, mas dá pro gasto.",
        grade: 4
    }
]

async function fetchRecipe(id: string | string[]): Promise<IRecipe> {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`)
    const data = await response.json()
    const recipe: IRecipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        ...(data.readyInMinutes && { readyInMinutes: data.readyInMinutes }),
        ...(data.servings && { servings: data.servings }),
        ...(data.extendedIngredients && {extendedIngredients: data.extendedIngredients}),
        ...(data.instructions && {instructions: data.instructions})
    }
    return recipe
}

export default function Receita() {
    const { id } = useLocalSearchParams()
    const [recipe, setRecipe] = useState<IRecipe | null>(null)

    useEffect(() => {
        async function load() {
            const data = await fetchRecipe(id as string)
            setRecipe(data)
        }
        load()
    }, [id])

    if (!recipe) return (<Text>Carregando...</Text>)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.main} testID="main">
                <Logo />

                <View testID="receitaDiv" style={[styles.receitaDiv, { marginTop: -250 }]}>
                    <View testID="receitaHeader" style={styles.receitaHeader}>
                        <Image
                            source={{ uri: recipe.image }}
                            style={{ width: 130, height: 130 }}
                        ></Image>
                        <ReceitaInfo recipe={recipe} />
                    </View>
                    <ReceitaSteps recipe={recipe} />
                </View>
                <View style={{ gap: 12 }}>
                    {
                        commentTestArray.map(comment => (
                            <Card style={{ maxWidth: 325 }} key={comment.userId}>
                                <Card.Content>
                                    <Card.Title title="Paulo" subtitle="10/02/2024"
                                        left={() => <Avatar.Icon icon="account" size={48} style={{ backgroundColor: 'teal', marginLeft: -10 }} />} />
                                    <Text>{comment.comment}</Text>
                                    <View style={{ flexDirection: "column", marginTop: 4, alignItems: "center", gap: 10 }}>
                                        <View style={{ flexDirection: "row", marginTop: 6 }}>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <Icon
                                                    key={i}
                                                    source={i < comment.grade ? "star" : "star-outline"}
                                                    size={20}
                                                    color={i < comment.grade ? "#22577A" : "#CCC"}
                                                />
                                            ))}
                                        </View>
                                        {comment.imageBase64 ? (
                                            <Image style={{ width: 100, height: 100, borderRadius: 6 }} source={{ uri: comment.imageBase64 }} />
                                        ) : null}
                                    </View>

                                </Card.Content>
                            </Card>
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 120,
    },

    mainLogo: {
        width: 210,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 130,
        paddingTop: 100,
    },

    receitaHeader: {
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },

    receitaDiv: {
        gap: 40,
        padding: 20,
        paddingBottom: 180,
    },
});
