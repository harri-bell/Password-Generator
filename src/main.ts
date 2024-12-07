import { askForPasswordOptions } from "./askForPasswordOptions.js";
import { question } from "readline-sync";
import chalk from "chalk";
import readline from "readline";

function clearLines(lines: number) {
  for (let i = 0; i < lines; i++) {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
  }
}

function main() {
  let passwordRequirements = askForPasswordOptions();
  let reoccur = true;

  while (reoccur) {
    passwordRequirements.generateNewPassword();
    clearLines(5);
    console.log(
      chalk.green(`Generated Password: ${passwordRequirements.getPassword()}`)
    );

    console.log("\nOptions:");
    console.log("1. Press Enter to generate another password");
    console.log("2. Type 'reset' to change password options");
    console.log("3. Type 'exit' to end the program");

    const userResponse = question("Your choice: ").toLowerCase();

    if (userResponse === "reset") {
      passwordRequirements = askForPasswordOptions();
    } else if (userResponse === "exit") {
      reoccur = false;
    }
  }

  console.log("Goodbye!");
}

main();
