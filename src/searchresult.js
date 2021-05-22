var url = window.location.href;

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var keyword = getParameterByName('keyword').trim();
var allbooks = [];

if (keyword=="") {
    var a = `<h2>No books found!!</h2>`;
    $('#booksFound').html(a);
} else {
    var searchUrl = baseUrl + 'books/search/' + keyword;
    console.log("the URL", searchUrl);
    // make an ajax call to the rest server to get the data
    $.ajax(searchUrl, {
        method: 'GET',
    }).then(function (books) {
        console.log(books); 
        var book_out = "";

        books.TheListOfBooks.forEach(function (b) {
            allbooks.push(b);

            book_out += '<div class="col-4 card">\
                            <div class="card">\
                                <img class="card-img-top" src=' + b.bookCover +' alt="Card image cap">\
                                <div class="card-body">\
                                <h5 class="card-title"> Title: ' + b.title +'</h5>\
                                <h5 class="card-title"> Genre: ' + b.genre +'</h5>\
                                <h5 class="card-info"> Author: ' + b.author +'</h5>\
                                <p class="card-text">'+ parseFloat(b.rating).toFixed(1) +' /5.0</p>\
                                <a href="book.html?isbn='+ b.isbn + '" class="btn btn-primary">Show More</a>\
                            </div>\
                        </div>\
                        </div>';

        });
        $('#booksFound').html(book_out);
        if(books.TheListOfBooks.length == 0){
            var a = `<h2>No books found!!</h2>`;
            $('#booksFound').html(a);
        }
    }).catch(function (err) {
        console.error(err);
        $('#all-genre').html(error_msg);
    });
}


function applyFilterAndOrder(allbooks,filter="title",order="ASC"){
    var searchUrl = baseUrl + 'books/'+filter+'/' + order;
    console.log("the URL", searchUrl);
    var books = [];
    // make an ajax call to the rest server to get the data
    $.ajax(searchUrl, {
        method: 'GET',
    }).then(function (books) {
        console.log(books); 
        var book_out = "";

        booksarray = books.TheListOfBooks
        console.log("booksarray");
        console.log(booksarray);
        console.log("allbooks");
        console.log(allbooks);
        const filteredArray = booksarray.filter(e => {
            return allbooks.some(item => item.isbn === e.isbn); // take the ! out and you're done
         });
        console.log(filteredArray);


        filteredArray.forEach(function (b) {

            book_out += '<div class="col-4 card">\
                            <div class="card">\
                                <img class="card-img-top" src=' + b.bookCover +' alt="Card image cap">\
                                <div class="card-body">\
                                <h5 class="card-title"> Title: ' + b.title +'</h5>\
                                <h5 class="card-title"> Genre: ' + b.genre +'</h5>\
                                <h5 class="card-info"> Author: ' + b.author +'</h5>\
                                <p class="card-text">'+ parseFloat(b.rating).toFixed(1) +' /5.0</p>\
                                <a href="book.html?isbn='+ b.isbn + '">Show More</a>\
                            </div>\
                        </div>\
                        </div>';

        });
        $('#booksFound').html(book_out);
        if(books.TheListOfBooks.length == 0){
            var a = `<h2>No books found!!</h2>`;
            $('#booksFound').html(a);
        }
    }).catch(function (err) {
        console.error(err);
        $('#all-genre').html(error_msg);
    });
}
    



$(function() {
    $("#filterby").on("change",function() {
      const filter = this.value;
      console.log(filter);
      applyFilterAndOrder(allbooks,filter);
      this[0].selected = true;

    }); 
  });
