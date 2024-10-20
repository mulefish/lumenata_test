const { Client } = require('pg');
const getDbConfig = require('./dbConfig');

const dbConfig = getDbConfig();
const client = new Client(dbConfig);

async function createTables() {
    try {
        await client.connect();
        console.log('Connected to the database');

        const createDevelopersTable = `
            CREATE TABLE IF NOT EXISTS developers (
                id INT PRIMARY KEY,
                first_name VARCHAR(20),
                last_name VARCHAR(20),
                hourly_rate INT,
                type_of_contract VARCHAR(20),
                started_work DATE,
                stopped_work DATE
            );
        `;

        const createProjectTable = `
            CREATE TABLE IF NOT EXISTS project (
                id INT PRIMARY KEY,
                name VARCHAR(20),
                budget INT,
                start_date DATE,
                end_date DATE
            );
        `;

        const createDevelopersProjectTable = `
            CREATE TABLE IF NOT EXISTS developers_project (
                developer_id INT,
                project_id INT,
                is_leader BIT,
                date_join DATE,
                FOREIGN KEY (developer_id) REFERENCES developers(id),
                FOREIGN KEY (project_id) REFERENCES project(id)
            );
        `;

        await client.query(createDevelopersTable);
        console.log('Table "developers" created');

        await client.query(createProjectTable);
        console.log('Table "project" created');

        await client.query(createDevelopersProjectTable);
        console.log('Table "developers_project" created');

    } catch (err) {
        console.error('Error creating tables:', err.stack);
    } finally {
        await client.end();
        console.log('Disconnected from the database');
    }
}

createTables();
