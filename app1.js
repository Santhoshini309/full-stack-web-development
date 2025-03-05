let selectedProject = null;
let chatMessages = [];

function fetchProjects() {
    fetch('/api/projects')
        .then(res => res.json())
        .then(projects => {
            const projectList = document.getElementById('project-list');
            projectList.innerHTML = '';
            projects.forEach(project => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h3>${project.name}</h3>
                    <button onclick="selectProject('${project.id}')">Open</button>
                `;
                projectList.appendChild(div);
            });
        });
}

function selectProject(projectId) {
    selectedProject = projectId;
    loadChat();
}

function loadChat() {
    fetch(`/api/projects/${selectedProject}/chat`)
        .then(res => res.json())
        .then(messages => {
            chatMessages = messages;
            renderChat();
        });
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    fetch(`/api/projects/${selectedProject}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    }).then(() => {
        input.value = '';
        loadChat();
    });
}

function renderChat() {
    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML = chatMessages.map(msg => `<p>${msg}</p>`).join('');
}

fetchProjects();