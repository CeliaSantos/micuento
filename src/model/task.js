
class Task {
    constructor(id, name, dueDate, priority, createdAt, updatedAt) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }

    isOverdue() {
        if (this.dueDate.getTime() < Date.now().getTime()) this.status = 'Overdue';
        else this.status = 'Pending';
    }
}

export const mapEntities = (listEntities) => {
    const listModels = [];
    for (const elem in listEntities) {
        listModels.push(mapTaskEntityToModel(listEntities[elem]));
    }
    return listModels;
};

export const mapTaskEntityToModel = (taskEntity) => {
    return new Task(
        taskEntity.id,
        taskEntity.name,
        taskEntity.due_date,
        taskEntity.priority,
        taskEntity.created_at,
        taskEntity.updated_at,
    );
};