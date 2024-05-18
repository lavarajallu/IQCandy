import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';

const DynamicHeader = ({
  title = '',
  backAction,
  imageSource,
  labels,
  labelsStyle,
  righticon,
  onanalysis
}) => {
  return (
    <View style={[styles.container, { height: 240 }]}>
      <ImageBackground source={imageSource} style={styles.backgroundImage}>
        {/* Hide status bar on Android */}
        {Platform.OS === 'android' && <StatusBar hidden />}

        <TouchableOpacity style={styles.backButton} onPress={backAction}>
          <IonIcon name='chevron-back' size={24} color='black' />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={{flexDirection:"row"}}>
            <View style={{flex:0.8,}}>
            <Text style={styles.title}>{title}</Text>

            </View>
            <View style={{flex:0.1}}>
            {righticon ? 
        <TouchableOpacity onPress={onanalysis} style={{marginLeft:10}}>
          <Image source={righticon} style={{width:30,height:30,justifyContent:"center",alignItems:"center",tintColor:"white"}}/>
          </TouchableOpacity>
         : null }
            </View>
          
          </View>
        
          {labels && (
            <View style={[styles.labelsContainer, labelsStyle]}>
              {labels.map((label, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Text style={styles.separator}>-</Text>}
                  <Text style={styles.label}>{label}</Text>
                </React.Fragment>
              ))}
            </View>
          )}
         
        </View>
        <View style={{justifyContent:"center",alignItems:"center",paddingVertical:5,}}>
        
         </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    // overflow: 'hidden'
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 30 : 50,
    left: 20,
    padding: 6,
    zIndex: 1,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,
    padding: 10,
  },
  title: {
    color: COLORS.whiteColor,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'mulish-bold',
    marginLeft: 10,
  },
  labelsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5,
    justifyContent: 'flex-start',
  },
  separator: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 3,
    fontFamily: 'mulish-regular',
  },
  label: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 3,
    fontFamily: 'mulish-regular',
  },
});

export default DynamicHeader;
