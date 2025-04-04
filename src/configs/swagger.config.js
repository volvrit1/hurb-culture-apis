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
      // Skip internal (i.e., 127.0.0.1) and non-IPv4
      if (net.family === "IPv4" && !net.internal) {
        localIP = net.address;
        break;
      }
    }
    if (localIP) break;
  }

  return localIP;
};

const modelsDir = path.resolve("src/models");

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

  for (const [key, value] of Object.entries(schema.paths)) {
    if (key === "_id" || key === "__v") continue;

    const field = value.options || {};
    const fieldType = getType(field.type || value.instance);
    properties[key] = { type: fieldType };

    if (field.enum) properties[key].enum = field.enum;
    if (field.match) properties[key].pattern = field.match.toString();
    if (field.minlength) properties[key].minLength = field.minlength;
    if (field.maxlength) properties[key].maxLength = field.maxlength;

    if (field.required) required.push(key);
  }

  return { type: "object", properties, required };
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

    components.schemas[name] = fullSchema;

    const pathBase = `/api/${name.toLowerCase()}`;
    paths[pathBase] = {
      get: {
        summary: `List all ${name}`,
        tags: [name],
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
        tags: [name],
        requestBody: {
          required: true,
          content: {
            "application/json": {
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
        tags: [name],
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
        tags: [name],
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
            "application/json": {
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
        tags: [name],
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

    tags.push({ name, description: `${name} operations` });
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
