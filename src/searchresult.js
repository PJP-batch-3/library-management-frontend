var url = window.location.href;

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var keyword = getParameterByName('keyword');
var searchUrl = baseUrl + 'books/search/' + keyword;
console.log("the URL", searchUrl);
var books = [];
// make an ajax call to the rest server to get the data
$.ajax(searchUrl, {
    method: 'GET',
}).then(function (books) {
    console.log(books); 
    var book_out = "";

    books.TheListOfBooks.forEach(function (b) {

        book_out += '<div class="col-4 card">\
                        <div class="card">\
                            <img class="card-img-top" src=' + b.bookCover +' alt="Card image cap">\
                            <div class="card-body">\
                            <h5 class="card-title"> Book Title' +b.title +'</h5>\
                            <h5 class="card-title"> Book Title' +b.genre +'</h5>\
                            <p class="card-text">'+ parseFloat(b.rating).toFixed(1) +' /5</p>\
                            <a href="#" class="btn btn-primary">Show More</a>\
                        </div>\
                    </div>\
                    </div>';

    });
    $('#booksFound').html(book_out);
}).catch(function (err) {
    console.error(err);
    $('#all-genre').html(error_msg);
});
