import EventService from './event.service';
import AuthenticationService from './authentication.service';

const service = () => {

    return Object.freeze({
        auth:AuthenticationService,
        event: EventService,
    });
}

const exposeService = async(req, res, next) => {
req.service = service();
next();
}

export default exposeService;