const form = document.querySelector(".form")
const input = document.querySelector(".input")
const cards = document.querySelector(".cards")
const modal = document.querySelector(".modal")
const icon = document.querySelector(".icon")
const select = document.querySelector("select")
const option = document.querySelector("option")
const loading = document.querySelector(".loading")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    const apiLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`

    getData(apiLink)
    input.value = ""
})

input.addEventListener("input", (e) => {
    e.preventDefault()
    const apiLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`

    getData(apiLink)
})


const getData = async (link) => {
    loading.classList.add("active")
    const req = await fetch(link)
    const data = await req.json()
    writeData(data);
    loading.classList.remove("active")
}

const writeData = (data) => {
    cards.innerHTML = ""
    const datas = data.meals
    datas.forEach((item) => {
        cards.innerHTML += `
        <div class="card">
                        <img src="${item.strMealThumb}"
                            alt="">
                        <h1>${item.strMeal.slice(0, 15)}...</h1>
                        <button onclick="recipeModal(${item.idMeal})">Get Recipe</button>
                    </div>
        `
    });
}


const recipeModal = (id) => {
    modal.classList.add("active")
    const apiId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    getId(apiId);


}

const getId = async (link) => {
    const req = await fetch(link)
    const data = await req.json()
    writeId(data);

}



writeId = (data) => {
    console.log(data.meals[0]);
    modal.innerHTML = `
                <div onclick="exit()" class="icon">
                    <i class="fa-solid fa-xmark"></i>
                </div>
           
                    <h1>${data.meals[0].strMeal}</h1>
                    <button>${data.meals[0].strCategory}</button>
                    <h3>Instructions:</h3>
                    <p>${data.meals[0].strInstructions}</p>
                    <img src="${data.meals[0].strMealThumb}"
                        alt="">
                    <div class="a_tag">
                        <a target="_blank" href="${data.meals[0].strYoutube}">Watch video</a>
                    </div>
    `
}

const getArea = async (link) => {
    loading.classList.add("active")
    const req = await fetch(link)
    const data = await req.json()
    loading.classList.remove("active")

    writeData(data);

}

select.addEventListener("change", () => {
    const apiArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${select.value}`
    getArea(apiArea);


});


const exit = () => {
    modal.classList.remove("active")
}


