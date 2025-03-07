import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLOURS } from '../components/database/Database';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main_home_container: {
      width: '100%',
      height: '100%',
      backgroundColor: COLOURS.white
    },
    inner_home_container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    inner_home_container2: {
      marginBottom: 10,
      padding: 16,

    },
    icon_style: {
      fontSize: 18,
      color: COLOURS.backgroundMedium,
      padding: 12,
      borderRadius: 10,
      backgroundColor: COLOURS.backgroundLight
    },
    icon_style2: {
      fontSize: 18,
      color: COLOURS.backgroundMedium,
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: COLOURS.backgroundLight
    },
    shop_title: {
      fontSize: 14,
      color: COLOURS.black,
      fontWeight: '500',
      letterSpacing: 1,
      marginBottom: 10
    },
    shop_subtitle: {
      fontSize: 14,
      color: COLOURS.black,
      fontWeight: '400',
      letterSpacing: 1,
      lineHeight: 24
    },
    productInfo_main_container: {
      width: '100%',
      height: '100%',
      backgroundColor: COLOURS.white,
      position: 'relative'
    },
    productInfo_inner_container: {
      width: '100%', 
      backgroundColor: COLOURS.backgroundLight, 
      borderBottomRightRadius: 20, 
      borderBottomLeftRadius: 20, 
      position: 'relative', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 4
    }
  });

  export default styles;