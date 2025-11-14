import IIngredients from "./ingredient.interface"

export interface IRecipe {
    id: number,
    title: string,
    image: string  
    servings?: number
    readyInMinutes?: number
    extendedIngredients?: IIngredients[],
    instructions?: string
}
