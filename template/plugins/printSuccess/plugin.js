/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { blue, green, red, yellow } = require("kleur");

module.exports = {
  async apply(value, previousValues) {
    return new Promise((resolve) => {
      console.log("\n");
      console.log(
        "Mobmaxime React-Native Boilerplate initialized with success ! 🚀\n"
      );
      console.log(
        `${green(
"ooooooooo.   ooooo      ooo         ooo        ooooo           .o8                                                o8o                              
`888   `Y88. `888b.     `8'         `88.       .888'           "888                                                `"'                              
 888   .d88'  8 `88b.    8           888b     d'888   .ooooo.   888oooo.  ooo. .oo.  .oo.    .oooo.   oooo    ooo oooo  ooo. .oo.  .oo.    .ooooo.  
 888ooo88P'   8   `88b.  8           8 Y88. .P  888  d88' `88b  d88' `88b `888P"Y88bP"Y88b  `P  )88b   `88b..8P'  `888  `888P"Y88bP"Y88b  d88' `88b 
 888`88b.     8     `88b.8  8888888  8  `888'   888  888   888  888   888  888   888   888   .oP"888     Y888'     888   888   888   888  888ooo888 
 888  `88b.   8       `888           8    Y     888  888   888  888   888  888   888   888  d8(  888   .o8"'88b    888   888   888   888  888    .o 
o888o  o888o o8o        `8          o8o        o888o `Y8bod8P'  `Y8bod8P' o888o o888o o888o `Y888""8o o88'   888o o888o o888o o888o o888o `Y8bod8P' 
      )}`
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
        "- 🤕 If you have some troubles : https://github.com/sharmahdk13s/RNKitMobmaxime/issues"
      );
      console.log(
        "- ⭐ If you love this boilerplate, give us a star, you will be a ray of sunshine in our lives :) https://github.com/sharmahdk13s/RNKitMobmaxime"
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
