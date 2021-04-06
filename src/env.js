// env can be 'local' 'test' or 'prod'
let env, apiLink;
let { hostname } = window.location;

// check host and assign env
if (hostname === "localhost" || hostname === "127.0.0.1") {
    console.log('environment is local!');
    env = "local";
} else {
    console.log('environment is NOT local!');
    console.log(hostname);
}

// assign api link based on env
switch (env) {
    case "test":
        apiLink = "https://louiemadeit-test.herokuapp.com";
        break;
    case "local":
        apiLink = "http://localhost:5000";
        break;
    case "prod":
        apiLink = "prod-backend-link.com";
        break;
    //  default to test env
    default:
        apiLink = "https://louiemadeit-test.herokuapp.com";
}

export {
    apiLink,
    env
};