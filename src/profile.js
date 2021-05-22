function getUserDetails(token, url) {
    // make an ajax call to the rest server to get the data
    $.ajax(url, {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token
        },
    }).then(function (user) {
        user = user.success;
        console.log(user);
        $('#user-name').html(user.fullname);
        $('#user-email').html(user.email);

        var currCount = user.currentBorrowedBooks;
        if (currCount < 5) {
            $('#currCount').html('= ' + user.currentBorrowedBooks + '/(5)');
        }
        else {
            $('#currCount').html('= ' + user.currentBorrowedBooks + " (Max limit reached(5)!!)");
        }

        var fine = user.fine;
        if (fine === 0) {
            $('#pay-fine-button').html('No pending dues');
            $('#pay-fine-button').prop('disabled', true);
        } else {
            $('#pay-fine-button').html('Pay Fine');
            $('#pay-fine-button').prop('disabled', false);
            $('#fine-amount').html(fine);
        }

    }).catch(function (err) {
        console.error(err);
        if (err["status"]==401) {
            logout();
        }
    });
}

function getBorrowedUtil(books, dom_id) {
    if (books.length) {
        var books_out = '';
        books.forEach(function (book) {
            book_title = book.title; // Replace with proper variable name
            book_author = book.author;
            book_image_url = book.bookCover;
            book_isbn = book.isbn;
            book_rating = book.rating

            books_out += '<div class="carouselss-item">\
                            <a href="book.html?isbn='+ book_isbn + '">\
                                <div class="carouselss-item-image">\
                                    <img src="'+ book_image_url + '" class="item-image">\
                                </div>\
                                <div class="carouselss-item-text overlay-books align-middle">\
                                <span class="title">'+ book_title + '</span>\
                                <span class="info"><h6>By: '+ book_author + '</h6><h5 class="books-rating">\
                                RATING: '+ parseFloat(book_rating).toFixed(1) + '/5.0</h5></span>\
                                </div>\
                            </a>\
                        </div>';
        });

        $(dom_id).html(books_out);
        var owl = $(dom_id);
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
                    loop: (books.length > 2) ? true : false
                },
                600: {
                    items: 3,
                    margin: 15,
                    stagePadding: 50,
                    nav: false,
                    loop: (books.length > 3) ? true : false
                },
                1092: {
                    items: 5,
                    loop: (books.length > 5) ? true : false
                }
            }
        });
    } else {
        $(dom_id).html("<p>No books borrowed!</p>");
    }
}

function getBorrowedBooks(token, url) {
    // make an ajax call to the rest server to get the data
    $.ajax(url, {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token
        },
    }).then(function (books) {
        // console.log(books);

        var currentDomId = '#currently-borrowed-books';
        var previousDomId = '#previously-borrowed-books';

        getBorrowedUtil(books.current, currentDomId);
        getBorrowedUtil(books.previous, previousDomId);
    }).catch(function (err) {
        console.error(err);
        if (err["status"]==401) {
            logout();
        }
        $(dom_id).html(error_msg);
    });
}

function payfine(token, url) {
    // make an ajax call to the rest server to get the data
    $.ajax(url, {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token
        },
    }).then(function (user) {
        console.log(user);
        // alert("Payment was successful!");
        if (!alert('Payment was successful!')) { window.location.reload(); }
    }).catch(function (err) {
        console.error(err);
        alert("Payment failed!");
    });
}

function getReviewUtil(reviews, dom_id) {
    if (reviews.length) {
        var reviews_out = '';
        reviews.forEach(function (review) {
            book_title = review.bookTitle; // Replace with proper variable name
            book_rating = review.rating;
            book_review = review.review;
            book_review_id = review.review;
            edit_url = "#";

            reviews_out += '<div class="card text-left">\
                                <div class="card-body">\
                                    <h5 class="card-title">'+ book_title + '</h5>\
                                    <h6 class="card-subtitle mb-2 text-muted">'+ book_rating + '/5</h6>\
                                    <p class="card-text">'+ book_review + '</p>\
                                    <a href="'+ edit_url + '" class="card-link">Edit</a>\
                                </div>\
                            </div>';
        });

        $(dom_id).html(reviews_out);
        console.log(reviews_out)
    } else {
        $(dom_id).html("<p>You have not reviewed any book(s) yet!</p>");
    }
}

function getReviews(token, url) {
    // make an ajax call to the rest server to get the data
    $.ajax(url, {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token
        },
    }).then(function (user) {
        console.log(user.reviews);
        var domId = '#reviews-container';
        getReviewUtil(user.reviews, domId);
    }).catch(function (err) {
        console.error(err);
        if (err["status"]==401) {
            logout();
        }
    });
}

$(document).ready(function () {
    // console.log( "ready!" );
    var token = sessionStorage.getItem('token');
    // console.log(token);
    if (token == null) {
        window.location.replace("login.html");
    }
    else {
        // fetch user details
        var userDetailsUrl = baseUrl + 'users';
        getUserDetails(token, userDetailsUrl);

        // fetch borrowed books details
        var borrowedBooksUrl = baseUrl + 'users/borrowedBooks';
        getBorrowedBooks(token, borrowedBooksUrl);

        // fetch user reviews
        var reviewUrl = baseUrl + 'users/reviews';
        getReviews(token, reviewUrl);

        $("#confirm-payment-button").click(function () {
            var paymentUrl = baseUrl + 'users/payFine';
            payfine(token, paymentUrl)
        });

    }
});
