const SPOONACULAR_API_KEY = 'cd69d4122e7741a99c0ad457c4b94698';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const spoonacularService = {
  async searchRecipes(query, searchType = 'both' ) {
    try {
      let endpoint = '';
      let params = new URLSearchParams({
        apiKey: SPOONACULAR_API_KEY,
        number: 20,
        addRecipeInformation: true,
        fillIngredients: true
      });

      if (searchType === 'ingredients') {
        endpoint = `${BASE_URL}/findByIngredients`;
        params.append('ingredients', query);
        params.append('ranking', 1); 
      } else if (searchType === 'name') {
        endpoint = `${BASE_URL}/complexSearch`;
        params.append('query', query);
      } else {
        endpoint = `${BASE_URL}/complexSearch`;
        params.append('query', query);
        params.append('includeIngredients', query);
      }

      const response = await fetch(`${endpoint}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      
      if (searchType === 'ingredients') {
        return {
          results: data.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            usedIngredientCount: recipe.usedIngredientCount,
            missedIngredientCount: recipe.missedIngredientCount,
            usedIngredients: recipe.usedIngredients,
            missedIngredients: recipe.missedIngredients
          })),
          totalResults: data.length
        };
      } else {
        return {
          results: data.results || [],
          totalResults: data.totalResults || 0
        };
      }
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      throw error;
    }
  },

  async getRecipeDetails(recipeId) {
    try {
      const params = new URLSearchParams({
        apiKey: SPOONACULAR_API_KEY,
        includeNutrition: true
      });

      const response = await fetch(`${BASE_URL}/${recipeId}/information?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao obter detalhes da receita:', error);
      throw error;
    }
  },

  async autocompleteRecipeSearch(query) {
    try {
      const params = new URLSearchParams({
        apiKey: SPOONACULAR_API_KEY,
        query: query,
        number: 10
      });

      const response = await fetch(`${BASE_URL}/autocomplete?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro no autocompletar:', error);
      throw error;
    }
  }
};
