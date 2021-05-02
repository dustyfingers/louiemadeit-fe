// env can be 'local' 'test' or 'prod'
let env, apiLink;
let { hostname } = window.location;

// check host and assign env
if (hostname === "localhost" || hostname === "127.0.0.1") env = "local";
else if (hostname === "dev.louiemadeit.com") env = "test";
else if (hostname === "www.louiemadeit.com") env = "prod";

// assign api link based on env
switch (env) {
    case "local":
        apiLink = "http://localhost:5000";
        break;
    case "test":
        apiLink = "https://louiemadeit-test.herokuapp.com";
        break;
    case "prod":
        apiLink = "https://louiemadeit.herokuapp.com";
        break;
    //  default to test env
    default:
        apiLink = "https://louiemadeit-test.herokuapp.com";
}

export {
    apiLink,
    env
};