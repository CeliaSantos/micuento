import express from 'express';
import {param} from "express-validator/check";

import {
    getTasks, updateTask, createTask, deleteTask
} from '../controller/taskController'

let router = express.Router();

/* GET tasks */
router.get('', getTasks);

/* PUT update task */
router.put('/:id',[param('id').exists()], updateTask);

/* POST new task */
router.post('/create', createTask);

/* DELETE task */
router.delete('/:id', [param('id').exists()], deleteTask);


export default router;
