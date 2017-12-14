import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

// сервис для http-запросов
@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() { // сохраняем рецепты (метод PUT)
        return this.httpClient.put('https://ng-recipe-book-14a58.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() { // получаем рецепты (метод GET)
        this.httpClient.get('https://ng-recipe-book-14a58.firebaseio.com/recipes.json')
            .subscribe( // Сразу же подписываемся...
                (recipes: Recipe[]) => {
                    // Для того, чтобы не потерять тип Recipe, восстанавливаем свойство 'ingredients' в объекте
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    this.recipeService.updateRecipes(recipes); // ...и вызываем метод сервиса
                }
            );
    }
}
