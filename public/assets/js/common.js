$("#logout").on("click", function () {
    var isConfirm = confirm('您真的要退出么？');
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            // data: "data",
            // dataType: "dataType",
            success: function (response) {
                location.href = "login.html"
            },
            error: function () {
                alert("退出失败")
            }
        });

    }
});
