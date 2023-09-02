import Sequelize,{ Model } from "sequelize";
import { Database } from "../core/config/database";

export class Customer extends Model {
  name!: string;
  email!: string;
  contact!: string;
  company!: string;
}

Customer.init({
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  contact: Sequelize.STRING,
  company: Sequelize.STRING
}, {
  sequelize: new Database().connection,
  modelName: 'Customer',
});
