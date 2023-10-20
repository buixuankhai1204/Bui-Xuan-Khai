# backend-test
 - POSTMAN list API :https://warped-spaceship-312404.postman.co/workspace/My-Workspace~bd0c9db2-de5c-4f9b-855c-d78491da1dea/collection/12911345-ac23971c-de04-4399-bc7c-968ec24acd0f?action=share&creator=12911345&active-environment=12911345-278e5cd6-6c16-4b9b-8989-889b567bd9aa
 - data files export in ./database .
 - database config in config.env file.
 - Run server: node server.js
 - I use both projects in one application, especially divided into 2 routers.
 - Problem 4 in ./problem 4 .
 

 * **problem 5: A Crude Server**
   * can run the todo list page in ./frontend/todolist.html
   * As for the interface, I don't pay much attention to it, instead, I work on the backend as carefully as possible.
   * All requests have been completed.
 * **problem 6: Architecture**
   * Let's say I have an online dancing game, after each play, the player's score is updated.
     Rankings are updated live for other players to know. Below is the high level design for this dancing game.
   * Assuming that we have a complete login logout system, users are separate with id. when accessing the scoreboard. means the user is valid.
   * **PROCESS**:
     * Start designing high level design. Focus and imagine on real business logic. Then design the necessary APIs to display scoreboards, increase scores, and prevent users from arbitrarily increasing scores.
     * Find ways to continuously update the scoreboard to achieve the highest efficiency, avoiding continuous queries.
     * Start implementing low level design and finish the project.
 
   * **DIFFICULTY**
     * Having difficulty updating data continuously.
     * Prevent players from arbitrarily changing scores without transparency.
   * 
   * **SOLUTION**
     * in client, must check the new score is in the high score range.
     * Use pubisher/subcriber system so that every time a user in the top 10 has a change in score, the publisher can notify all subscribers (players).Use pb sub system so that every time a user in the top 10 has a change in score, the publisher can notify all subscribers (players). Use the web socket library to send scoreboard information to the player.
     
     * Every time the game starts, create a token for the user and after the game is finished, if you want to update the score, you must authenticate the token. Helps avoid bad players spamming unclear scores.
   
    * **HIGH LEVEL DESIGN**
      * https://excalidraw.com/#room=30c1da24bbf3e78550e5,CNl_OciUH6CW1zH2cgs5FA