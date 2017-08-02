module.exports = {

    "extends": "airbnb",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],

    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        "no-console": 0,
        "indent": [
            "off"
        ],
        "linebreak-style": [
            "off"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-useless-escape": [
            "off"
        ],
        "quote-props": [
            "off"
        ],
        "import/no-extraneous-dependencies": [
            "off"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "react/jsx-indent": [
            "error",
            4
        ]
    }
};