var signupUrl = baseUrl + 'users/register';

function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

// make an ajax call to the rest server to get the data
$('#signup-button').click(function () {
    var mail = $('#signup-email').val();
    var name = $('#signup-name').val();

    if (ValidateEmail(mail)){   // Check email validation
        $.ajax(signupUrl, {
            method: 'POST',
            data: JSON.stringify({
                fullname: name,
                email: mail,
                password: $('#signup-password').val()
            }),
            contentType: "application/json",
            dataType: "json",
        }).then(function (obj) {
            console.log(obj['success'])
            user = obj['success'];

            var nav_out = '<div class="nav nav-pills" id="all-genre">';
            user_name = user['fullname'];
            user_token = obj['token'];
            user_id = user['id'];

            var nav_items = '<ul class="navbar-nav ml-auto">\
                            <li class="nav-item">\
                                <a href="index.html" class="nav-link">\
                                    Home\
                                </a>\
                            </li>\
                            <li class="nav-item">\
                                <div class="dropdown show">\
                                    <a class="btn btn-round btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                        <i class="material-icons">account_circle</i> '+ (user_name).split(' ')[0] +'\
                                    </a>\
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >\
                                        <a class="dropdown-item" href="profile.html">Profile</a>\
                                        <a class="dropdown-item" href="borrowed_book.html">Borrowed Books</a>\
                                        <a class="dropdown-item" href="book_request.html">Book Request</a>\
                                        <a class="dropdown-item" href="index.html" onClick="logout()">Logout</a>\
                                    </div >\
                                </div >\
                            </li >\
                        </ul>';
            $("#navigation-items").html(nav_items);

            sessionStorage.setItem('token', user_token);
            sessionStorage.setItem('name', user_name);
            sessionStorage.setItem('user_id', user_id);

            location.assign("index.html");

        }).catch(function (err) {
            console.error(err);
            if (err['status']==401) {
                alert("This email address is already being used!")
            } else {
                alert("Invalid Credentials!");
            }
        });
    }
});
