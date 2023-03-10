const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
    },
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiRouter = express.Router();
app.use('/api', apiRouter);

const contactsAPIRouter = express.Router();
apiRouter.use('/contacts', contactsAPIRouter);

contactsAPIRouter.get('/', async (req, res) => {
    try {
        let sort = req.query.sort;

        let query = knex.select().from('contacts');

        if (sort) {
            // Sanitize the sort query parameter
            sort = sort.replace(/[^a-zA-Z0-9_ ]/g, '');

            query = knex.select().from('contacts').orderByRaw(sort);
        }

        const contacts = await query;

        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
