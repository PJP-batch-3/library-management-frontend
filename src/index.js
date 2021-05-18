var genreUrl = baseUrl + 'books/genre';

var genres = [];
// make an ajax call to the rest server to get the data
$.ajax(genreUrl, {
    method: 'GET',
}).then(function (genre) {
    var genres_out = '<div class="nav nav-pills" id="all-genre">';
    genre = genre.ListOfGenres;

    genre.forEach(function (g) {
        genre_name = g // Replace with proper variable name
        genres.push(genre_name)
        genres_out += '<div class="nav-item genre">\
                            <a class="nav-link" href="#">' + genre_name + '</a>\
                        </div>';
    });

    genres_out += '</div>';

    $('#all-genre').html(genres_out);
}).catch(function (err) {
    console.error(err);
    $('#all-genre').html(error_msg);
}).then(function () {
    // Most popular books
    var dom_id = '#most-popular-books';
    var booksUrl = baseUrl + 'books/mostpopular';
    getBooks(booksUrl, dom_id);

    genres.forEach(function (genre_name) {
        console.log(genre_name)
        var wrapper = document.createElement('div');
        wrapper.classList.add('row');
        wrapper.classList.add('mt-5');
        wrapper.innerHTML = '<div class="d-flex mb-2 text-left col-12 index-genre-heading">\
                            <h4 class="card-title">'+ genre_name + '</h4>\
                        </div>\
                        <div class="owl-carousel owl-theme" id="'+ genre_name + '"></div>';

        var container = document.getElementById("index-body-container");
        container.appendChild(wrapper);

        var booksUrl = baseUrl + 'books/genre/' + encodeURI(genre_name);
        getBooks(booksUrl, "#" + genre_name);
    });

});