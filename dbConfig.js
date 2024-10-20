// dbConfig.js
function getDbConfig() {
    return {
        // postgres
        user: process.env.postgres_user,
        // localhost
        host: process.env.postgres_host,
        // test_db
        database: process.env.postgres_test_database,
        // topsecret
        password: process.env.postgres_password,
        // 5432
        port: process.env.postgres_port
    };
}

module.exports = getDbConfig;

if (require.main === module) {
    const results = getDbConfig();
    const requiredKeys = ['user', 'host', 'database', 'password', 'port'];
    const n = Object.keys(results).length
    let isOk = n > 0; // NOTE! isOk is a Unit like 0 or 1 because of the &=
    requiredKeys.forEach((key) => {
        if (results.hasOwnProperty(key)) {
            const value = results[key];
            console.log( key, value  )
            if (value !== undefined && value !== null && value.length > 0) {
                isOk &= true;
            } else {
                console.log( key , value )
                isOk &= false;
            }            
        } else {
            isOk &= false;
        }
    });
    const isTrue = 1
    const passFail = isOk === isTrue ? "PASS " : "FAIL "  
    console.log(`${passFail} getting the proper env variables ` + isOk )
}
