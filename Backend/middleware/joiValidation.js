import Joi from "joi";

export const userValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.pattern.base": "Name must contain only alphabetic characters",
      "string.max": "Name must not be more than 50 characters",
    }),

  email: Joi.string()
    .pattern(/^[a-z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      "string.pattern.base":
        "Email must be a valid gmail address in lowercase (e.g., example@gmail.com)",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
    }),

  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters",
    "string.empty": "Username is required",
    "string.max": "Username must not be more than 30 characters",
  }),

  usertype: Joi.string()
    .valid("admin", "student", "faculty")
    .required()
    .messages({
      "any.only": "Usertype must be either 'admin' ,'student' or 'faculty' ",
      "string.empty": "Usertype is required",
    }),
  age: Joi.number().integer().min(1).max(100).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z]+$/)
    .optional()
    .messages({
      "string.min": "Name must be at least 3 characters",
      "string.pattern.base": "Name must contain only alphabetic characters",
      "string.max": "Name must not be more than 50 characters",
    }),

  email: Joi.string()
    .pattern(/^[a-z0-9._%+-]+@gmail\\.com$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Email must be a valid gmail address in lowercase (e.g., example@gmail.com)",
    }),

  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9@._-]+$/)
    .optional()
    .messages({
      "string.min": "Username must be at least 3 characters",
      "string.pattern.base":
        "Username can only contain letters, numbers, and special characters (@, ., _, -)",
      "string.max": "Username must not be more than 30 characters",
    }),

  usertype: Joi.string()
    .valid("admin", "student", "faculty")
    .optional()
    .messages({
      "any.only": "Usertype must be either 'admin','student' or 'faculty' ",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      "string.pattern.base":
        "Email must be a valid gmail address in lowercase (e.g., example@gmail.com)",
      "string.empty": "Email is required",
    }),

  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9@._-]+$/)
    .optional()
    .messages({
      "string.min": "Username must be at least 3 characters",
      "string.pattern.base":
        "Username can only contain letters, numbers, and special characters (@, ., _, -)",
      "string.max": "Username must not be more than 30 characters",
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
    }),
});

export const validateUser = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
