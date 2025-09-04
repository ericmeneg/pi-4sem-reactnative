import { useEffect, useState } from "react"
import { IRecipe } from "../interfaces/recipe.interface"
import { SPOONACULAR_API_KEY } from "@env"
import RecipeCard from "./RecipeCard"
import { ScrollView, StyleSheet } from "react-native"
import { Text } from "react-native-paper"

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
        const random = (Math.floor(seededRand(seed)* 1000000))%5224
        seeds.push(random)
    }

    return seeds
}

async function getDailyRecipes(offsets: number[]): Promise<IRecipe[]> {
  const API_KEY = SPOONACULAR_API_KEY
  const baseUrl = "https://api.spoonacular.com/recipes/complexSearch"

  const results = await Promise.all(
    offsets.map(async (offset) => {
      const res = await fetch(
        `${baseUrl}?apiKey=${API_KEY}&number=1&offset=${offset}`
      )
      const data = await res.json()
      return data.results?.[0] ?? null
    })
  )

  return results.filter(Boolean) as IRecipe[]
}

export default function DailyRecipes() {

    const [recipes, setRecipes] = useState<IRecipe[]>([])
    useEffect(()=>{
        async function loadRecipes() {
            const seedArray = getDailySeeds()
            const gotRecipes = await getDailyRecipes(seedArray)
            setRecipes(gotRecipes)
        } 
        loadRecipes()
    }, [])

    return(
        <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>
          Recomendações Diárias!
        </Text>
        {
        recipes.map((recipe)=>(
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))
        }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32
  }
})