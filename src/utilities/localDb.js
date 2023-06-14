const addToDb=(id,recipe)=>{
    let favoriteRecipes= getFavoriteRecipes();
    favoriteRecipes[id]=recipe;
    localStorage.setItem('favorite-recipes',JSON.stringify(favoriteRecipes));
}
const getFavoriteRecipes= ()=>{
    let favoriteRecipes={};
    const storedFavoriteRecipes= localStorage.getItem('favorite-recipes');
    if(storedFavoriteRecipes){
        favoriteRecipes=JSON.parse(storedFavoriteRecipes);
    }
    return favoriteRecipes;
};

export {addToDb,getFavoriteRecipes}