angular.module('cruzroja').factory('country', function ($q, $rootScope) {

    var countryData = null;

    var country = {
        getAll: function () {
            var deferred = $q.defer();
            if (!countryData) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": $rootScope.pathName+"/Paises/listarPaises",
                    "method": "GET"
                };

                $.ajax(settings).done(function (response) {
                    countryData = response.data;
                    deferred.resolve(response.data);
                }).fail(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(countryData);
            }
            return deferred.promise;
        }
    };

    return country;
});
