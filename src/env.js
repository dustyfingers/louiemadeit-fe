// env can be 'local' 'test' or 'prod'
let env, apiLink, stripePk;
let { hostname } = window.location;

// check host and assign env
if (hostname === "localhost" || hostname === "127.0.0.1") env = "local";
else if (hostname === "dev.louiemadeit.com") env = "test";
else if (hostname === "www.louiemadeit.com") env = "prod";

// assign api link based on env
switch (env) {
    case "local":
        apiLink = "http://localhost:5000";
        stripePk = "pk_test_51Iay6NLYNexBDWiNibCpA8UpN74X44ZhbJaEVHD76t2ERmHgNn3XotNlNCDkac5tG63yriJM4IkHKDkoEpL1LsGB00rtH51v6B";
        break;
    case "test":
        apiLink = "https://louiemadeit-test.herokuapp.com";
        stripePk = "pk_test_51Iay6NLYNexBDWiNibCpA8UpN74X44ZhbJaEVHD76t2ERmHgNn3XotNlNCDkac5tG63yriJM4IkHKDkoEpL1LsGB00rtH51v6B";
        break;
    case "prod":
        apiLink = "https://louiemadeit.herokuapp.com";
        stripePk = "pk_live_51Iay6NLYNexBDWiNEB5fvxUoCioW5N2gkflsWJYc1QlzGHX2kcPi3eavIWKJHkaIMfbHIx1Z3XVxY7YnXlJf5sd800AhDe41bU";
        break;
    //  default to test env
    default:
        apiLink = "https://louiemadeit-test.herokuapp.com";
        stripePk = "pk_test_51Iay6NLYNexBDWiNibCpA8UpN74X44ZhbJaEVHD76t2ERmHgNn3XotNlNCDkac5tG63yriJM4IkHKDkoEpL1LsGB00rtH51v6B";
}

export {
    apiLink,
    env,
    stripePk
};