var titleEl = document.getElementById("");
var descriptionEl = document.getElementById("");
var posterEl = document.getElementById("");
var releaseEL = document.getElementById("");
var voteEl = document.getElementById("");
var searchEL = document.getElementById("search-input");
var searchBtnEL = document.getElementById("search-btn");
var apiKey ="70322234d406f0f338990f054502b826";
stateName = "Jack+Reacher";
function movieSearch(){
let querlyUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&query=" + stateName;

fetch(querlyUrl).then(function (response){
    response.json().then(function(data){
        //var search = data.results[0];
        //console.log(search);
        var title = data.results[0].original_title;
        var description = data.results[0].overview;
        var poster = data.results[0].poster_path;
        var release = data.results[0].release_date;
        var vote = data.results[0].vote_average; 
        //console.log(vote);
        titleEl.innerHTML = title;
        voteEl.innerHTML = vote + " out of 10 Stars!"
        posterEl.setAttribute("src",poster);
        releaseEL.innerHTML = release;
        descriptionEl.innerHTML = description;


    })
})

}
searchBtnEL.addEventListener("click", function(){
    var searchEntry = searchEL.value;
    movieSearch();
})
 