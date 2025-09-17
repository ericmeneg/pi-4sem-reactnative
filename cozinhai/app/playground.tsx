import DailyRecipes from "../components/DailyRecipes";
import ShareButton from "../components/ShareButton";
import { IRecipe } from "../interfaces/recipe.interface";

const receitaExemplo = {
  recipeUrl: "www.google.com",
  recipeTitle: "Salada",
};

export default function Playground() {
  return (
    <>
      <DailyRecipes />
    </>
  );
}
