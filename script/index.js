// fetch the categories from API
const loadCategories = async () => {
    const categoriesUrl = "https://openapi.programming-hero.com/api/phero-tube/categories";
    try {
        const categoryData = await fetch(categoriesUrl);
        const res = await categoryData.json();
        const categoriesArr = res.categories;
        displayCategories(categoriesArr);
    }
    catch (error) {
        console.log(error);
    }
}

// fetch the videos from the API
const loadVideos = async (search = "") => {
    const videosUrl = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`;
    try {
        const response = await fetch(videosUrl);
        const videosData = await response.json();
        const videosArr = (videosData.videos);
        displayVideos(videosArr);

    }
    catch (error) {
        console.log(error);
    }

    // Make the inactive buttons
    removeActiveClass();

    // Make the 'all' button red
    addActiveClass("btn-all"); 
}

// fetch video with catagory id and post to page
const loadCategoryVideos =  (id)=>{
    
    const loadCategoryVideosUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(loadCategoryVideosUrl)
    .then(res=>res.json())
    .then(data=> displayVideos(data.category));

    // Make the inactive buttons
    removeActiveClass();

    // Make the active button red
    addActiveClass(`btn-${id}`);    

}

// function to post videos into page
const displayVideos = (videosArr) => {
    // console.log(videosArr);
    // get the videos-container
    const videosContainer = document.getElementById("videos-container");

    // make the video container empty
    videosContainer.innerHTML="";
    
    // If no videos
    if (videosArr.length==0) {
        videosContainer.innerHTML = `
        <div class="col-span-full text-center flex flex-col justify-center items-center py-32">
            <img src="./assets/Icon.png" class="w-30"></img>
            <h2 class="text-2xl font-bold py-9                       ">Oops!! Sorry, There is no content here</h2>
        <div>
        `
        return;
    }

    // loop the data
    videosArr.forEach((video) => {
        // create the category element
        const videoCard = document.createElement("div")

        // logic for filling verification data
        let verificationBadge ="";
        if(video.authors[0].verified){
            verificationBadge = "https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png";
        }

        // fill the element with data
        videoCard.innerHTML = `
               <div class="card bg-base-100">
            <figure class="relative">
                <span class="absolute bottom-2 right-2 text-white text-sm bg-black rounded px-2">3hrs 56 min ago</span>
                <img class="w-full h-36" src="${video.thumbnail}" alt="${video.title}" />
            </figure>
            <div class="card-body flex flex-row gap-3 px-0">
                <div class="profile">
                    <div class="avatar">
                        <div class="w-9 rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="info">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img src="${verificationBadge}" onerror="this.style.display = 'none';" class="w-5 h-5" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
        </div>
        `
        // append the element
        videosContainer.appendChild(videoCard);
    })
}

// function to put the categories into page
const displayCategories = (categoriesArr) => {
    // console.log(categoriesArr);

    // category: "Music"
    // category_id: "1001"

    // get the category-container
    const categoryContainer = document.getElementById("category-container");
    // loop the data
    categoriesArr.map((category) => {
        // create the category element 
        const categoryDiv = document.createElement("div");
        // fill the element with data
        categoryDiv.innerHTML = `
        <button onclick="loadCategoryVideos(${category.category_id})" id="btn-${category.category_id}" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white cat-btn">${category.category}</button>
        `
        // append the element
        categoryContainer.appendChild(categoryDiv);
    })


}


// function to make the buttons inactive
const removeActiveClass = () => {
    const nonActiveBtns = [...document.getElementsByClassName("cat-btn")];
    nonActiveBtns.forEach(nonActiveBtn=>{
        nonActiveBtn.classList.remove("active");
    })
}

// function to make the active button
const addActiveClass = (btnId) => {
    const activeBtn = document.getElementById(btnId);
    activeBtn.classList.add("active");
};

// Search Functionality

const searchField = document.getElementById("search-input");
searchField.addEventListener("keyup",(e)=> {
    const input = e.target.value;
   loadVideos(input);
})

loadCategories();
loadVideos();