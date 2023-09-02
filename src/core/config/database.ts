import { Sequelize } from "sequelize";


export class Database {
    public connection: Sequelize;

    constructor() {
        this.init();
    }

    init(): void {
        this.connection = new Sequelize('mysql://root:root@localhost:3306/wecodetrial');
    }

    async testConnection() {
        try {
            await this.connection.authenticate();
            console.log('Connection successful');
        } catch (error) {
            console.log('Connection failed', error);
        }
    }
}

export const database: Database = new Database();