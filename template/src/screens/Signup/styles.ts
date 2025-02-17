import { moderateScale } from "@utils/scaling";
import { createStyleSheet } from "react-native-unistyles";

// no user before defined
const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(16),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(24),
  },
}));

export default stylesheet;