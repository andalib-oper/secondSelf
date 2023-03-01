import {StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const CameraOptions = ({navigation}) => {
    const [fileName, setFileName] = useState('');
  const [images, setImage] = useState('');
  const [cameraFileName, setCameraFileName] = useState('');
  const [cameraImages, setCameraImage] = useState('');
  const launchLibrary = () => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      console.log('img', image?.path?.slice(-23));
      setFileName(image?.path?.slice(-23));
      setImage(image);
    });
  };
  const launchCamera = () =>{
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setCameraFileName(image?.path?.slice(-23));
        setCameraImage(image);
        navigation.goBack()
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.ImageView}>
        <ImageBackground style={styles.imagebackground}>
          <Image
            source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
            style={styles.image}
          />
        </ImageBackground>
        <Text style={styles.imageText}>Aawesh Kumar Singh</Text>
      </View>
      <View style={styles.buttonView}>
      <TouchableOpacity onPress={()=>{launchCamera()}} style={styles.ClickButton}>
        <Text style={styles.ClickButtonText}>Take Photo From Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ClickButton} onPress={()=>{launchLibrary()}}>
        <Text style={styles.ClickButtonText}>Choose From Gallery</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  ImageView: {
    justifyContent: 'center',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  imagebackground: {
    height: 105,
    width: 105,
    borderWidth: 3,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  imageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: '5%',
  },
  buttonView:{
    marginTop:'10%'
  },
  ClickButton:{
    padding:10,
backgroundColor:'#fff',
alignSelf:'center',
borderRadius:10,
marginTop:'5%'
  },
  ClickButtonText:{
    fontSize:16,
    color:'#000',
    fontWeight:'bold'
  }
});
