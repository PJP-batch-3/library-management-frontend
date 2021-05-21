function getBooks(url, dom_id) {
    // make an ajax call to the rest server to get the data
    $.ajax(url, {
        method: 'GET',
    }).then(function (books) {
        var books_out = '';
        books = books.ListOfBooks;

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
                                <span class="info"><h6>By: '+ book_author +'</h6><h5 class="books-rating">\
                                RATING: '+ parseFloat(book_rating).toFixed(1) +'/5.0</h5></span>\
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
                    loop: (books.length>2)?true:false
                },
                600: {
                    items: 3,
                    margin: 15,
                    stagePadding: 50,
                    nav: false,
                    loop: (books.length>3)?true:false
                },
                1092: {
                    items: 5,
                    loop: (books.length>5)?true:false
                }
            }
        });
    }).catch(function (err) {
        console.error(err);
        $(dom_id).html(error_msg);
    });
}