const loadData = search =>{
    const mealName = document.getElementById("meal-input").value;
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => displaySearch(data))
    .catch(error =>{
        const searchDetails = document.getElementById("meal-details");
        const notFoundMessage = `
        <h4 id= "error"> "We do not serve ${mealName}"</h4>
        `;
        searchDetails.innerHTML= notFoundMessage;
        const searchResults = document.getElementById("search-results");
        searchResults.innerHTML = ''; 
        document.getElementById("meal-input").value = '';
    })

    const displaySearch = meals =>{
        const mealsArray = meals.meals
        const searchResults = document.getElementById("search-results");
        mealsArray.forEach(meal => {
            const mealDiv = document.createElement("div");
            mealDiv.className = "mealDiv";
            const mealInfo = `
            <img onclick="displayDetails(${meal.idMeal})"src="${meal.strMealThumb} ">
            <br>
            <a onclick="displayDetails(${meal.idMeal})" href=#search-details>${meal.strMeal} </a>
            `;
            mealDiv.innerHTML = mealInfo;
            searchResults.appendChild(mealDiv);
            const errorMessage = document.getElementById("error")
            if(errorMessage != null){
                document.getElementById("error").innerText = "";
            }
            document.getElementById("meal-input").value = '';
        });
        }         
}


const displayDetails = mealID =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
    .then(res => res.json())
    .then(data => renderDetails(data))
}
const renderDetails = meals =>{
    const mealDetails = document.getElementById("meal-details");
    const detailsArray = meals.meals[0];
    mealDetails.innerHTML = `
    <div id="details">
    <img src="${detailsArray.strMealThumb}">
    <h2>${detailsArray.strMeal}</h2>
    <h4> Ingredients: <h4>
    <ul>
    <li># ${detailsArray.strMeasure1} ${detailsArray.strIngredient1}</li> 
    <li># ${detailsArray.strMeasure2} ${detailsArray.strIngredient2}</li> 
    <li># ${detailsArray.strMeasure3} ${detailsArray.strIngredient3}</li> 
    <li># ${detailsArray.strMeasure4} ${detailsArray.strIngredient4}</li> 
    <li># ${detailsArray.strMeasure5} ${detailsArray.strIngredient5}</li> 
    <li># ${detailsArray.strMeasure6} ${detailsArray.strIngredient6}</li> 
    <li># ${detailsArray.strMeasure7} ${detailsArray.strIngredient7}</li> 
    <li># ${detailsArray.strMeasure8} ${detailsArray.strIngredient8}</li> 
    <li># ${detailsArray.strMeasure9} ${detailsArray.strIngredient9}</li> 
    <li># ${detailsArray.strMeasure10} ${detailsArray.strIngredient10}</li> 
     </ul>
    </div>
    `;
} 