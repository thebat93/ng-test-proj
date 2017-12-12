import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingerdient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    constructor(private shoppingListService: ShoppingListService) { }
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('Мясо', 'Невероятно вкусно', './assets/FC_Spartak_Moscow_logo.png',
            [new Ingredient('Мясо', 1), new Ingredient('Картофель фри', 20)]),
        new Recipe('Мясной бургер', 'Пальчики оближешь', './assets/FC_Spartak_Moscow_logo.png',
            [new Ingredient('Булочки', 2), new Ingredient('Стейк', 1)])
      ];
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
