
export class TaskEntity {
    constructor(id, name, dueDate, priority, createdAt, updatedAt) {
        this.name = name;
        this.due_date = dueDate;
        this.priority = priority;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.id = id;
    }
}

export class TaskEntityCreate {
    constructor(name, dueDate, priority) {
        this.name = name;
        this.due_date = new Date(dueDate).toISOString().slice(0, 19).replace('T', ' ');
        this.priority = priority;
        this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.id = null;
    }
}
