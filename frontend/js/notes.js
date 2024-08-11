// For creating a note
document.getElementById('createNoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, content}),
    })
    .then(response => response.json())
    .then(data => {
        if (data._id) {
            alert('Note created successfully!');
            window.location.href = 'view-notes.html';
        } else {
            alert('Failed to create note.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// For retrieving and displaying notes
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/notes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const notesContainer = document.getElementById('notesContainer');
        notesContainer.innerHTML = ''; // Clear any existing content
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.innerHTML = `
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                `;
                notesContainer.appendChild(noteElement);
            });
        } else {
            notesContainer.innerHTML = '<p>No notes found.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
