$(document).ready(function() {
    $('.deleteUser').on('click', deleteUser);
});
$(document).ready(function() {
    $('.editUser').on('click', editUser);
});

function deleteUser() {
    //alert('Borrar!');
    alert($(this).data('id'));
}

function deleteUser() {
    var confirmation = confirm('Are You Sure?');
    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/users/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/')
        });
    } else {
        return false;
    }

}

function editUser() {
    var boton = document.getElementById("boton");
    boton.value = "Editar";
    var nombre = $(this).data('nombre');
    var apellido = $(this).data('apellido');
    var email = $(this).data('email');

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = email;


    /*
    $.ajax({
        type: 'POST',
        url: '/users/edit/' + $(this).data('id')
    }).done(function(response) {
        window.location.replace('/')
    });
*/
}