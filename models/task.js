const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    task_name: { type: String, required: true},
    task_description: { type: String, required: true},
    assignee:{ type: String, required: true},
    start_date:{ type: Date, required: true},
    due_date:{ type: Date, required: true},
    status:{ type: String, required: true}
});

module.exports = mongoose.model('Task', taskSchema);