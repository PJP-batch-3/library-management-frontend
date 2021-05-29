var link = 'http://localhost:8080/api/users/borrowedBooks';



var allbook = '#allbookdetail';
var allbook1 = '#prevdet';
var pricebook = '#priceOut';
var quanbook = '#quanOut';
var subbook = '#subOut';
var curpre = '#curpre';
var curpre1 = '#curpre1';
var allbookprev = '#allbookdetailprev';

function logout() {
    sessionStorage.removeItem('token');
}

$(function () {
    token = sessionStorage.getItem('token');
    if (token) {
        if (window.location.pathname.split('/').slice(-1)[0]=='login.html') {
            $(location).attr('href', 'index.html');
        }
        var name = sessionStorage.getItem('name').split(' ')[0];
        var nav_items = '<ul class="navbar-nav ml-auto">\
                            <li class="nav-item">\
                                <a href="index.html" class="nav-link" style="color:white">\
                                    Home\
                                </a>\
                            </li>\
                            <li class="nav-item">\
                                <div class="dropdown show">\
                                    <a class="btn btn-round btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                        <i class="material-icons">account_circle</i> '+ name +'\
                                    </a>\
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >\
                                        <a class="dropdown-item" href="profile.html">Profile</a>\
                                        <a class="dropdown-item" href="borrowed_book.html">Order History</a>\
                                        <a class="dropdown-item" href="book_request.html">Book Request</a>\
                                        <a class="dropdown-item" href="index.html" onClick="logout()">Logout</a>\
                                    </div >\
                                </div >\
                            </li >\
                        </ul>';
        $("#navigation-items").html(nav_items);
    } else {
        nav_items = '<ul class="navbar-nav ml-auto">\
                            <li class="nav-item">\
                                <a href="index.html" class="nav-link">\
                                    Home\
                                </a>\
                            </li>\
                            <li class="nav-item">\
                                <a href="signup.html" class="nav-link">\
                                    Signup\
                                </a>\
                            </li>\
                            <li class="nav-item">\
                                <a href="login.html" class="nav-link">\
                                    Login\
                                </a>\
                            </li>\
                        </ul>';
        $("#navigation-items").html(nav_items);
    }
});



var token = sessionStorage.getItem('token');
if (token) {
    $(function () {
        $.ajax({
            type:'GET',
            headers: {
                Authorization: 'JWT ' + token
            }, 
            contentType: "application/json",
            dataType: "json",
            
            url:link,
            success:function(books){
                if(books.previous.length <=0 && books.current.length <=0){
                    return ;
                }
                var books1 = books.current;
                var books_out = '';
                var temp = '';

                
                var books_out1 = '';
                var temp1 = '';
                
                temp = '<h2 style="width: 100%; text-align: center;">Currently Borrowed Books</h2>';
                temp1 = '<h2 style="width: 100%; text-align: center;">Previously Borrowed Books</h2>';

                books1.forEach(function (book) {
                    
                    
                    book_title = book.title; 
                    book_author = book.author;
                    book_image_url = book.bookCover;
                    book_isbn = book.isbn;  
                    book_rating = book.rating
                    book_gener = book.genre;
                    book_price = book.price;
                    book_qun = book.quantity;
                    book_pub_date = book.publishedDate;
                    
                    books_out += '<div class="basket-product" id="allbookdetail">\
                                    <div class="item" >\
                                        <div class="product-image">\
                                            <img src="'+ book_image_url +'" alt="Placholder Image 2" class="product-frame" style="width: 130px; height: 180px;">\
                                        </div>\
                                        <div class="product-details">\
                                            <h1>GENER - '+ book_gener +'</h1>\
                                            <h3>'+ book_title +'</h3>\
                                            <p><strong>AUTHOR: '+ book_author +'</strong></p>\
                                            <p>RATING: '+ parseFloat(book_rating).toFixed(1) +' / 5.0</p>\
                                        </div>\
                                    </div>\
                                    <div class="price"">'+book_price+'</div>\
                                    <div class="quantity" id="quanOut">'+book_qun+'</div>\
                                    <div class="subtotal" id="subOut">'+book_pub_date+'</div>\
                                    <div class="remove">\
                                        <button><a href="book.html'+`?isbn=${book_isbn}`+'" style="color:black">Add Review/Borrow Again</a></button>\
                                    </div>\
                                    </div>\
                                </div>';
                });
                books1 = books.previous;
                books1.forEach(function (book1) {
                    
                    
                    book_title = book1.title; 
                    book_author = book1.author;
                    book_image_url = book1.bookCover;
                    book_isbn = book1.isbn;  
                    book_rating = book1.rating
                    book_gener = book1.genre;
                    book_price = book1.price;
                    book_qun = book1.quantity;
                    book_pub_date = book1.publishedDate;
                    console.log(book_title);
                    books_out1 += '<div class="basket-product" id="prevdet">\
                                    <div class="item" >\
                                        <div class="product-image">\
                                            <img src="'+ book_image_url +'" alt="Placholder Image 2" class="product-frame" style="width: 130px; height: 180px;">\
                                        </div>\
                                        <div class="product-details">\
                                            <h1>GENER - '+ book_gener +'</h1>\
                                            <h3>'+ book_title +'</h3>\
                                            <p><strong>AUTHOR: '+ book_author +'</strong></p>\
                                            <p>RATING: '+ parseFloat(book_rating).toFixed(1) +' / 5.0</p>\
                                        </div>\
                                    </div>\
                                    <div class="price"">'+book_price+'</div>\
                                    <div class="quantity" id="quanOut">'+book_qun+'</div>\
                                    <div class="subtotal" id="subOut">'+book_pub_date+'</div>\
                                    <div class="remove">\
                                        <button><a href="book.html'+`?isbn=${book_isbn}`+'" style="color:black">Add Review/Borrow Again</a></button>\
                                    </div>\
                                    </div>\
                                </div>';
                });


                $(curpre).html(temp);
                $(allbook).html(books_out);

                $(curpre1).html(temp1);
                $(allbook1).html(books_out1);
            }})})}
