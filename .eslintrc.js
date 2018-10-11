module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-multiple-empty-lines": [2, {"max": 2}], //空行最多不能超过2行
        "consistent-this": [2, "that"], //this别名
        "default-case": 2, //switch语句最后必须有default
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }], //对象字面量中冒号的前后空格
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 0,
        'indent': [2, 4],
        'no-trailing-spaces': 0,
        "no-extra-semi": "error" // 禁止使用分号
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
