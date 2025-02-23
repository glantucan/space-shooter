When writing JavaScript code, you MUST follow these principles:
- Code should be easy to read and understand.
- End every statement with a semicolon.
- Use single quotes for strings.
- Use `const` for variables that do not change and `let` for variables that do.
- Keep the code as simple as possible. Avoid unnecessary complexity.
- Use meaningful names for variables, functions, etc. Names should reveal intent.
- Functions should be small and do one thing well. They should not exceed a few lines.
- Function names should describe the action being performed.
- Prefer fewer arguments in functions. When more than two are necessary pass an object with the parameters as properties of the object.
- Only use comments when necessary, as they can become outdated. Instead, strive to make the code self-explanatory.
- When comments are used, they should add useful information that is not readily
  apparent from the code itself.
- Properly handle errors and exceptions to ensure the software's robustness.
- Use exceptions rather than error codes for handling errors.
- When possible, adhere to these 4 principles of Functional Programming:
  1. Pure Functions
  2. Immutability (if the language supports it, if not avoid mutation as much as possible)
  3. Function Composition
  4. Declarative Code
- Do not use object oriented programming unless it enhances performance. Avoid classes at all cost in all other cases.
- Do not ever use typescript.
