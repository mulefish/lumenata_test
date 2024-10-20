# lumenata_test
lumenata_test

# setting up URL
https://eval.devskiller.com/GF2Y-69GQ-6E2A

# NOTES
problem 1: 
Problem Statement
You are working for a Software house as a Database Management Specialist.

The Head of the development team assigned you a task to create a list of top-earning developers with their projects and project roles. To be included in the list, the developer should earn more or equal to the average hourly rate for all developers who worked in the company in 2019.

The list should include the project name, developer's first and last name, hourly rate, and role in that project which should be either "Project leader" or "Developer". The list should include developers employed in the company and projects that are still active. Order the list by  alphabetically, then by project's role where "Project leader" should always be on top of the list.

WITH AvgRate AS (
    SELECT AVG(hourly_rate) AS avg_rate
    FROM developers
    WHERE EXTRACT(YEAR FROM started_work) = 2019
),
ActiveProjects AS (
    SELECT p.id AS project_id, p.name AS project_name
    FROM project p
    WHERE p.end_date IS NULL OR p.end_date >= CURRENT_DATE
),
TopEarningDevs AS (
    SELECT d.id, d.first_name, d.last_name, d.hourly_rate, dp.project_id, dp.is_leader
    FROM developers d
    JOIN developers_project dp ON d.id = dp.developer_id
    JOIN ActiveProjects ap ON dp.project_id = ap.project_id
    WHERE d.hourly_rate >= (SELECT avg_rate FROM AvgRate)
    AND (d.stopped_work IS NULL OR d.stopped_work >= CURRENT_DATE)
),
RoleMapping AS (
    SELECT id, first_name, last_name, hourly_rate, project_id,
    CASE 
        WHEN is_leader = 1 THEN 'Project leader'
        ELSE 'Developer'
    END AS role
    FROM TopEarningDevs
)
SELECT p.name AS project_name, rm.first_name, rm.last_name, rm.hourly_rate, rm.role
FROM RoleMapping rm
JOIN project p ON rm.project_id = p.id
ORDER BY p.name, rm.last_name, rm.first_name, rm.role DESC;
# --------------------- 
PROBLEM 2: 
