import path from "path";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

const dbPath = path.join(__dirname, "../../db/users.sqlite");
const sequelize = new Sequelize({dialect: "sqlite", storage: dbPath});

export class User extends Model {
    public id!: number;
    public email!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        validate: { isEmail: true },
    },
}, {sequelize, tableName: "users"});

User.sync();
