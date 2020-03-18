import path from "path";
import { Sequelize, Model, DataTypes } from "sequelize";

const dbPath = path.join(__dirname, "../../db/users.sqlite");
const sequelize = new Sequelize({dialect: "sqlite", storage: dbPath});

export class User extends Model {
    public id!: number;
    public email!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER, // Could be unsigned, but SQLite warns that's ignored
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        validate: { isEmail: true },
    },
}, {sequelize, tableName: "users"});

if (process.env.NODE_ENV !== "test") {
    // This is hacky.
    // We don't want to do any background async tasks while running tests.
    // We should have a real solution to this when we properly extract DB logic.
    User.sync();
}