$("#userForm").on("submit", function () {
    // console.log(123);
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        // dataType: "dataType",
        success: function (response) {
            location.reload();
        },
        error: function (err) {
            var res = JSON.parse(err.responseText);
            alert(res.message);
        }
    });
    return false;
});
$("#modifyBox").on("change", "#avatar", function () {
    // console.log(this.file[0])
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // dataType: "dataType",
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            $("#preview").attr("src", response[0].avatar);
            $("#hiddenAvatar").val(response[0].avatar);
        }
    });
});
$.ajax({
    type: "get",
    url: "/users",
    // data: "data",
    // dataType: "dataType",
    success: function (response) {
        // console.log(response);
        var html = template('userTpl', { data: response });
        // console.log(html);
        $("#userBox").html(html);
    }
});
$("#userBox").on("click", '.edit', function () {
    var id = $(this).attr("data-id");
    $.ajax({
        type: "get",
        url: "/users/" + id,
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $("#modifyBox").html(html);
        }
    });
});
$("#modifyBox").on("submit", "#modifyForm", function () {
    var formData = $(this).serialize();
    console.log(formData);
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        // dataType: "dataType",
        success: function (response) {
            console.log(response);
            location.reload();
        }
    });
    return false;
});