// populateTables.js
const { Client } = require('pg');
const getDbConfig = require('./dbConfig');

const dbConfig = getDbConfig();
const client = new Client(dbConfig);

async function populateTables() {
    try {
        await client.connect();
        console.log('Connected to the database');

        const insertDeveloper = `
            INSERT INTO developers (id, first_name, last_name, hourly_rate, type_of_contract, started_work, stopped_work)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO NOTHING;
        `;

        const insertProject = `
            INSERT INTO project (id, name, budget, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO NOTHING;
        `;

        const insertDevelopersProject = `
            INSERT INTO developers_project (developer_id, project_id, is_leader, date_join)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (developer_id, project_id) DO NOTHING;
        `;

        const developers = [
            [1, 'Alice', 'Johnson', 55, 'Full-time', '2018-01-01', '2025-12-31'],
            [2, 'Bob', 'Smith', 60, 'Contract', '2017-02-01', '2025-12-31'],
            [3, 'Charlie', 'Lee', 45, 'Part-time', '2019-03-01', '2025-12-31'],
            [4, 'David', 'Brown', 70, 'Full-time', '2020-04-01', '2025-12-31'],
            [5, 'Eva', 'Davis', 50, 'Contract', '2019-05-01', '2025-12-31']
        ];

        const projects = [
            [1, 'Project Alpha', 10000, '2019-01-01', '2025-12-31'],
            [2, 'Project Beta', 20000, '2020-01-01', '2025-12-31'],
            [3, 'Project Gamma', 30000, '2018-01-01', '2025-12-31']
        ];

        const developersProjects = [
            [1, 1, 1, '2019-01-01'],
            [2, 1, 0, '2019-02-01'],
            [3, 2, 1, '2020-03-01'],
            [4, 2, 0, '2020-04-01'],
            [5, 3, 1, '2021-05-01']
        ];

        for (const dev of developers) {
            await client.query(insertDeveloper, dev);
        }

        for (const proj of projects) {
            await client.query(insertProject, proj);
        }

        for (const devProj of developersProjects) {
            await client.query(insertDevelopersProject, devProj);
        }

        console.log('Tables populated with specified data');
    } catch (err) {
        console.error('Error populating tables:', err.stack);
    } finally {
        await client.end();
        console.log('Disconnected from the database');
    }
}

populateTables();
