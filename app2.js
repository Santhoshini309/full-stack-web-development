const express = require('express');
const app = express();
app.use(express.json());

let projects = [
    { id: '1', name: 'Project Alpha' },
    { id: '2', name: 'Project Beta' }
];

let projectChats = {
    '1': [],
    '2': []
};

app.get('/api/projects', (req, res) => res.json(projects));

app.get('/api/projects/:id/chat', (req, res) => {
    const { id } = req.params;
    res.json(projectChats[id] || []);
});

app.post('/api/projects/:id/chat', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    if (projectChats[id]) {
        projectChats[id].push(message);
    }
    res.json({ status: 'Message added' });
});

app.listen(3000, () => console.log('Project Management Tool backend running on port 3000'));