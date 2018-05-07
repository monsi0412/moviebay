/*global $*/
$(document).ready(function() {
    $("#movieInput").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#search").click();
        }
    });

    $("#random").click(function() {
        var randomNum = Math.floor(Math.random() * (600 - 2)) + 2;
        var posterBaseUrl = "https://image.tmdb.org/t/p/w500";

        $.ajax({
            url: "https://api.themoviedb.org/3/movie/" + randomNum + "?api_key=2f895a9ca3eb8c4703edbfba5c8369b1",
            method: "GET",
            success: function(response) {
                var movieTitle = response.title;
                var posterUrl = response.poster_path;
                var movieSummary = response.overview;
                var movieRating = response.vote_average;
                var movieLanguage = response.original_language;
                var movieYear = response.release_date;
                var finalPosterUrl = posterBaseUrl + posterUrl;
                if (movieLanguage == "en") {
                    movieLanguage = "English";
                }
                else if (movieLanguage=="it"){
                    movieLanguage= "Italian";
                }
                else if (movieLanguage=="es"){
                    movieLanguage="Spanish";
                }
                else if(movieLanguage=="fr"){
                    movieLanguage="French";
                }
                else if(movieLanguage=="pt"){
                    movieLanguage="Portuguese";
                }
                else if(movieLanguage=="zh"){
                    movieLanguage="Chinese";
                }
                else if(movieLanguage=="ja"){
                    movieLanguage="Japanese";
                }
                else if(movieLanguage=="de"){
                    movieLanguage="German";
                }
                else if (movieLanguage=="hi"){
                    movieLanguage="Hindi";
                }
                $("#moviePoster").html("<img class = 'img-fluid' src='" + finalPosterUrl + "'>");
                $("#title").html("<h3 id='movieTitle'>" + movieTitle + "</h3>");
                $("#year").html("<h6>Release: " + movieYear + "<h6>");
                $("#rating").html("<h6>Rating: " + movieRating + "</h6>");
                $("#language").html("<h6>Language: " + movieLanguage + "</h6>");
                $("#summary").html("<p>" + movieSummary + "</p><p><button type='button' class='btn btn-light' data-toggle='modal' data-target='#trailerModal' id='modalButton'>Click For Trailer</button></p>");
                showTrailer(movieTitle);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error");
            }
        });
        $("#moviePosterCol").css({"background":"rgba(128,128,128,0.8)", "padding-top":"20px"});
        $("#movieInfo").css("background","rgba(128,128,128,0.8)");
    });

    $("#search").click(function() {
        var id = $('#movieInput').val();
        var posterBaseUrl = "https://image.tmdb.org/t/p/w500";

        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + id + "&language=en-US&api_key=2f895a9ca3eb8c4703edbfba5c8369b1",
            method: "GET",
            success: function(response) {
                var movieTitle = response.results[0].title;
                var posterUrl = response.results[0].poster_path;
                var movieSummary = response.results[0].overview;
                var movieRating = response.results[0].vote_average;
                var movieLanguage = response.results[0].original_language;
                var movieYear = response.results[0].release_date;
                var finalPosterUrl = posterBaseUrl + posterUrl;
                if (movieLanguage == "en") {
                    movieLanguage = "English";
                }
                 else if (movieLanguage=="it"){
                    movieLanguage= "Italian";
                }
                else if (movieLanguage=="es"){
                    movieLanguage="Spanish";
                }
                else if(movieLanguage=="fr"){
                    movieLanguage="French";
                }
                else if(movieLanguage=="pt"){
                    movieLanguage="Portuguese";
                }
                else if(movieLanguage=="zh"){
                    movieLanguage="Chinese";
                }
                else if(movieLanguage=="ja"){
                    movieLanguage="Japanese";
                }
                else if(movieLanguage=="de"){
                    movieLanguage="German";
                }
                else if (movieLanguage=="hi"){
                    movieLanguage="Hindi";
                }
                $("#moviePoster").html("<img class='img-fluid' src='" + finalPosterUrl + "'>");
                $("#title").html("<h3 id='movieTitle'>" + movieTitle + "</h3>");
                $("#year").html("<h6>Release: " + movieYear + "<h6>");
                $("#rating").html("<h6>Rating: " + movieRating + "</h6>");
                $("#language").html("<h6>Language: " + movieLanguage + "</h6>");
                $("#summary").html("<p>" + movieSummary + "</p><p><button type='button' class='btn btn-light' data-toggle='modal' data-target='#trailerModal' id='modalButton'>Click For Trailer</button></p>");
                showTrailer(movieTitle);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("some error");
            }
        });
        $("#movieInput").val("");
        $("#moviePosterCol").css({"background":"rgba(128,128,128,0.8)", "padding-top":"20px"});
        $("#movieInfo").css("background","rgba(128,128,128,0.8)");

    });

    function showTrailer(movietitle) {

        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + movietitle + "%20trailer" + "&type=video&key=AIzaSyA_C6IlCDqhJm0p26r8m20OOAMkOAgnCcQ";
        $.getJSON(url, function(data) {
            var videoId = data.items[0].id.videoId;
            $("#youtubeTrailer").html('<iframe width="465" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            
        });
    }







});
