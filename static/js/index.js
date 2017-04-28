$(function () {
    $('.login-btn').click(function () {
        alert(1);
        $.ajax({
            type : 'get',
            url : 'http://localhost:8099/api/user/login',
            data : {},
            success : function(response) {
                var html = '';
                $.each(response.data,function (index,json) {
                    html+='<p>用户名：'+json.username+',年龄:'+json.userage+',email:'+json.useremail+'</p>'
                })
                $('#debug').html(html);
            }
        });
    })
    $('.submit').click(function(e) {
        e.preventDefault();
        var params = {
            name : $('#form-name').val(),
            age : $('#form-age').val(),
            email : $('#form-email').val(),
            sex : $('#form-sex').val(),
        };
        $.ajax({
            type : 'get',
            url : 'http://localhost:8099/api/user/add',
            data : params,
            success : function(data) {
                self.cb&&self.cb(data);
                fetchUserList();
            }
        });
    });
    fetchUserList();
    function fetchUserList() {
        $.ajax({
            type : 'get',
            url : 'http://localhost:8099/api/user/getList',
            data : {},
            xhrFields : {withCredentials: true},
            success : function(response) {
                var html = '';
                $.each(response.data,function (index,json) {
                    html+='<p>用户名：'+json.username+',年龄:'+json.userage+',email:'+json.useremail+'</p>'
                })
                $('#debug').html(html);
            }
        });
    }

})
