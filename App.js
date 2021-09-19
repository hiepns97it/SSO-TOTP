import React, {useState, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import FreeOtp from 'react-native-freeotp';
import totp from  "totp-generator";
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const App = () =>{
  const [code, setCode] = useState(0);
  const [qr, setQr] = useState('');

  onSuccess = async e => {
    console.log(JSON.stringify(e));
    const result = e.data;
    setQr(result);
    const tokenPair = await FreeOtp.getTokenPair(result);
    setCode(JSON.stringify(tokenPair));
  };

  useEffect(() => {
    const timeout = setTimeout( async () => {
      if(qr == '') return;
      const equToken = await FreeOtp.getTokenPair(qr);
      if(equToken === code) return;
      setCode(JSON.stringify(equToken));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [code]);

  return (
    <View style={{flex: 1}}>
    <View  style={{flex: 4}}>
      <QRCodeScanner
        onRead={this.onSuccess}
          flashMode={RNCamera.Constants.FlashMode.off}
      />
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'blue', fontSize: 14}}>Code:  {code}</Text>
        <Text style={{color: 'blue', fontSize: 14}}>tokenOne:  {JSON.parse(code).tokenOne}</Text>
        <Text style={{color: 'blue', fontSize: 14}}>tokenTwo:  {JSON.parse(code).tokenTwo}</Text>
        <Text style={{color: 'blue', fontSize: 14}}>tokenOneExpires:  {JSON.parse(code).tokenOneExpires}</Text>
        <Text style={{color: 'blue', fontSize: 14}}>tokenTwoExpires:  {JSON.parse(code).tokenTwoExpires}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
