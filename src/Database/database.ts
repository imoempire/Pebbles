import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("pebbles.db");

db.transaction((tx) => {
  tx.executeSql("DROP TABLE IF EXISTS routes;");
});

db.transaction((tx) => {
  tx.executeSql("DROP TABLE IF EXISTS users;");
});

// TABLES
// Create the "routes" table
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY AUTOINCREMENT, routeId TEXT UNIQUE, originLat REAL, originLong REAL, destLat REAL, destLong REAL);"
  );
});

// Create the "users" table
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE, dateJoined TEXT, loggedIn INTEGER);"
  );
});

export default db;
