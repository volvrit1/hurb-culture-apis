// swagger-mongoose.js
import fs from "fs";
import env from "#configs/env";
import path from "path";
import mongoose from "mongoose";
import { pathToFileURL } from "url";
import os from "os";

const getLocalIP = () => {
  const nets = os.networkInterfaces();
  let localIP;

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        localIP = net.address;
        break;
      }
    }
    if (localIP) break;
  }

  return localIP;
};

const toKebabCase = (str) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const getType = (type) => {
  if (!type) return "string";
  switch (type) {
    case String:
    case "String":
      return "string";
    case Number:
    case "Number":
      return "number";
    case Boolean:
    case "Boolean":
      return "boolean";
    case Date:
    case "Date":
      return "string";
    case Array:
    case "Array":
      return "array";
    case Object:
    case "Object":
      return "object";
    default:
      return "string";
  }
};

const parseMongooseSchema = (schema) => {
  const properties = {};
  const required = [];
  const fileFields = [];
  const filterableFields = [];

  for (const [key, value] of Object.entries(schema.paths)) {
    if (key === "_id" || key === "__v") continue;

    const field = value.options || {};
    const fieldType = getType(field.type || value.instance);

    if (field.file) {
      properties[key] = {
        type: "string",
        format: "binary",
      };
      fileFields.push(key);
    } else if (fieldType === "array") {
      properties[key] = {
        type: "array",
        items: { type: "string" },
      };
    } else {
      properties[key] = { type: fieldType };
    }

    if (field.enum) properties[key].enum = field.enum;
    if (field.match) properties[key].pattern = field.match.toString();
    if (field.minlength) properties[key].minLength = field.minlength;
    if (field.maxlength) properties[key].maxLength = field.maxlength;

    if (field.required) required.push(key);

    if (field.filterable !== false) {
      const paramSchema =
        fieldType === "array"
          ? {
              type: "array",
              items: { type: "string" },
              style: "form",
              explode: true,
            }
          : { type: fieldType };

      filterableFields.push({
        name: key,
        in: "query",
        required: false,
        schema: paramSchema,
      });
    }
  }

  return { type: "object", properties, required, fileFields, filterableFields };
};

const filterRequestSchema = (schema, excludeFields = []) => {
  const filtered = {
    type: "object",
    properties: {},
    required: [],
  };

  for (const [key, value] of Object.entries(schema.properties)) {
    if (!excludeFields.includes(key)) {
      filtered.properties[key] = value;
    }
  }

  schema.required?.forEach((field) => {
    if (!excludeFields.includes(field)) {
      filtered.required.push(field);
    }
  });

  return filtered;
};

const modelsDir = path.join(process.cwd(), "src/models");

const loadModels = async () => {
  const models = {};
  const files = await fs.promises.readdir(modelsDir);
  for (const file of files) {
    const fullPath = path.join(modelsDir, file);
    const modelModule = await import(pathToFileURL(fullPath).href);
    const model = modelModule.default || modelModule;
    if (model?.modelName && model?.schema) {
      models[model.modelName] = model;
    }
  }
  return models;
};

const generateSwagger = async () => {
  const models = await loadModels();
  const components = { schemas: {} };
  const paths = {};
  const tags = [];

  const excludeFields = ["createdAt", "updatedAt", "deletedAt"];

  for (const [name, model] of Object.entries(models)) {
    const fullSchema = parseMongooseSchema(model.schema);
    const requestSchema = filterRequestSchema(fullSchema, excludeFields);
    const hasFile = fullSchema.fileFields.length > 0;
    const requestContentType = hasFile
      ? "multipart/form-data"
      : "application/json";

    components.schemas[name] = fullSchema;

    const kebabName = toKebabCase(name);
    const pathBase = `/api/${kebabName}`;

    paths[pathBase] = {
      get: {
        summary: `List all ${name}`,
        tags: [kebabName],
        parameters: fullSchema.filterableFields,
        responses: {
          200: {
            description: `List of ${name}`,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: `#/components/schemas/${name}` },
                },
              },
            },
          },
        },
      },
      post: {
        summary: `Create ${name}`,
        tags: [kebabName],
        requestBody: {
          required: true,
          content: {
            [requestContentType]: {
              schema: requestSchema,
            },
          },
        },
        responses: {
          201: { description: `${name} created successfully` },
        },
      },
    };

    paths[`${pathBase}/{id}`] = {
      get: {
        summary: `Get ${name} by ID`,
        tags: [kebabName],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: `${name} data`,
            content: {
              "application/json": {
                schema: { $ref: `#/components/schemas/${name}` },
              },
            },
          },
        },
      },
      put: {
        summary: `Update ${name}`,
        tags: [kebabName],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            [requestContentType]: {
              schema: requestSchema,
            },
          },
        },
        responses: {
          200: { description: `${name} updated successfully` },
        },
      },
      delete: {
        summary: `Delete ${name}`,
        tags: [kebabName],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: `${name} deleted successfully` },
        },
      },
    };

    tags.push({ name: kebabName, description: `${name} operations` });
  }

  return {
    openapi: "3.0.0",
    info: {
      title: "Hurb-Culture",
      version: "1.0.0",
      description: "Generated from Mongoose models",
    },
    servers: [{ url: `http://${getLocalIP()}:${env.PORT}` }],
    components,
    paths,
    tags,
  };
};

export default await generateSwagger();
