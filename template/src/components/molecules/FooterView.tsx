import {TextContainer} from '@components/atoms';
import fontFamily from '@constants/fontFamily';
import {moderateScale} from '@utils/scaling';
import React from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const stylesheet = createStyleSheet(() => ({
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    marginLeft: moderateScale(4),
    fontFamily: fontFamily.semiBold,
  },
}));

const FooterView = ({
  simpleText,
  linkText,
  linkPress,
}: {
  simpleText: string;
  linkText: string;
  linkPress: ((event: GestureResponderEvent) => void) | undefined;
}): React.JSX.Element => {
  // Stylesheet declaration
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.bottomView}>
      <TextContainer text={simpleText} />
      <TextContainer onPress={linkPress} text={linkText} style={styles.text} />
    </View>
  );
};

export default FooterView;
