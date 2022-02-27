import { Request, Response } from 'express';
import { database } from '../server';

export class DictionaryController {

    public getWords(response: Response) {
        database.pool.getConnection()
            .then(conn => {
                conn.query("SELECT * FROM `Word` LIMIT 10")
                    .then((rows) => {
                        response.send(rows);
                        conn.end();
                    })
                    .catch(error => {
                        console.log(error);
                        conn.end();
                    })

            }).catch(error => {
                console.error(error);
            });
    }

    public nbWords(request: Request, response: Response) {
        database.pool.getConnection()
            .then(conn => {
                let word = request.params.word;
                conn.query("SELECT count(distinct Id) - 1 AS nbWords " +
                    "FROM dictionary.Word W " +
                    "WHERE length('" + word + "') = W.NbLetters " +
                    "AND substring('" + word + "', 1, 1) = W.FirstLetter")
                    .then((rows) => {
                        response.send(rows[0]);
                        conn.end();
                    })
                    .catch(error => {
                        console.log(error);
                        conn.end();
                    })

            }).catch(error => {
                console.error(error);
            });
    }

    public getSimilarWords(request: Request, response: Response) {
        database.pool.getConnection()
            .then(conn => {
                let word = request.params.word;
                conn.query("SELECT Label " +
                    "FROM dictionary.Word W " +
                    "WHERE length('" + word + "') = W.NbLetters " +
                    "AND substring('" + word + "', 1, 1) = W.FirstLetter")
                    .then((rows) => {
                        response.send(rows);
                        conn.end();
                    })
                    .catch(error => {
                        console.log(error);
                        conn.end();
                    })

            }).catch(error => {
                console.error(error);
            });
    }

    public checkWord(request: Request, response: Response) {
        database.pool.getConnection()
            .then(conn => {
                let word = request.params.word;
                conn.query("select count(*) from Word where Label='" + word + "'")
                    .then((rows) => {
                        response.send(rows[0]);
                        conn.end();
                    })
                    .catch(error => {
                        console.log(error);
                        conn.end();
                    })

            }).catch(error => {
                console.error(error);
            });
    }

}
