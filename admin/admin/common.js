if (!$.Cookie('password') || !$.Cookie('email')) {
    window.location.href = '/admin/login.html';
} else {
    $.ajax({
        type: "POST",
        url: "/api/adminLogin",
        data: JSON.stringify({
            email: $.Cookie('email'),
            password: getPass()
        }),
        dataType: 'json',
        success: function(response) {
            if (response.code !== 200) {
                window.location.href = '/admin/login.html';
            }
        },
    });
}
var E = window.wangEditor
var editor1 = new E('#editArticle');
window.operateEvents = {
    'click .removeUser': function(e, value, row, index) {
        layer.confirm('你确定要删除: ' + row.name + '吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "POST",
                url: "/api/deleteUser",
                data: {
                    id: row.id
                },
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        }, function() {
            layer.msg('你取消了删除');
        })
    },
    'click .setAdmin': function(e, value, row, index) {
        layer.confirm('你确定要设置: ' + row.name + '为管理员吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "GET",
                url: "/api/setAdmin?id=" + row.id,
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        })
    },
    'click .removeTruth': function(e, value, row, index) {
        layer.confirm('你确定要删除id: ' + row.id + '的每日一句吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "POST",
                url: "/api/deleteTruth",
                data: {
                    id: row.id
                },
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        }, function() {
            layer.msg('你取消了删除');
        })

    },
    'click .goTop': function(e, value, row, index) {
        $.ajax({
            type: "GET",
            url: "/api/updateTop?id=" + row.id + "&is_top=1",
            dataType: 'json',
            success: function(response) {
                layer.msg(response);
                $table.bootstrapTable('refresh');
            }
        });
    },
    'click .removeArticle': function(e, value, row, index) {
        layer.confirm('你确定要删除id: ' + row.id + '的文章吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "POST",
                url: "/api/deleteArticle",
                data: {
                    id: row.id
                },
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        }, function() {
            layer.msg('你取消了删除');
        })
    },
    'click .editArticle': function(e, value, row, index) {
        editor1.customConfig.colors = colorArr();
        editor1.customConfig.emotions = [{
            title: '表情1',
            type: 'image',
            content: allEmojis1
        }, {
            title: '表情2',
            type: 'image',
            content: allEmojis2
        }]
        editor1.customConfig.uploadImgShowBase64 = true;
        editor1.create();
        $('.submitEdit').show(100);
        $.ajax({
            type: "GET",
            url: "/api/queryArticleContentById?id=" + row.id,
            dataType: "json",
            success: function(response) {
                editor1.txt.html(response.content);
                $('#editArticle').data('id', row.id);
            }
        });
    },
    'click .removeEmoji': function(e, value, row, index) {
        layer.confirm('你确定要删除id: ' + row.id + '的表情吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "POST",
                url: "/api/deleteEmoji",
                data: {
                    id: row.id
                },
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        }, function() {
            layer.msg('你取消了删除');
        })
    },

    'click .removeEssay': function(e, value, row, index) {
        layer.confirm('你确定要删除id: ' + row.id + '的随笔吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "POST",
                url: "/api/deleteEssay",
                data: {
                    id: row.id
                },
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        }, function() {
            layer.msg('你取消了删除');
        })
    },

    'click .removeComment': function(e, value, row, index) {
        layer.confirm('你确定要删除: ' + row.id + '的评论吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "POST",
                url: "/api/deleteComment",
                data: {
                    id: row.id
                },
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        }, function() {
            layer.msg('你取消了删除');
        })
    },

    'click .removeMes': function(e, value, row, index) {
        layer.confirm('你确定要删除: ' + row.id + '的留言吗?', { btn: ['确定', '算了'] }, function() {
            $.ajax({
                type: "POST",
                url: "/api/deleteComment",
                data: {
                    id: row.id
                },
                dataType: 'json',
                success: function(response) {
                    layer.msg(response);
                    $table.bootstrapTable('refresh');
                }
            });
        }, function() {
            layer.msg('你取消了删除');
        })
    },
}

function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return `${year}/${month}/${day} ${hour}:${minute}:0${second}`;
}

function getColor() {
    var arr = [];
    var zimu = ['a', 'b', 'c', 'd', 'e', 'f', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var str = '';
    for (var i = 0; i < 6; i++) {
        const randomZ = zimu[parseInt(Math.random() * zimu.length)];
        str += randomZ;
    }
    return '#' + str;
}

function colorArr() {
    var arr = [];
    for (var j = 0; j < 50; j++) {
        arr.push(getColor());
    }
    return arr;
}

function getPass() {
    try {
        return window.atob($.Cookie('password'));
    } catch (error) {
        return $.Cookie('password');
    }
}

// window.apiUrl = 'http://127.0.0.1:11306/api/'