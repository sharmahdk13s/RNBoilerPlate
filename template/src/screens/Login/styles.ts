import { moderateScale } from "@utils/scaling";
import { createStyleSheet } from "react-native-unistyles";

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(16),
    justifyContent: 'space-between',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
}));

export default stylesheet;