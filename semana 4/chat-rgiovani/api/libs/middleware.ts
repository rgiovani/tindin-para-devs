import { isLogged } from "./middlewareLogin";

module.exports = [ //common for all requests
    isLogged
]