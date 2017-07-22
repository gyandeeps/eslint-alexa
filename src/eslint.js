const rules = require("./rules");

const ruleKeys = Object.keys(rules);

const pluckKeyWithHighScore = (results) => Object.keys(results).reduce((top, ruleName) => {
    if (results[ruleName] > top[1]) {
        return [ruleName, results[ruleName]];
    }

    return top;
}, ["", 0])[0];

const ruleFinder = (descriptions) => pluckKeyWithHighScore(descriptions.reduce((coll, des) => {
    ruleKeys.forEach((ruleName) => {
        if (rules[ruleName].includes(des)) {
            if (!coll[ruleName]) {
                coll[ruleName] = 0;
            }

            coll[ruleName] = coll[ruleName] + 100;
        }
    });

    return coll;
}, {}));


module.exports = {
    ruleFinder
};
