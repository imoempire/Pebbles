import db from "../Database/database";

export default function useAuthenticator() {
  const loginUser = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "UPDATE users SET loggedIn = 1 WHERE email = ? AND password = ?;",
            [email, password],
            (tx, result) => {
              if (result.rowsAffected > 0) {
                console.log("User logged in successfully");
                resolve(result);
              } else {
                console.log("Invalid email or password");
                resolve({ message: "Invalid email or password" });
              }
            },
            // @ts-ignore
            (tx, error) => {
              console.error("Error logging in user:", error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error("Transaction error:", error);
          reject(error);
        }
      );
    });
  };

  const createUser = (username: string, password: string, email: string) => {
    return new Promise((resolve, reject) => {
      const dateJoined = new Date().toISOString();
  
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO users (username, password, email, dateJoined, loggedIn) VALUES (?, ?, ?, ?, 0);",
            [username, password, email, dateJoined],
            (tx, result) => {
              console.log(result);
              resolve(result);
            },
            // @ts-ignore
            (tx, error) => {
              console.error("Error creating user:", error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error("Transaction error:", error);
          reject(error);
        }
      );
    });
  };

  const logoutUser = (username: string) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "UPDATE users SET loggedIn = 0 WHERE username = ?;",
            [username],
            (tx, result) => {
              // Handle success
              resolve(result);
            },
            // @ts-ignore
            (tx, error) => {
              // Handle error
              reject(error);
            }
          );
        },
        (error) => {
          // Handle transaction error
          reject(error);
        }
      );
    });
  };

  return {
    loginUser,
    createUser,
    logoutUser,
  };
}
