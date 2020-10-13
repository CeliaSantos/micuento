import {
    getAll, create, update, deletion
} from '../datalayer/dao/taskDAO'

/** get tasks **/
export const getTasks = (req, res) => {
    setHeaders(res);
    let sort = null;
    let type = null;
    if (req.query.hasOwnProperty('sort')) sort = req.query.sort;
    if (req.query.hasOwnProperty('type')) type = req.query.type;
    getAll( sort, type, function ( data ) {
        if(data.length === 0) return res.status(200).send([]);
        else return res.status(200).send(JSON.stringify(data));
    });
};

/** Create new task **/
export const createTask = (req, res) => {
    setHeaders(res);
    if (isValidParams(req.body)){
        create( req.body, function ( data ) {
            if(data.length === 0) return res.status(200).send([]);
            else return res.status(200).send(JSON.stringify(data));
        });
    } else {
        return res.status(400).send("No valid body parameters.");
    }
};

/** Update task **/
export const updateTask = (req, res) => {
    setHeaders(res);
    if (isValidId(req.params.id)){
        update( req.params.id, req.body, function ( data ) {
            if(data.length === 0) return res.status(404).send("No task with id: " + req.params.id.toString());
            else return res.status(200).send(JSON.stringify(data));
        });
    } else {
        return res.status(400).send("No valid body.");
    }
}


/** Delete task by @id **/
export const deleteTask = (req, res) => {
    setHeaders(res);
    if (isValidId(req.params.id)){
        deletion( req.params.id, function ( data ) {
            if(data.length === 0) return res.status(404).send("No task with id: " + req.params.id.toString());
            else return res.status(200).send(JSON.stringify(data));
        });
    } else {
        return res.status(400).send("No valid id.");
    }
}

const setHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    return res
}

const isValidParams = (body) => {
    if ( !body.hasOwnProperty('name') || body.name.length <= 1 ) return false;
    if ( !body.hasOwnProperty('dueDate') || !body.dueDate instanceof Date) return false;
    if ( !body.hasOwnProperty('priority') || (body.priority < 1 || body.priority > 5) ) return false;
    return true;
};

const isValidId = (paramId) => {
    if (!isNaN(paramId)) return true;
    else return false;
};