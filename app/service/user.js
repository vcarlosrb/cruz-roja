angular.module('cruzroja').factory('user', function ($q) {
    var user = {
        login: function (data) {
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://cruzroja.hotpoint.la/cms/index.php/api/Usuario/loginUsuario",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": formData
            };

            $.ajax(settings).done(function (response) {
                deferred.resolve(response);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        signup: function (data) {
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("nombre", data.name);
            formData.append("apellidos", data.lastName);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("dni", data.dni);
            formData.append("pais", data.pais);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://cruzroja.hotpoint.la/cms/index.php/api/Usuario/registroUsuario",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": formData
            };

            $.ajax(settings).done(function (response) {
                deferred.resolve(response);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        recoverPassword: function (data) {

        },
        chagePassword: function (data) {

        },
        logout: function () {

        }
    };

    return user;
});
