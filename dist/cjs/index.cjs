var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  Errorf: () => Errorf,
  InvalidArgumentError: () => InvalidArgumentError,
  arrayToString: () => arrayToString,
  format: () => format,
  valueToString: () => valueToString
});
module.exports = __toCommonJS(index_exports);

// src/utils/is-class.js
function isClass(value) {
  if (!value) return false;
  return typeof value === "function" && /^class\s/.test(Function.prototype.toString.call(value));
}
__name(isClass, "isClass");

// src/value-to-string.js
var BASE_CTOR_NAMES = [
  "String",
  "Number",
  "Boolean",
  "Object",
  "Array",
  "Function",
  "Symbol",
  "Map",
  "Set",
  "Date"
];
function valueToString(input) {
  if (input == null) return String(input);
  if (typeof input === "string") return `"${input}"`;
  if (typeof input === "number" || typeof input === "boolean")
    return String(input);
  if (isClass(input)) return input.name ? input.name : "Class";
  if (input.constructor && input.constructor.name)
    return BASE_CTOR_NAMES.includes(input.constructor.name) ? input.constructor.name : `${input.constructor.name} (instance)`;
  if (typeof input === "object" && input.constructor == null) return "Object";
  return String(input);
}
__name(valueToString, "valueToString");

// src/array-to-string.js
var SEPARATOR = ", ";
function arrayToString(input) {
  if (Array.isArray(input) && input.length)
    return input.map(valueToString).join(SEPARATOR);
  return valueToString(input);
}
__name(arrayToString, "arrayToString");

// src/format.js
function format(pattern) {
  if (pattern instanceof Date) {
    pattern = pattern.toISOString();
  } else if (typeof pattern !== "string") {
    pattern = String(pattern);
  }
  const re = /(%?)(%([sdjvl]))/g;
  const args = Array.prototype.slice.call(arguments, 1);
  if (args.length) {
    pattern = pattern.replace(re, function(match, escaped, ptn, flag) {
      let arg = args.shift();
      switch (flag) {
        case "s":
          arg = String(arg);
          break;
        case "d":
          arg = Number(arg);
          break;
        case "j":
          arg = JSON.stringify(arg);
          break;
        case "v":
          arg = valueToString(arg);
          break;
        case "l":
          arg = arrayToString(arg);
          break;
      }
      if (!escaped) return arg;
      args.unshift(arg);
      return match;
    });
  }
  if (args.length) pattern += " " + args.join(" ");
  pattern = pattern.replace(/%{2}/g, "%");
  return "" + pattern;
}
__name(format, "format");

// src/errorf.js
var _Errorf = class _Errorf extends Error {
  /**
   * Constructor.
   *
   * @param {string|undefined} pattern
   * @param {any} args
   */
  constructor(pattern = void 0, ...args) {
    const message = pattern != null ? format(pattern, ...args) : void 0;
    super(message);
  }
};
__name(_Errorf, "Errorf");
var Errorf = _Errorf;

// src/invalid-argument-error.js
var _InvalidArgumentError = class _InvalidArgumentError extends Errorf {
};
__name(_InvalidArgumentError, "InvalidArgumentError");
var InvalidArgumentError = _InvalidArgumentError;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Errorf,
  InvalidArgumentError,
  arrayToString,
  format,
  valueToString
});
