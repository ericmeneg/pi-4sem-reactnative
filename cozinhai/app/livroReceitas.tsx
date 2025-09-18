import { IRecipe } from "../interfaces/recipe.interface"
import RecipeCard from "../components/RecipeCard"
import { ScrollView } from "react-native"

export default function LivroReceitas(){
    let receitasDemo: IRecipe[] = [{
        id:648348,
        title:"Jalapeno Cornbread Stuffing",
        image: "https://img.spoonacular.com/recipes/648348-556x370.jpg"
    },{
        id: 796873,
        title: "Yogurt Parfait",
        image: "https://img.spoonacular.com/recipes/796873-556x370.jpg"
    },{
        id: 634965,
        title: "Bibimbab (Korean Rice w Vegetables & Beef)",
        image: 	"https://img.spoonacular.com/recipes/634965-556x370.jpg"

    },{
        id: 633668,
        title: "Baked Lemon~Lime Chicken Wings",
        image: 	"https://img.spoonacular.com/recipes/633668-556x370.jpg"
    },{
        id: 642138,
        title: 	"Easy Vegetable Fried Rice",
        image: 	"https://img.spoonacular.com/recipes/642138-556x370.jpg"
    },{
        id: 635345,
        title: 	"Blue Cheese and Mushroom Turkey Burger",
        image: "https://img.spoonacular.com/recipes/635345-556x370.jpg"
    }]
    
    return(
        <>
        <ScrollView>
        {
            receitasDemo.map((receita) =>(
                <RecipeCard 
                key = {receita.id}
                recipe = {receita}/>
            ))
        }
        </ScrollView>
        </>
    )
}