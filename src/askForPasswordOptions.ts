import { question } from "readline-sync";

class CharacterSet {
  private numbers = "0123456789";
  private letters = "abcdefghijklmnopqrstuvwxyz";
  private symbols = "!@#$&*?";

  private getRandomChar(set: string): string {
    return set[Math.floor(Math.random() * set.length)];
  }

  randomNumbers(amount: number): string {
    return Array.from({ length: amount }, () =>
      this.getRandomChar(this.numbers)
    ).join("");
  }

  randomSymbols(amount: number): string {
    return Array.from({ length: amount }, () =>
      this.getRandomChar(this.symbols)
    ).join("");
  }

  randomLowerCaseLetters(amount: number): string {
    return Array.from({ length: amount }, () =>
      this.getRandomChar(this.letters)
    ).join("");
  }

  randomUpperCaseLetters(amount: number): string {
    return Array.from({ length: amount }, () =>
      this.getRandomChar(this.letters.toUpperCase())
    ).join("");
  }
}

class PasswordRequirements {
  private currentPassword: string = "";

  constructor(
    private pwLength: number,
    private ucl: number,
    private lcl: number,
    private sym: number,
    private num: number
  ) {}

  getPassword(): string {
    return this.currentPassword;
  }

  generateNewPassword(): void {
    const characterSet = new CharacterSet();
    let password = "";

    password += characterSet.randomUpperCaseLetters(this.ucl);
    password += characterSet.randomLowerCaseLetters(this.lcl);
    password += characterSet.randomSymbols(this.sym);
    password += characterSet.randomNumbers(this.num);

    const remaining = this.pwLength - password.length;
    if (remaining > 0) {
      password += characterSet.randomLowerCaseLetters(remaining);
    }

    this.currentPassword = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
}

export function askForPasswordOptions(): PasswordRequirements {
  const pwLength = Number(question("Password length? "));
  const ucl = Number(question("Number of uppercase letters required? "));
  const lcl = Number(question("Number of lowercase letters required? "));
  const sym = Number(question("Number of symbols required? "));
  const num = Number(question("Number of numbers required? "));

  return new PasswordRequirements(pwLength, ucl, lcl, sym, num);
}
