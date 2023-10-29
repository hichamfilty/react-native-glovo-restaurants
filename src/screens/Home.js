import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import React, { useContext } from 'react';
import HomeHeader from '../components/HomeHeader';
import { colors } from '../global/Styles';
import { auth } from '../../config/Firebase';
import { signOut } from 'firebase/auth';
import { SignInContext } from '../contexts/authContext';

const Home = ({ navigation }) => {
  const { dispatchSignedIn } = useContext(SignInContext);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('USER SUCCESSFULLY SIGNED OUT');
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: { userToken: null },
        });
      })
      .catch((error) => {
        // An error happened.
        Alert.alert(error.code);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor={colors.statusbar}
      />
      <HomeHeader navigation={navigation} />
      <Button
        title='Logout'
        onPress={() => {
          logOut();
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flex: 1,
});
