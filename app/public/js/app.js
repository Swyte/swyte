(function() {
    angular
        .module('app', [
            'ui.router'
        ])
        .controller('AuthCtrl', AuthCtrl)
        .config(AuthConfig);

    AuthConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider']; 
    
    function AuthConfig($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('!');

        // Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

        // Users state routing
        $stateProvider
            .state('facebook', {
                url: '/facebook/:number?success',
                template: '<div class="container center-text"><div class="center-text index-header" ng-init="auth.doFacebook()">{{auth.message}}</div></div>',
                controller: 'AuthCtrl',
                controllerAs: 'auth'
            });
    }

    AuthCtrl.$inject = ['$http', '$state', '$window']; 
    
    function AuthCtrl($http, $state, $window) {
        
        var self = this;
        
        this.doFacebook = function() {
            console.log('Auth Facebook');
            console.log($state.params);
            if ($state.params.success) {
                console.log('Adding phone number');
                self.message = "Success";
                $http.put('/phone', { phone: $state.params.number }).then(function(res) {
                    console.log('winner');
                });
            } else {
                this.callOauthProvider('/auth/facebook');
            }
        };

        this.callOauthProvider = function(url) {
            if ($state && $state.href($state.current.name, $state.params, {absolute: true})) {
                $state.href($state.current.name, $state.params, {absolute: true});
                url += '?redirect_to=' + encodeURIComponent($state.href($state.current.name, $state.params, {absolute: true}).replace('\/\#\!\/', '\/oauth\/\#\!\/'));
            }

            // Effectively call OAuth authentication route:
            $window.location.href = url;
        };
    }
})();
