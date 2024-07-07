const plugin = require("tailwindcss/plugin");

module.exports = function (rules) {
  return plugin(function ({ addComponents, theme }) {
    let output = {};

    if (!rules) {
      return output;
    }

    const traverseAndBuild = (rule) => {
      const themeData = theme(rule);

      const buildOutput = (obj, prefix) => {
        if (typeof obj === "object" && !Array.isArray(obj)) {
          return Object.keys(obj).reduce((acc, key) => {
            const newPrefix = [prefix, key].join("-");
            if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
              Object.assign(acc, buildOutput(obj[key], newPrefix));
            } else if (Array.isArray(obj[key])) {
              acc[newPrefix] = obj[key].join(", ");
            } else {
              acc[newPrefix] = obj[key];
            }
            return acc;
          }, {});
        } else if (Array.isArray(obj)) {
          return { [prefix]: obj.join(", ") };
        } else {
          return { [prefix]: obj };
        }
      };

      return buildOutput(themeData, `--${rule.split(".").join("-")}`);
    };

    if (typeof rules === "string") {
      output = traverseAndBuild(rules);
    }

    if (Array.isArray(rules)) {
      output = rules.reduce((acc, rule) => {
        return Object.assign(acc, traverseAndBuild(rule));
      }, {});
    }

    addComponents({
      ":root": output,
    });
  });
};
