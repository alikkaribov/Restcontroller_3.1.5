function update() {
    $.getJSON('http://localhost:8080/api/admin/users', function (json) {

        document.querySelector('#tablebody').innerHTML = '';
        var tr = [];
        for (var i = 0; i < json.length; i++) {
            console.log(json[i].username + json[i].roles)
            var roles = '';
            for (var j = 0; j < json[i].roles.length; j++) {
                roles += json[i].roles[j].name + ' ';
            }
            tr.push('<tr>');
            tr.push('<td>' + json[i].id + '</td>');
            tr.push('<td data-inp=\'username\'>' + json[i].username + '</td>');
            tr.push('<td data-inp=\'lastname\'>' + json[i].lastname + '</td>');
            tr.push('<td data-inp=\'email\'>' + json[i].email + '</td>');
            tr.push('<td data-inp=\'roles\'>' + roles + '</td>');
            tr.push('<td><button type=\'button\' class=\'btn btn-primary\' data-toggle=\'modal\' data-id=\'' + json[i].id + '\' data-target=\'#edit\'' + ' id=' + json[i].id + '>Edit</button></td>');
            tr.push('<td><button type=\'button\' class=\'btn btn-danger\' data-toggle=\'modal\' data-did=\'' + json[i].id + '\' data-target=\'#delete\'' + ' id=' + json[i].id + '>Delete</button></td>');
            tr.push('</tr>');
        }
        $('#tablebody').append($(tr.join('')));
    });
}

function getNavUser() {
    $.getJSON('http://localhost:8080/api/autority', function (json){
        var roles = '';
        for (var i = 0; i < json.roles.length; i++){
            roles += json.roles[i].name.substring(5) + ' ';
            console.log(roles)
        }
        document.querySelector('#navtext').innerHTML = json.email + ' WITH ROLES ' + roles;
    })
}

$(document).ready(update(),getNavUser());

//--------------------------------ADDUSER-------------------------
$(function () {
    $('#newuserbutton').click(function (e) {
        e.preventDefault();
        var id = 0;
        var roles = [];
        for(var i = 0; i < $('#addroles').val().length; i++){
            if ($('#addroles').val()[i] === "ROLE_USER") {
                id = 2;
            } else {
                id = 1;
            }
            roles[i] = {id: id, name: $('#addroles').val()[i]} ;
        }
        var user = {
            username: $('#addusername').val(),
            password: $('#addpassword').val(),
            lastname: $('#addlastname').val(),
            email: $('#addemail').val(),
            roles: roles
        }
        $.ajax({
            url: 'http://localhost:8080/api/admin/users',
            type: 'POST',
            accept: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (res) {
                update();
            },
            error: function (e) {

            }
        })
    })
})
//--------------------DELETE USER--------------------------
$(function () {
    $('#delete').on('show.bs.modal', function (event) {
        document.querySelector('#deleteselect').innerHTML = '';
        var button = $(event.relatedTarget);
        var id = $(button).data('did');
        $('form#form_delete input[name=id]').val(id);
        var tr = $(button).parent().parent().children();

        $(tr).each(function (i, e) {
            var name = $(e).data('inp');
            var value = $(e).text();
            var inp = $('form#form_delete input[name=' + name + ']');
            var opt = $('#deleteselect[name=' + name + ']');
            inp.val(value);
            if (value.toString().includes("ROLE")) {
                var mass = value.toString().split(' ');
                for (var i = 0; i < mass.length; i++) {
                    if (mass[i].trim().length > 0) {
                        opt.prepend('<option>' + mass[i] + '</option>');
                    }
                }

            }
        })
        $('#deleter').click(function (e) {
            e.preventDefault();

            var user = {
                id: $('#deleteid').val(),
                username: $('#deleteusername').val(),
                lastname: $('#deletelastname').val(),
                email: $('#deleteemail').val(),
                roles: [{
                    id: id,
                    name: $('#deleteselect').val()[0],
                }]

            }
            $.ajax({
                url: 'http://localhost:8080/api/admin/users',
                type: 'DELETE',
                accept: 'application/json',
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function (res) {
                    update();
                    $('#closedelete').click();
                },
                error: function (e) {


                }
            })
        })
    });
})
//-----------------------------------EDIT USER----------------------------------
$(function () {
    $('#edit').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var id = $(button).data('id');
        $('form#form_edit input[name=id]').val(id);
        var tr = $(button).parent().parent().children();

        $(tr).each(function (i, e) {
            var name = $(e).data('inp');
            var value = $(e).text();
            var inp = $('form#form_edit input[name=' + name + ']');
            var opt = $('#editroles[name=' + name + ']');
            inp.val(value);
        })
        $('#editor').click(function (e) {
            e.preventDefault();
            var id = 0;
            var roles = [];
            for(var i = 0; i < $('#editroles').val().length; i++) {
                if ($('#editroles').val()[i] === "ROLE_USER") {
                    id = 2;
                } else {
                    id = 1;
                }
                roles[i] = {id: id, name: $('#editroles').val()[i]};
            }
            console.log(roles);
            var user = {
                id: $('#editid').val(),
                username: $('#editu').val(),
                password: $('#editp').val(),
                lastname: $('#editl').val(),
                email: $('#editemail').val(),
                roles: roles
            }
            $.ajax({
                url: 'http://localhost:8080/api/admin/users',
                type: 'PUT',
                accept: 'application/json',
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function (res) {
                    update();
                    $('#close').click();
                },
                error: function (e) {


                }
            })
        })
    });
})