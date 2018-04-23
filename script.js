/*global $*/
$(document).ready(function(){
    $("#movieInput").keyup(function(event) {
		if (event.keyCode === 13) {
			$("#search").click();
		}
	});
  
$("#random").click(function() {
  console.log("worked"); 
});

$("#search").click(function(){
    console.log("button works");
    var id = $('#movieInput').val();
    var posterBaseUrl="https://image.tmdb.org/t/p/w500";
    
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + id +"&language=en-US&api_key=2f895a9ca3eb8c4703edbfba5c8369b1",
      method: "GET",
      success: function(response) {
        console.log(response);
        var movieTitle=response.results[0].title;
        var posterUrl=response.results[0].poster_path;
        var movieSummary=response.results[0].overview;
        var movieRating=response.results[0].vote_average;
        var movieLanguage=response.results[0].original_language;
        var movieYear=response.results[0].release_date;
        var finalPosterUrl=posterBaseUrl+posterUrl;
        console.log(finalPosterUrl);
        if(movieLanguage=="en"){
            movieLanguage="English";
        }
        $("#moviePoster").append("<img src='" +finalPosterUrl +"'>");
        $("#title").append("<h5>"+movieTitle+"</h5>");
        $("#year").append("<h6>"+movieYear+"<h6>");
        $("#rating").append("<h7>"+movieRating+"</h7>");
        $("#language").append("<h7>"+movieLanguage+"</h7>");
        $("#summary").append("<p>"+movieSummary+"</p>");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
     alert("some error");
    }}); 


});

function showTrailer(movietitle) {
    
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + movietitle + "&type=video&key=AIzaSyA_C6IlCDqhJm0p26r8m20OOAMkOAgnCcQ";
        $.getJSON( url, function( data ) {
            var videoId = data.items[0].id.videoId;
            $("#youtubeTrailer").html('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId +'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        }); 
    }
    
    
    
    
    


});

