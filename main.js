var TB = window.TB = sampleApp = angular.module("myApp",['ngCookies','pascalprecht.translate'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'partials/home.html',
                controller:'home'
            })
            .when('/login', {
                templateUrl:'partials/login.html',
                controller: 'login'
            })
            .when('/tour',{
                templateUrl:'partials/tour.html',
                controller:'tour'
            })
            .when('/pricing',{
                templateUrl:'partials/pricing.html',
                controller:'pricing'
            })
            .when('/signup',{
                templateUrl:'partials/signup.html',
                controller:'signup'
            })
            .when('/contact',{
                templateUrl:'partials/contact.html',
                controller:'contact'
            })
            .when('/dashboard/profile',{
                templateUrl:'partials/profile.html',
                controller:'profile'
            })
            .when('/dashboard/trips',{
                templateUrl:'partials/trips.html',
                controller:'trips'
            })
            .when('/dashboard/shipments',{
                templateUrl:'partials/shipments.html',
                controller:'shipments'
            })
            .when('/dashboard/settings',{
                templateUrl:'partials/settings.html',
                controller:'settings'
            })
            .when('/dashboard/transits',{
                templateUrl:'partials/transits.html',
                controller:'transits'
            })
            .when('/dashboard',{
                templateUrl:'partials/profile.html',
                controller:'profile'
            })
/*
            .when('/error',{
                templateUrl:'views/error.html'
            })*/
            .otherwise({
                redirectTo:"/"
            })

    }]);//Config

sampleApp.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        email: 'Email',
        password: 'Password.',
        login: 'LOG IN',
        signup: 'SIGN UP',
        register:'Register',
        needaccount:'Need an account?',
        or:'OR',
        alreadyhaveaccount:'Already have an account',
        signupwith:'Sign up with',
        loginwith:"Login with",
        prayNowTitle: "Pray Now",
        prayersFor: "Prayer's for",
        when: "when",
        searchCats: "Search Categories...",
        myAccount: "My Account",
        inbox: "Inbox",
        prayerFeed: "Prayer Feed",
        myPrayers: "My Prayers",
        friends: "Friends",
        prayerCircles: "Prayer Circles",
        myJournal: "My Journal",
        myActivities: "My Activities",
        settings: "Settings",
        addAPrayer: "add a prayer",
        newRequest: "New Prayer Request",
        profile: "Profile",
        facebookSignUp: "Sign up with Facebook"
    });
    $translateProvider.translations('de', {
        email: 'Email InGerman',
        password: 'Password.InGerman',
        login: 'LOG IN InGerman',
        signup: 'SIGN UP InGerman',
        register:'Register InGerman',
        needaccount:'Need an account? InGerman',
        or:'OR InGerman',
        alreadyhaveaccount:'Already have an account InGerman',
        signupwith:'Sign up with InGerman',
        loginwith:"Login with InGerman",
        prayNowTitle: "Pray Now InGerman",
        prayersFor: "Prayer's for InGerman",
        when: "when InGerman",
        searchCats: "Search Categories... InGerman",
        myAccount: "My Account InGerman",
        inbox: "Inbox InGerman",
        prayerFeed: "Prayer Feed InGerman",
        myPrayers: "My Prayers InGerman",
        friends: "Friends InGerman",
        prayerCircles: "Prayer Circles InGerman",
        myJournal: "My Journal InGerman",
        myActivities: "My Activities InGerman",
        settings: "Settings InGerman",
        addAPrayer: "add a prayer InGerman",
        newRequest: "New Prayer Request InGerman",
        profile: "Profile InGerman",
        facebookSignUp: "Sign up with Facebook InGerman"

    });
    $translateProvider.preferredLanguage('en');
});




