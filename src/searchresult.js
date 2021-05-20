var keyword = "Biography";
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

        book_out += '<div class="col-md-3 col-xs-12">\
                        <div class="card">\
                            <img class="card-img-top" src=' + b.bookCover +' alt="Card image cap">\
                            <div class="card-body">\
                            <h5 class="card-title"> Book Title' +b.title +'</h5>\
                            <h5 class="card-title"> Book Title' +b.genre +'</h5>\
                            <p class="card-text">BOOK Description</p>\
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