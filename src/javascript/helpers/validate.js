const Ajv = require('ajv');

const ajv = new Ajv({allErrors: true});
const schema = {
  "required": [ "_id", "name", "health", "attack", "defense", "source"],
  "properties": {
    "_id": { "type": "string" },
    "name": { "type": "string" },
    "health": { "type": "number", "minimum": 0 },
    "attack": { "type": "number", "minimum": 0 },
    "defense": { "type": "number", "minimum": 0 },
    "source": { "type": "string" }
  }
};

module.exports = {
  ajv,
  schema
};