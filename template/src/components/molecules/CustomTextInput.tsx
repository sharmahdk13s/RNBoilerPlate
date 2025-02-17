import {TextContainer} from '@components/atoms';
import fontFamily from '@constants/fontFamily';
import {moderateScale, scale, verticalScale} from '@utils/scaling';
import React, {forwardRef, Ref, useState} from 'react';
import {useTranslation} from 'react-i18next';
import type {TextInputProps} from 'react-native';
import {ImageSourcePropType, Pressable, TextInput, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import ImageContainer from '../atoms/ImageContainer';

const stylesheet = createStyleSheet(theme => ({
  input: {
    height: moderateScale(52),
    borderColor: 'rgba(217, 217, 217,1)',
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
    backgroundColor: theme.colors.textInputColor,
  },
  textInputStyle: {
    flex: 1,
    marginHorizontal: moderateScale(8),
    height: moderateScale(52),
    color: theme.colors.typography,
    fontFamily: fontFamily.medium,
    fontSize: scale(12),
  },
  labelStyle: {
    fontSize: scale(14),
    marginBottom: moderateScale(8),
    fontFamily: fontFamily.medium,
  },
  errorText: {
    fontFamily: fontFamily.medium,
    fontSize: scale(12),
    color: theme.colors.danger,
    marginTop: verticalScale(5),
    marginLeft: scale(2),
  },
}));

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  label: string;
  rightImage?: ImageSourcePropType | null;
  leftImage?: ImageSourcePropType | null;
  style?: object;
  error?: string | null;
  onPressRight?: () => void;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {placeholder, onChangeText, label, rightImage, leftImage, style, error, onPressRight, ...rest},
    ref,
  ) => {
    const [text, setText] = useState('');
    const {styles, theme} = useStyles(stylesheet);
    const {t} = useTranslation();

    const handleTextChange = (inputText: string) => {
      setText(inputText);
      if (onChangeText) {
        onChangeText(inputText);
      }
    };

    return (
      <View style={style}>
        {label ? <TextContainer text={label} style={styles.labelStyle} /> : null}
        <View style={styles.input}>
          {leftImage ? (
            <ImageContainer
              resizeMode="contain"
              style={{height: moderateScale(16), width: moderateScale(16)}}
              source={leftImage}
            />
          ) : null}
          <TextInput
            ref={ref}
            style={styles.textInputStyle}
            placeholder={t(`${placeholder}`)}
            onChangeText={handleTextChange}
            value={text}
            placeholderTextColor={theme.colors.placeholder}
            {...rest}
          />
          {rightImage ? (
            <Pressable onPress={onPressRight}>
              <ImageContainer source={rightImage} />
            </Pressable>
          ) : null}
        </View>
        {error && <TextContainer text={error} style={styles.errorText} />}
      </View>
    );
  },
);
export default React.memo(CustomTextInput);
