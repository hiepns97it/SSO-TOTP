import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import FreeOtp from 'react-native-freeotp';
import totp from  "totp-generator";

const App = () => {
  const [code, setCode] = useState(0);
  const [codeCs, setCodeCs] = useState(0);
  const [qr, setQr] = useState('');
  const [qr1, setQr1] = useState('');
  
  return (
    <View>
      <Text style={{color: 'red'}}>SSO TOTP - HIPNS</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setQr(text)
        }}
        value={qr}
      />
      <TextInput
        style={styles.input1}
        onChangeText={(text) => {
          setQr1(text)
        }}
        value={qr1}
      />

      <Button
        title="totpFree"
        onPress={
          async () => {
            console.log('totpFree');
            const tokenPair = await FreeOtp.getTokenPair(qr);
            console.log(JSON.stringify(tokenPair));
            setCode(JSON.stringify(tokenPair));
          }
        }
      />

      <Button
        title="totpCustom"
        onPress={
          async () => {
            console.log('totpCustom');
            const tokenCt = totp(qr1, { digits: 6 });
            setCodeCs(tokenCt);
          }
        }
      />
      <Text>totpFree: {code}</Text>
      <Text>totpFree: {qr}</Text>

      <Text>totpCustom: {codeCs}</Text>
      <Text>totpCustom: {qr1}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input1: {
    height: 40,
    borderColor: 'red',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
