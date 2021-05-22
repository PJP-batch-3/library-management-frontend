var requestUrl = baseUrl + 'books/request';

// make an ajax call to the rest server to get the data
$('#book-request-button').click(function () {
    var title = $('#request-title').val();
    var author = $('#request-author').val();

    var token = sessionStorage.getItem('token');
    if (token == null) {
        window.location.replace("login.html");
    }
    else {
        $.ajax(requestUrl, {
            method: 'POST',
            data: JSON.stringify({
                title: title,
                author: author
            }),
            headers: {
                Authorization: 'JWT ' + token
            },
            contentType: "application/json",
            dataType: "json",
        }).then(function (obj) {
            console.log(obj['success'])

            var out = '<div class="card-header card-header-primary text-center">\
                            <h4 class="card-title">BOOK REQUEST</h4>\
                        </div>\
                        <div class="card-body">\
                            <h4 class="description text-center mt-4"><i class="material-icons">done</i> Request Sent</h4>\
                        </div>';
            $("#request-form-container").html(out);

        }).catch(function (err) {
            console.error(err);
            if (err["status"]==401) {
                logout();
            }
            alert("Error! Request not sent.");
        });
    }
});