import TaskService from './task.service';

const service = () => {

    return Object.freeze({
        task: TaskService,
    });
}

const exposeService = async(req, res, next) => {
req.service = service();
next();
}

export default exposeService;