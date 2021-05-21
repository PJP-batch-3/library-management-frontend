function getBookDetails(url) {
    // make an ajax call to the rest server to fetch book details
    $.ajax(url, {
        method: 'GET',
    }).then(function (books) {
        console.log(books.Book)
        $('#book-title').html(books.Book.title);
        $('#book-author').html(books.Book.author);
        $('#book-genre').html(books.Book.genre);
        $('#book-publisher').html(books.Book.publisher);
        $('#book-copies').html(books.Book.quantity);
        $('#book-rating').html("Rating: "+parseFloat(books.Book.rating).toFixed(1)+"/5.0");
        $('#book-cover').attr('src', books.Book.bookCover)

        getSimilarBooks(books.Book.genre, books.Book.isbn);

    }).catch(function (err) {
        console.error(err);
        $(dom_id).html(error_msg);
    });
}

//--------------------------------------------------------------------------------------------------------------------------

function getReviews(url) {
    // make an ajax call to the rest server to fetch reviews
    $.ajax(url, {
        method: 'GET',
    }).then(function (reviews) {
        console.log(reviews);
        displayReviews(reviews.ListOfReviews)
    }).catch(function (err) {
        console.error(err);
        $(dom_id).html(error_msg);
    });
}

function displayReviews(reviews){
    var review_display = " ";
    if(reviews.length){
        reviews.forEach(function (review){
            review_display += '<blockquote class="blockquote text-left"> \
                <p class="mb-0">'+ review.review +'</p><br> \
                <p class="mb-0 text-right"><b> RATING : '+ review.rating +'/5 </b></p> \
                <footer class="blockquote-footer text-right"> <cite title="Source Title">' + review.userName + '</cite></footer> \
            </blockquote>';
        });
    }
    else{
        review_display += "<h3><b>There are no reviews for this book!</b></h3>"
    }
    $("#reviews").html(review_display);
}

//--------------------------------------------------------------------------------------------------------------------------

function getSimilarBooks(genre, isbn){
    var similarBooksUrl = baseUrl + "books/genre/" + genre
    $.ajax(similarBooksUrl, {
        method: 'GET',
    }).then(function (books) {
        console.log(books);
        displaySimilarBooks(books, isbn)
    }).catch(function (err) {
        console.error(err);
        $(dom_id).html(error_msg);
    });
}

function displaySimilarBooks(books, ogIsbn) {
    
    var books_out = '';
    books = books.ListOfBooks;

    books.forEach(function (book) {
        book_title = book.title; // Replace with proper variable name
        book_author = book.author;
        book_image_url = book.bookCover;
        book_isbn = book.isbn;
        book_rating = book.rating

        if(book_isbn != ogIsbn){
            books_out += '<div class="carouselss-item">\
                            <a href="book.html?isbn='+ book_isbn + '">\
                                <div class="carouselss-item-image">\
                                    <img src="'+ book_image_url + '" class="item-image">\
                                </div>\
                                <div class="carouselss-item-text overlay-books align-middle">\
                                <span class="title">'+ book_title + '</span>\
                                <span class="info"><h6>By: '+ book_author +'</h6><h5 class="books-rating">\
                                RATING: '+ parseFloat(book_rating).toFixed(1) +'/5.0</h5></span>\
                                </div>\
                            </a>\
                        </div>';
        }
    });

    $("#similar-books").html(books_out);
    var owl = $("#similar-books");
    owl.owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        responsiveClass: true,
        navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
        responsive: {
            0: {
                items: 2,
                margin: 10,
                stagePadding: 20,
                nav: false,
            },
            600: {
                items: 3,
                margin: 15,
                stagePadding: 50,
                nav: false,
            },
            1092: {
                items: 5
            }
        }
    });
}


//--------------------------------------------------------------------------------------------------------------------------

function checkAvailability(url) {
    // make an ajax call to the rest server to fetch book details
    $.ajax(url, {
        method: 'GET',
    }).then(function (response) {
        console.log(response)
        if(response.Availability == null){
            $("#borrow-button").html("<h3> Copies Currently Unavailable </h3>");
            $("#borrow-button").prop('disabled', true);
        }
    }).catch(function (err) {
        console.error(err);
        $(dom_id).html(error_msg);
    });
}

//--------------------------------------------------------------------------------------------------------------------------

window.onload = function () {
    var url = document.location.href, params = url.split('?')[1].split('&')
    var isbn = params[0].split('=')[1];

    
    // fetch book details
    var bookDetailsUrl = baseUrl + "books/" + isbn;
    getBookDetails(bookDetailsUrl)

    // fetch book reviews
    var bookReviewsUrl = baseUrl + "books/" + isbn + "/reviews";
    getReviews(bookReviewsUrl)

    // check if copies available for borrowing
    var checkAvailableUrl = baseUrl + "books/available/" + isbn;
    checkAvailability(checkAvailableUrl)
}