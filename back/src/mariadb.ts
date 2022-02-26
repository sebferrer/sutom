export class Database {
    private mariadb = require('mariadb');
    public pool = this.mariadb.createPool({
        host: 'localhost',
        user: 'seb',
        password: '',
        connectionLimit: 5
    });

    public init() {
        this.pool.getConnection()
            .then(conn => {

                conn.query("USE `dictionary`")
                    .then(() => {
                        console.log('use dictionary');
                    })
                    .catch(error => {
                        console.error(error);
                        conn.end();
                    })

            }).catch(error => {
                console.error(error);
            });
    }

}

