export const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body); // ✅ FIXED
  if (!result.success) {
    const error = result.error.flatten();
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.fieldErrors,
    });
  }
  next();
};
