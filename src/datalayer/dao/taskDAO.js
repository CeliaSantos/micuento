import {connection} from '../../app';
import {
    mapEntities, mapTaskEntityToModel
} from '../../model/task';
import {
    TaskEntity, TaskEntityCreate
} from '../entity/taskEntity';


export const getAll = (sort, type, callback) => {
    let query = `SELECT * FROM task.task`;
    if (type != null){
        if ( type == 'pending' ) query = query + ` WHERE due_date >= CURDATE()`;
        if ( type == 'overdue' ) query = query + ` WHERE due_date <= CURDATE()`;
    }
    if (sort != null) {
        if (sort == 'name') sort = 'name';
        if (sort == 'dueDate') sort = 'due_date';
        if (sort == 'createdAt') sort = 'created_at';
        if (sort == 'updatedAt') sort = 'updated_at';
        query = query + ` ORDER BY ${sort}`;
    }
    connection.query(query, (err, rows) => {
        if(err) throw err;
        else {
            callback(mapEntities(rows));
        }

    });
};

const getById = (id, callback) => {
    connection.query(`SELECT * FROM task.task WHERE id = '${id}'`, (err, row) => {
        if(err) throw err;
        else {
            if (row.length == 0) callback(null);
            else callback(row[0]);
        }
    });
}

export const create = (task, callback) => {
    const taskEntity = new TaskEntityCreate(task.name, task.dueDate, task.priority);
    connection.query(`INSERT INTO task.task SET ?`, taskEntity, (err, row) => {
        if(err) throw err;
        else {
            taskEntity.id = row.insertId;
            callback(mapTaskEntityToModel(taskEntity));
        }
    });
};

export const update = (taskId, task, callback) => {
    getById(taskId, function (foundRow) {
        if (foundRow == null ) {
            callback([]);
            return;
        }
        foundRow.name = task.name;
        foundRow.due_date = task.dueDate;
        foundRow.priority = task.priority;
        foundRow.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        connection.query(`UPDATE task.task SET ? WHERE id = '${taskId}'`, foundRow, (err, row) => {
            if(err) throw err;
            else {
                callback(mapTaskEntityToModel(foundRow));
            }
        });
    });
};

export const deletion = (taskId, callback) => {
    getById(taskId, function (foundRow) {
        if (foundRow == null ) {
            callback([]);
            return;
        }
        connection.query(`DELETE FROM task.task WHERE id = '${taskId}'`, foundRow, (err, row) => {
            if(err) throw err;
            else {
                callback(mapTaskEntityToModel(foundRow));
            }
        });
    });
};