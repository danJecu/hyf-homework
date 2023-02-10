const express = require('express');
const data = require('./documents.json');
const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is a search engine');
});

app.get('/search', (req, res) => {
    const queryValue = req.query.q;
    if (queryValue) {
        const documentMatchingQuerry = data.filter(item => {
            if (new RegExp(queryValue, 'i').test(Object.values(item))) {
                return item;
            }
        });

        res.status(200).json(documentMatchingQuerry);
    } else {
        res.json(data);
    }
});

app.get('/documents/:id', (req, res) => {
    const id = req.params.id;

    const documentWithId = data.filter(item => item.id === parseInt(id));

    if (!documentWithId.length) {
        res.status(404).json('error: Not Found');
    } else {
        res.send(documentWithId);
    }
});

app.post('/search', (req, res) => {
    const q = req.query.q;
    const fields = req.body.fields;

    if (fields && q) {
        res.status(400).json(
            'Enter either a query parameter or a fields parameter!'
        );
    } else if (fields) {
        Object.keys(fields).forEach(key => {
            res.json(data.filter(item => item[key] === fields[key]));
        });
    } else if (q) {
        const matchingQuerry = data.filter(item => {
            if (new RegExp(q, 'i').test(Object.values(item))) {
                return item;
            }
        });
        res.json(matchingQuerry);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});