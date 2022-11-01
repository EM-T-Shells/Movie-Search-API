//var titleEl = document.getElementById('title');
//var descriptionEl = document.getElementById('description');
//var posterEl = document.getElementById('poster');
//var releaseEL = document.getElementById('release');
//var voteEl = document.getElementById('vote');
var searchEL = document.getElementById('search-input')
var searchResults = document.getElementById("results");
var searchBtnEL = document.getElementById('search-btn');
var apiKey ="70322234d406f0f338990f054502b826";
stateName = "Jack Reacher";
var globalTitle = "";

function formSubmitHandler(event){
    event.preventDefault();
    var movie = searchEL.value.trim();
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


        console.log("hit"); 


        //var search = data.results[0];
        console.log(data);
        searchResults.innerHTML="";
        
        //grabs relevant api data and asigns it to a ve
        for (i = 0; i < data.results.length; i++){
        
        var title = data.results[i].original_title;
        globalTitle = title;
        var description = data.results[i].overview;
        var release = data.results[i].release_date;
        var vote = data.results[i].vote_average;
        
        
        var titleAppend = document.createElement("h2");
        titleAppend.innerHTML = title;

        searchResults.appendChild(titleAppend);

        
        console.log("URL",dataWithImg.results[i].posterUrl);
        var posterAppend = document.createElement("img");
        posterAppend.setAttribute("src",dataWithImg.results[i].posterUrl);
        searchResults.appendChild(posterAppend);
         
        
    
        var voteAppend = document.createElement("h2");
        voteAppend.innerHTML = vote + " out of 10 Stars!"
        searchResults.appendChild(voteAppend);
        
        var releaseAppend = document.createElement("h3");
        releaseAppend.innerHTML = release;
        searchResults.appendChild(releaseAppend);
        
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
       


searchBtnEL.addEventListener("click",formSubmitHandler)

 console.log(searchResults);