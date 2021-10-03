const { v4: uuidv4 } = require('uuid');

const notes = [];

function noteRoutes(app) {
    app.get('/notes', (req, res) => {
        res.json(notes);
    });

    app.get('/notes/title', (req, res) => {
        const challengeNotes = []
        notes.find(note => {
            const { id, title } = note;
            challengeNotes.push({
                id, title
            })
        })
        res.json(challengeNotes)
    });

    app.get('/notes/:id', (req, res) => {
        const note = notes.find((n) => n.id === req.params.id);

        if (!note) {
            return res.status(400).json({ message: `Nenhuma anotação encontrada com o id ${req.params.id}` });
        }
        res.json(note)
    });

    app.post('/notes', (req, res) => {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Informe o campo title!' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Informe o campo description!' });
        }

        notes.push({
            id: uuidv4(),
            title,
            description
        });

        res.json({ message: 'Anotação salva com sucesso!!!' });
    });

    app.put('/notes', (req, res) => {
        const { id, title, description } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' });
        }

        const note = notes.find((n) => n.id === id);

        if (!note) {
            return res.status(400).json({ message: `Nenhuma anotação encontrada com o id ${id}` });
        }

        if (!title) {
            return res.status(400).json({ message: 'Informe o campo title!' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Informe o campo description!' });
        }

        notes.find(note => {
            if (note.id === id) {
                note.title = title;
                note.description = description;
            }
        });

        res.json({ message: 'Anotação alterada com sucesso' });
    });

    app.delete('/notes', (req, res) => {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' });
        }

        const note = notes.find((n) => n.id === id);

        if (!note) {
            return res.status(400).json({ message: `Nenhuma anotação encontrada com o id ${id}` });
        }

        notes.find((note, index) => {
            if (note.id === id) {
                notes.splice(index, 1);
            }
        });

        res.json({ message: 'Anotação excluida com sucesso' });
    })
}

module.exports.noteRoutes = noteRoutes;