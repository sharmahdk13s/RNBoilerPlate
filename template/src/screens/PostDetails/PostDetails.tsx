import {ButtonContainer, ImageContainer, TextContainer, WrapperContainer} from '@components/atoms';
import ErrorComp from '@components/molecules/ErrorComp';
import HeaderComp from '@components/molecules/HeaderComp';
import Loader from '@components/molecules/Loader';
import fontFamily from '@constants/fontFamily';
import imagePath from '@constants/imagePath';
import {ProductsData} from '@models/HomeData';
import {HomeStackParamList} from '@navigations/MainStack';
import type {RouteProp} from '@react-navigation/native';
import {moderateScale, scale, width} from '@utils/scaling';
import React, {useEffect} from 'react';
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {UnistylesRuntime, useStyles} from 'react-native-unistyles';
import stylesheet from './styles';
import {useDispatch, useSelector} from '@redux/hooks';
import {getProductDetails} from 'src/services/productService';

type PostDetailsRouteProp = RouteProp<HomeStackParamList, 'PostDetails'>;

type Props = {
  route: PostDetailsRouteProp;
};

const PostDetails: React.FC<Props> = ({route}): React.JSX.Element => {
  // Redux global variables
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.common.isLoading);
  const {error, productDetail} = useSelector(state => state.product);

  // Styles variables
  const {styles} = useStyles(stylesheet);
  const {theme} = useStyles();
  const isDarkMode = UnistylesRuntime.themeName === 'dark';

  // Effects
  useEffect(() => {
    dispatch(getProductDetails(route.params?.productId));
  }, [route.params?.productId]);

  // Rendering handled
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorComp />;
  }

  return (
    <WrapperContainer isSafeAreaView={false}>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          overflow: 'visible',
        }}>
        <ImageBackground
          resizeMode="stretch"
          source={{uri: productDetail?.thumbnail}}
          style={styles.imageStyle}>
          <SafeAreaView>
            <HeaderComp />
          </SafeAreaView>

          <View>
            <TextContainer
              isDynamicText
              text={productDetail?.description || ''}
              style={{
                color: theme.colors.white,
                fontSize: scale(24),
                fontFamily: fontFamily.semiBold,
              }}
            />
            <TextContainer
              isDynamicText
              text={productDetail?.description || ''}
              style={{
                color: theme.colors.white,
                fontSize: scale(14),
              }}
            />
          </View>
        </ImageBackground>

        <View style={[styles.containerView, {backgroundColor: theme.colors.background}]}>
          <View
            style={{
              ...styles.headerLine,
              backgroundColor: theme.colors.opacity50,
            }}
          />

          <View style={styles.rectangleBox}>
            <View style={{width: width / 2}}>
              <TextContainer text="FOLLOW_US" style={styles.followUs} />
              <TextContainer
                isDynamicText
                text="Over 35k Happy Customers"
                style={{color: theme.colors.white}}
              />
            </View>
            <ButtonContainer
              label="FOLLOW"
              style={styles.btnStyle}
              textStyle={styles.btnTextStyle}
            />
          </View>

          <View style={styles.likeCommentView}>
            <View style={styles.flexView}>
              <ImageContainer
                source={imagePath.icLike}
                style={{resizeMode: 'contain', marginRight: moderateScale(8)}}
              />
              <TextContainer isDynamicText style={{fontSize: scale(12)}} text="25.3k LIKES" />
            </View>
            <View style={{...styles.flexView, flex: 0.4}}>
              <ImageContainer
                source={imagePath.icComment}
                style={{resizeMode: 'contain', marginRight: moderateScale(8)}}
              />
              <TextContainer isDynamicText style={{fontSize: scale(12)}} text="2.1k COMMENTS" />
            </View>

            <ButtonContainer
              label="ADD_COMMENTS"
              style={{
                ...styles.btnStyle,
                backgroundColor: isDarkMode ? theme.colors.white : theme.colors.black,
                paddingHorizontal: moderateScale(10),
              }}
              textStyle={{
                ...styles.btnTextStyle,
                color: isDarkMode ? theme.colors.black : theme.colors.white,
                fontSize: scale(10),
              }}
            />
          </View>

          <View
            style={{
              ...styles.headerLine,
              backgroundColor: theme.colors.grey,
              width: '100%',
              height: moderateScale(1),
            }}
          />

          <TextContainer
            isDynamicText
            style={{color: theme.colors.blue}}
            text={productDetail?.brand || ''}
          />
          <TextContainer
            isDynamicText
            style={styles.headerTextStyle}
            text={productDetail?.title || ''}
          />
          <TextContainer
            isDynamicText
            style={styles.descTextStyle}
            text={productDetail?.description || ''}
          />
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};
export default PostDetails;
