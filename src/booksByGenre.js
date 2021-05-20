var url = window.location.href;

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var genre = getParameterByName('genre');
var searchUrl = baseUrl + 'books/genre/' + genre;
console.log("the URL", url);
var books = [];
// make an ajax call to the rest server to get the data
$.ajax(searchUrl, {
    method: 'GET',
}).then(function (books) {
    console.log(books); 
    var book_out = "";

    books.ListOfBooks.forEach(function (b) {

        book_out += '<div class="col-4 card">\
                        \
                        <img class="card-img-top img-fluid" src=' + b.bookCover +' alt="Card image cap">\
                            <div class="card-body">\
                                <h3 class="card-title text-uppercase"> ' +b.title +'</h3>\
                                <h4 class="card-text font-italic"> ' +b.author +'</h5>\
                                <h5class="card-text">Rating: '+ parseFloat(b.rating).toFixed(1) +' /5</h5>\
                                \
                            </div>\
                            <a href="#" class="btn btn-primary">Borrow</a>\
                   \
                    </div>';

    });
    $('#booksFound').html(book_out);
    if(books.ListOfBooks.length == 0){
        var a = `<h2>No books found!!</h2>`;
        $('#booksFound').html(a);
    }
}).catch(function (err) {
    console.error(err);
    $('#all-genre').html(error_msg);
}); 