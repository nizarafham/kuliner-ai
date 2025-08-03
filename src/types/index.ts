export type History = {
  id: string;
  created_at: string;
  ingredient: string;
  province: string;
  recipe_name: string;
  recipe_result: {
    ingredients: string[];
    steps: string[];
  };
  user_id: string;
};