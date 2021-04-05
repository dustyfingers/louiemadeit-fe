// env can be 'local' 'test' or 'prod'
const env = "test";
let baseLink;

switch (env) {
    case "test":
        baseLink = "https://louiemadeit-test.herokuapp.com/";
    case "local":
        baseLink = "http://localhost:5000/";
    default:
        baseLink = "http://localhost:5000/";
}

export default baseLink;