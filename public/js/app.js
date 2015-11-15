(function() {
    angular
        .module('app', [
            'ui.router'
        ])
        .config(AuthConfig)
        .controller('AuthCtrl', AuthCtrl);

    function AuthConfig($stateProvider) {
        // Users state routing
        $stateProvider
            .state('facebook', {
                abstract: true,
                url: '/facebook/?number&success',
                templateUrl: 'views/facebook-auth.html',
                controller: 'AuthCtrl'
            });
    }
    
    function AuthCtrl($http, $state, $window) {
        var self = this;
        
        this.doFacebook = function() {
            this.callOauthProvider('/facebook/auth');
        };

        this.callOauthProvider = function(url) {
            if ($state.previous && $state.previous.href) {
                url += '?redirect_to=' + encodeURIComponent($state.previous.href);
            }

            // Effectively call OAuth authentication route:
            $window.location.href = url;
        };
    };
})();
