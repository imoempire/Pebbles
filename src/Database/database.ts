import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("pebbles.db");

db.transaction((tx) => {
  tx.executeSql("DROP TABLE IF EXISTS routes;");
});

// TABLES
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY AUTOINCREMENT, routeId TEXT UNIQUE, originLat REAL, originLong REAL, destLat REAL, destLong REAL);"
  );
});

export default db;
