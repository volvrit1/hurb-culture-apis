import Joi from "joi";
import mongoose from "mongoose";

/**
 * Converts Mongoose schema type to Joi schema
 * @param {Object} schemaField - Mongoose schema field definition
 * @param {string} fieldName - Name of the field
 * @returns {Joi.Schema} - Joi schema
 */
function mongooseToJoi(schemaField, fieldName) {
  let joiSchema;

  // Check if it's a nested schema (subdocument)
  if (schemaField.schema && schemaField.schema.paths) {
    const nestedSchema = {};
    for (const [nestedFieldName, nestedField] of Object.entries(
      schemaField.schema.paths,
    )) {
      if (nestedFieldName === "_id" || nestedFieldName === "__v") continue; // Skip Mongoose internals
      nestedSchema[nestedFieldName] = mongooseToJoi(
        nestedField,
        `${fieldName}.${nestedFieldName}`,
      );
    }
    joiSchema = Joi.object(nestedSchema);
  } else {
    // Handle primitive types
    switch (schemaField.instance || schemaField.type?.name) {
      case "String":
        joiSchema = Joi.string();
        break;
      case "Number":
        joiSchema = Joi.number();
        break;
      case "Boolean":
        joiSchema = Joi.boolean();
        break;
      case "Date":
        joiSchema = Joi.date();
        break;
      case "Object":
      case "ObjectId":
        joiSchema = Joi.string(); // Only objects
        break;
      case "Array":
        if (schemaField.caster && schemaField.caster.schema) {
          const arrayItemSchema = mongooseToJoi(schemaField.caster, fieldName);
          joiSchema = Joi.array().items(arrayItemSchema);
        } else {
          const itemType =
            schemaField.caster?.instance || schemaField.options?.type[0]?.name;
          switch (itemType) {
            case "String":
              joiSchema = Joi.array().items(Joi.string());
              break;
            case "Number":
              joiSchema = Joi.array().items(Joi.number());
              break;
            default:
              joiSchema = Joi.array();
          }
        }
        break;
      default:
        joiSchema = Joi.any();
    }
  }

  // Custom error messages without quotes
  joiSchema = joiSchema.messages({
    "any.required": `${fieldName} is required`,
    "string.base": `${fieldName} must be a string`,
    "string.empty": `${fieldName} is not allowed to be empty`,
    "number.base": `${fieldName} must be a number`,
    "boolean.base": `${fieldName} must be a boolean`,
    "date.base": `${fieldName} must be a valid date`,
    "object.base": `${fieldName} must be an object`,
    "array.base": `${fieldName} must be an array`,
  });

  // Check if the field is required
  const isRequired =
    schemaField.required === true ||
    (schemaField.options && schemaField.options.required === true);
  return isRequired ? joiSchema.required() : joiSchema.allow(null).optional();
}

export default mongooseToJoi;
