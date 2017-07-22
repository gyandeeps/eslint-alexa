module.exports = {
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": false
        }
    },
    "rules": {
        "semi": 2,
        "no-console": 0,
        "quotes": [2, "double"],
        "comma-dangle": 0,
        "global-require": 0,
        "import/no-dynamic-require": 0, // activate all import rules later (issue with eslint 4.x)
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-absolute-path": 0,
        "arrow-parens": [2, "always"],
        indent: [ 2, 4, {
            SwitchCase: 1
        } ]
    },
    env: {
        node: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "airbnb-base"
    ],
    root: true
};
