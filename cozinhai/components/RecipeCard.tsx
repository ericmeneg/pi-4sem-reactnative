import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { IRecipe } from "../interfaces/recipe.interface";

interface RecipeCardProps {
    recipe: IRecipe;
    onPress?: (recipe: IRecipe) => void; // Adicione esta linha
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
    const handlePress = () => {
        if (onPress) {
            onPress(recipe);
        } else {
        }
    };

    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Content>
                <Text variant="titleMedium" style={styles.title}>
                    {recipe.title}
                </Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={handlePress}>
                    Ver receita!
                </Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        borderRadius: 12,
        alignSelf: "center",
        width: "90%",
        maxWidth: 400
    },
    title: {
        marginTop: 10,
        textAlign: "center"
    }
});