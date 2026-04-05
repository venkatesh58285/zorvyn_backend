// Input validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateAmount = (amount) => {
  return amount && !isNaN(amount) && amount > 0;
};

const validateRecordInput = (req, res, next) => {
  const { amount, type, category } = req.body;

  const errors = [];

  if (!amount) errors.push("Amount is required");
  else if (!validateAmount(amount))
    errors.push("Amount must be a positive number");

  if (!type) errors.push("Type is required");
  else if (!["income", "expense"].includes(type))
    errors.push('Type must be "income" or "expense"');

  if (!category) errors.push("Category is required");
  else if (category.trim().length === 0)
    errors.push("Category cannot be empty");

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors });
  }

  next();
};

const validateAuthInput = (req, res, next) => {
  const { email, password, name } = req.body;
  const errors = [];

  if (!email) errors.push("Email is required");
  else if (!validateEmail(email)) errors.push("Invalid email format");

  if (!password) errors.push("Password is required");
  else if (!validatePassword(password))
    errors.push("Password must be at least 6 characters");

  if (req.path === "/register") {
    if (!name) errors.push("Name is required");
    else if (name.trim().length === 0) errors.push("Name cannot be empty");
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateAmount,
  validateRecordInput,
  validateAuthInput,
};
