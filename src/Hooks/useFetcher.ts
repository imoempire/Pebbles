import db from "../Database/database";

export default function useFetcher() {
  const getUserLoggedInStatus = (username: string) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          // Check if the user exists
          tx.executeSql(
            "SELECT loggedIn FROM users WHERE username = ?;",
            [username],
            (tx, result) => {
              if (result.rows.length > 0) {
                const loggedInStatus = result.rows.item(0).loggedIn;
                console.log("User loggedIn status:", loggedInStatus === 1);
                resolve({ user: loggedInStatus });
              } else {
                // User not found
                console.log("User not found");
                resolve({ user: null });
              }
            },
            // @ts-ignore
            (tx, error) => {
              // Handle error
              console.error("Error getting user loggedIn status:", error);
              reject(error);
            }
          );
        },
        (error) => {
          // Handle transaction error
          console.error("Transaction error:", error);
          reject(error);
        }
      );
    });
  };

  const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM users;",
            [],
            (tx, result) => {
              console.log(result.rows, "gsgs");

              const users = [];
              if (result.rows.length > 0) {
                for (let i = 0; i < result.rows.length; i++) {
                  const user = result.rows.item(i);
                  users.push(user);
                }
              }
              console.log("Users retrieved successfsully:", users);
              resolve(users);
            },
            // @ts-ignore
            (tx, error) => {
              console.error(
                "Error executing SQL query to get all users:",
                error
              );
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

  return {
    getUserLoggedInStatus,
    getAllUsers,
  };
}
