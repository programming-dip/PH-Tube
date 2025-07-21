console.log("index connted")

const loadCategories = ()=> {
    // fetch the data
    const categoriesUrl = "https://openapi.programming-hero.com/api/phero-tube/categories";
    fetch(categoriesUrl)
    // convert the response promise to json
    .then((res)=>res.json())
    // send data to displayCategories
    .then((data)=>displayCategories(data.categories))
}

const displayCategories = (categories) => {
    // get the category container 
    const categoryContainer = document.getElementById("category-container");

    // Loop operation on array of object 
        categories.map(category => {
        // create Element 
        const categoryDiv = document.createElement("div");

        // fill with object data
        categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `
        
        // append Element

        categoryContainer.appendChild(categoryDiv);
        })
        

}



loadCategories();