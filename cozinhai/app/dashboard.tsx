import { View } from "react-native";
import { IRecipe } from "../interfaces/recipe.interface";

//Todas essas funções são parte do sistema de geração de receitas diárias, quando alguém for fazer a dashboard, pode só ignorar elas e preencher o export default function
function seededRand(seed: number){
    let randomizedNumber = Math.sin(seed) * 1000
    return randomizedNumber - Math.floor(randomizedNumber)
}

function getDailySeeds(): number[]{
    let today = new Date().toISOString().split("T")[0]
    let seed = parseInt(today.replace(/-/g, ""), 10)
    const seeds: number[] = []

    while (seeds.length < 3){
        seed++
        const random = Math.floor(seededRand(seed)* 1000000)
        seeds.push(random)
    }

    return seeds
}

function getDailyRecipes(): IRecipe[]{

}

export default function Dashboard() {
    return(
        <View>
            
        </View>
    )}