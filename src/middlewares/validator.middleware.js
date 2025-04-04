import Joi from "joi";
import httpStatus from "http-status";
import mongooseToJoi from "#utils/joiValidator";

export default function validateModel(model, isUpdate = false) {
  return (req, res, next) => {
    try {
      // Get the schema paths from the Mongoose model
      const schemaPaths = model.schema.paths;
      let schema = {};

      for (const [fieldName, schemaField] of Object.entries(schemaPaths)) {
        // Skip Mongoose auto-generated fields like _id, __v
        if (fieldName === "_id" || fieldName === "__v") {
          continue;
        }
        schema[fieldName] = mongooseToJoi(schemaField, fieldName);
      }

      // For updates, make all fields optional
      if (isUpdate) {
        for (const key in schema) {
          schema[key] = schema[key].optional().allow(null);
        }
      }

      // Create Joi object schema
      const joiSchema = Joi.object(schema);

      // Validate request body
      const { error, value } = joiSchema.validate(req.body, {
        abortEarly: false, // Show all errors
        stripUnknown: true, // Remove unknown fields
      });

      if (error) {
        const details = error.details.map((detail) => detail.message);
        throw {
          status: false,
          message: details.join(),
          httpStatus: httpStatus.BAD_REQUEST,
        };
      }

      // Attach validated data to request
      req.validatedData = value;
      next();
    } catch (err) {
      next(err);
    }
  };
}
