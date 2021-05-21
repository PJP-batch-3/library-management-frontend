var baseUrl = 'http://localhost:8080/api/';
var error_msg = "Could not load from server!"

function logout() {
    sessionStorage.removeItem('token');
}

$(function () {
    // sessionStorage.setItem('token', 'testing');
    var token = sessionStorage.getItem('token');
    if (token) {
        if (window.location.pathname.split('/').slice(-1)[0]=='login.html') {
            $(location).attr('href', 'index.html');
        }
        var name = sessionStorage.getItem('name').split(' ')[0];
        var nav_items = '<ul class="navbar-nav ml-auto">\
                            <li class="nav-item">\
                                <a href="index.html" class="nav-link">\
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
        var nav_items = '<ul class="navbar-nav ml-auto">\
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