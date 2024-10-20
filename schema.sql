
CREATE table developers { 
    id INT PRIMARY KEY, 
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    hourly_rate INT,
    type_of_contract VARCHAR(20),
    started_work DATE,
    stopped_work DATE, 
}

CREATE table project { 
    id INT PRIMARY KEY,
    name VARCHAR(20),
    budget INT, 
    start_date DATE,
    end_date DATE
}

CREATE table developers_project {
    developer_id INT, 
    project_id INT,  
    is_leader BIT,
    date_join {
        FORGEIGN KEY ( developer_id )  REFERENCES developers(id),
        FORGEIGN KEY ( project_id )  REFERENCES project(id));

    }
}