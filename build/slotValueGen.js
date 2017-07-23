const rules = require("../src/rules.json");
const fs = require("fs");

const keywords = new Set(Object.keys(rules).reduce((coll, ruleName) => [ ...coll, ...rules[ruleName]], []));
fs.writeFileSync("./speech-assets/slotValues.txt", Array.from(keywords).join("\n"));
