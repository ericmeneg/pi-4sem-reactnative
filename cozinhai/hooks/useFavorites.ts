import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../app/_layout';

const API_URL = 'https://pi-3sem-backend.onrender.com';

export interface FavoriteRecipe {
  recipeId: string;
  title: string;
  recipeImage: string;
}

export function useFavorites() {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Verifica se uma receita está favoritada
  const isFavorite = useCallback(
    (recipeId: string | number) => {
      return favorites.some((fav) => fav.recipeId === String(recipeId));
    },
    [favorites]
  );

  // Carrega os favoritos do backend
  const loadFavorites = useCallback(
    async (isRefresh = false) => {
      if (!user || !token) {
        setFavorites([]);
        return;
      }

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        // Carrega todos os favoritos (limite alto para pegar todos de uma vez)
        const response = await fetch(
          `${API_URL}/user/${user.id}/favorites?limit=1000&offset=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setFavorites([]);
            return;
          }
          throw new Error(`Erro ao carregar favoritos: ${response.status}`);
        }

        const data = await response.json();
        const loadedFavorites: FavoriteRecipe[] = Array.isArray(data)
          ? data.map((fav: any) => ({
              recipeId: String(fav.recipeId),
              title: fav.title || 'Receita sem título',
              recipeImage: fav.recipeImage || '',
            }))
          : [];

        setFavorites(loadedFavorites);
      } catch (err: any) {
        console.error('Erro ao carregar favoritos:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user, token]
  );

  // Adiciona uma receita aos favoritos
  const addFavorite = useCallback(
    async (recipeId: string | number, title: string, image?: string) => {
      if (!user || !token) {
        Alert.alert(
          'Login necessário',
          'Você precisa fazer login para salvar receitas.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Fazer Login', onPress: () => {} },
          ]
        );
        return false;
      }

      const recipeIdStr = String(recipeId);

      // Verifica se já está favoritada
      if (isFavorite(recipeIdStr)) {
        Alert.alert('Aviso', 'Esta receita já está no seu livro de receitas!');
        return false;
      }

      try {
        const response = await fetch(`${API_URL}/user/${user.id}/favorites`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: recipeIdStr,
            title: title,
            recipeImage: image || '',
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erro ao salvar receita');
        }

        // Atualiza o estado local
        setFavorites((prev) => [
          {
            recipeId: recipeIdStr,
            title,
            recipeImage: image || '',
          },
          ...prev,
        ]);

        Alert.alert('Sucesso!', 'Receita salva no livro de receitas! 📖');
        return true;
      } catch (err: any) {
        console.error('Erro ao adicionar favorito:', err);
        Alert.alert('Erro', err.message || 'Não foi possível salvar a receita');
        return false;
      }
    },
    [user, token, isFavorite]
  );

  // Remove uma receita dos favoritos
  const removeFavorite = useCallback(
    async (recipeId: string | number) => {
      if (!user || !token) {
        return false;
      }

      const recipeIdStr = String(recipeId);

      try {
        const response = await fetch(
          `${API_URL}/user/${user.id}/favorites/${recipeIdStr}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erro ao remover receita');
        }

        // Atualiza o estado local
        setFavorites((prev) =>
          prev.filter((fav) => fav.recipeId !== recipeIdStr)
        );

        Alert.alert('Removido', 'Receita removida do livro de receitas.');
        return true;
      } catch (err: any) {
        console.error('Erro ao remover favorito:', err);
        Alert.alert('Erro', err.message || 'Não foi possível remover a receita');
        return false;
      }
    },
    [user, token]
  );

  // Toggle favorito (adiciona ou remove)
  const toggleFavorite = useCallback(
    async (recipeId: string | number, title: string, image?: string) => {
      const recipeIdStr = String(recipeId);

      if (isFavorite(recipeIdStr)) {
        return await removeFavorite(recipeIdStr);
      } else {
        return await addFavorite(recipeIdStr, title, image);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  // Carrega favoritos quando o usuário faz login
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    refreshing,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    loadFavorites,
  };
}