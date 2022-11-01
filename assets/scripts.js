var searchEL = document.getElementById('search-input')
var searchResults = document.getElementById("results");
var searchBtnEL = document.getElementById('search-btn');
var apiKey ="70322234d406f0f338990f054502b826";
var searchHistoryEl = document.getElementById('search-history');
var searchCLear = document.getElementById('search-clear');
//stateName = "Jack Reacher";
var globalTitle = "";
let searchHistory = JSON.parse(localStorage.getItem("movie")) || [];

function formSubmitHandler(event){
    event.preventDefault();
    var movie = searchEL.value.trim();
    //console.log("hello",searchHistory);

    searchHistory.push(searchEL.value.trim());
    localStorage.setItem("movie",JSON.stringify(searchHistory));

    getSearchHistory();
    if (movie){
        movieSearch(movie)
        searchEL.value = "";
    }
}

function movieSearch(movies){
 let querlyUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&query=" + movies;
// fetches api and converts its content in to data
fetch(querlyUrl).then(function (response){
    response.json().then(async function(data){
        var dataWithImg = data
        for (i = 0; i < data.results.length; i++){
           var poster = await getPoster(data.results[i].original_title);
           console.log("Poster",poster);
           dataWithImg.results[i].posterUrl = poster;
        }
        //console.log("hit");


        //var search = data.results[0];
        //console.log(data);
        searchResults.innerHTML = " ";

        //grabs relevant api data and asigns it to a ve
        for (i = 0; i < data.results.length; i++){

        var title = data.results[i].original_title;
        globalTitle = title;
        var description = data.results[i].overview;
        var release = data.results[i].release_date;
        var vote = data.results[i].vote_average;

        //title element
        var titleAppend = document.createElement("h2");
        titleAppend.innerHTML = title;
        searchResults.appendChild(titleAppend);


        console.log("URL",dataWithImg.results[i].posterUrl);
        var posterAppend = document.createElement("img");
        posterAppend.setAttribute("src",dataWithImg.results[i].posterUrl);
        searchResults.appendChild(posterAppend);


        // rating element
        var voteAppend = document.createElement("h2");
        voteAppend.innerHTML = vote + " out of 10 Stars!"
        searchResults.appendChild(voteAppend);
        //release element
        var releaseAppend = document.createElement("h3");
        releaseAppend.innerHTML = release;
        searchResults.appendChild(releaseAppend);
        //description element
        var descriptionAppend = document.createElement("p");
        descriptionAppend.innerHTML = description;
        searchResults.appendChild(descriptionAppend);



        }
       // titleEl.innerHTML = title;
        //voteEl.innerHTML = vote + " out of 10 Stars!"
        //releaseEL.innerHTML = release;
        //descriptionEl.innerHTML = description;


    })
})

}
async function getPoster(title){
        console.log("title",title)
        var posterKey = "2af1bbf8";
        let posterUrl = "http://www.omdbapi.com/?apikey=" + posterKey + "&t=" + title;
   var response = await fetch(posterUrl)
   var parsedResponse = await response.json()

          // console.log(data2);
           var poster = parsedResponse.Poster;
            // console.log("poster",poster);
           //var posterAppend = document.createElement("img");
        //    posterAppend.setAttribute("src",poster);
        //   titleAppend.appendChild(posterAppend);
         // console.log(posterLink);

        return poster;
        }

function getSearchHistory(){
    searchHistoryEl.innerHTML = "";
    if (searchHistory !=""){
    searchHistory = JSON.parse(localStorage.getItem("movie"));
    for (i = 0; i < searchHistory.length; i++){
        var appendHistory = document.createElement("p")

        appendHistory.innerHTML = searchHistory[i];
        searchHistoryEl.appendChild(appendHistory);
        //console.log(appendHistory);
    }
}
}

searchBtnEL.addEventListener("click",formSubmitHandler)
searchCLear.addEventListener("click",formCLear)
function formCLear(){
    searchHistory = [];
    localStorage.setItem("movie",JSON.stringify(searchHistory));
    getSearchHistory();
}
if (searchHistory !=""){
getSearchHistory();
}
 /*console.log(searchResults);
 console.log(searchHistoryEl);
 console.log(searchHistory);*/
