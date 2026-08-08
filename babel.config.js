module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            // Klíčový přepis: přesměruje chybějící worklets plugin na reanimated plugin
            "react-native-worklets/plugin": "react-native-reanimated/plugin",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};