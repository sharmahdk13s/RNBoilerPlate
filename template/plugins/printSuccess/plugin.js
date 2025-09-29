/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { blue, green, red, yellow } = require("kleur");

module.exports = {
  async apply(value, previousValues) {
    return new Promise((resolve) => {
      console.log("\n");
      console.log(
        "React-Native Boilerplate initialized with success ! 🚀\n"
      );
      if (!previousValues.typescript) {
        console.log(blue("  THE TYPESCRIPT VERSION 📘"));
      } else {
        console.log(yellow("  THE JAVASCRIPT VERSION 📒"));
      }
      console.log("\n");

      console.log(
        "- 📚 If you need to read more about this boilerplate : https://thecodingmachine.github.io/react-native-boilerplate/"
      );
      console.log(
        "- ⭐ If you love this boilerplate, give us a star, you will be a ray of sunshine in our lives :) https://github.com/sharmahdk13s/RNBoilerPlate"
      );

      if (previousValues.typescript) {
        console.log("\n");
        console.log(
          red(
            '🚨 You choose the javascript version, don\'t forget to run "yarn lint:fix" after the installation 🚨'
          )
        );
        console.log("\n");
      }

      resolve();
    });
  },
};
