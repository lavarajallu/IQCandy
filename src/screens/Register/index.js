import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { imagePaths } from '../../constants/path';
import ValidatedTextInput from '../../components/ValidatedTextInput';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownSearch from '../../components/DropdownSearch';
import { textContent } from '../../constants/content';
import styles from './styles';
import { selectUser } from '../../store/authManagement/selector';
import {
  createNewUser,
  getBranches,
  getSemesters,
  getUniversities,
} from '../../api/auth';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateZipCode,
} from '../../constants/helpers';

const { width } = Dimensions.get('window');

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { universities, branches, states, semesters } = useSelector(selectUser);
  const { authentiCation } = imagePaths;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSemester, setselectedSemester] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [zipCode, setZipCode] = useState('');

  const [firstNameValidation, setFirstNameValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [lastNameValidation, setLastNameValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [emailValidation, setEmailValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [passwordValidation, setPasswordValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [mobileNumberValidation, setMobileNumberValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [zipCodeValidation, setZipCodeValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });
  const [selectedUniversityValidation, setSelectedUniversityValidation] =
    useState({
      showErrorMessage: false,
      errorMessage: '',
    });

  // State variables for dropdown validations
  const [selectedBranchValidation, setSelectedBranchValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [selectedSemesterValidation, setSelectedSemesterValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [selectedStateValidation, setSelectedStateValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const [selectedGenderValidation, setSelectedGenderValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  const onChangeUniversity = (uniId) => {
    setSelectedUniversity(uniId);
    setselectedSemester(null);
    // Clear dropdown validation error when university changes
    setSelectedUniversityValidation({
      showErrorMessage: false,
      errorMessage: '',
    });
    
    getBranches({
      boardId: uniId,
      dispatch,
    });
  };
  useEffect(()=>{
   // alert("hkjhkjhjk"+JSON.stringify(branches))
  },[branches])
  const onChangeBranch = (branchId) => {
    setSelectedBranch(branchId);
    // Clear dropdown validation error when branch changes
    setSelectedBranchValidation({
      showErrorMessage: false,
      errorMessage: '',
    });
    // getSemesters({
    //   boardId: selectedUniversity,

    //   gradeId:branchId,
    //   dispatch,
    // });
  };

  // const onChangeSemister = (semesterId) => {
  //   setselectedSemester(semesterId);
  //   // Clear dropdown validation error when semester changes
  //   setSelectedSemesterValidation({
  //     showErrorMessage: false,
  //     errorMessage: '',
  //   });
  // };

  const onChangeState = (state) => {
    setSelectedState(state);

    // Clear dropdown validation error when state changes
    setSelectedStateValidation({
      showErrorMessage: false,
      errorMessage: '',
    });
  };

  const onChangeGender = (gen) => {
    setSelectedGender(gen);
    // Clear dropdown validation error when gender changes
    setSelectedGenderValidation({
      showErrorMessage: false,
      errorMessage: '',
    });
  };

  useEffect(() => {
    getUniversities({
      dispatch,
    });
  }, []);

  const validateDropdown = (value, setValidation) => {
    if (!value) {
      setValidation({
        showErrorMessage: true,
        errorMessage: 'Please select a value',
      });
      return false;
    }

    setValidation({
      showErrorMessage: false,
      errorMessage: '',
    });
    return true;
  };
  const validtefirstname = (value, setFirstNameValidation) => {
    const regex = /^[a-zA-Z]+$/; // Updated regex pattern to match only alphabets
    if (!value.trim()) {
      setFirstNameValidation({
        showErrorMessage: true,
        errorMessage: 'First Name cannot be empty',
      });
      return false;
    } else if (!regex.test(value)) {
      setFirstNameValidation({
        showErrorMessage: true,
        errorMessage: 'Only alphabetic characters are allowed',
      });
      return false;
    }
    return true;
  };

  const validtelastname = (value, setLastNameValidation) => {
    const regex = /^[a-zA-Z]+$/; // Updated regex pattern to match only alphabets
    if (!value.trim()) {
      setLastNameValidation({
        showErrorMessage: true,
        errorMessage: 'Last Name cannot be empty',
      });
      return false;
    } else if (!regex.test(value)) {
      setLastNameValidation({
        showErrorMessage: true,
        errorMessage: 'Only alphabetic characters are allowed',
      });
      return false;
    }
    return true;
  };
  const validteemail = (value, setEmailValidation) => {
    if (!value.trim() || !validateEmail(value)) {
      setEmailValidation({
        showErrorMessage: true,
        errorMessage: 'Invalid email address',
      });
      return false;
    }
    return true;
  };
  const validtepassword = (password, setPasswordValidation) => {
    if (!password.trim() || !validatePassword(password)) {
      setPasswordValidation({
        showErrorMessage: true,
        errorMessage:
          'Invalid password, please enter 8 characters, at least one number, one letter, and one special character',
      });
      return false;
    }
    return true;
  };
  const validtecnfpassword = (
    confirmPassword,
    setConfirmPasswordValidation
  ) => {
    if (!confirmPassword.trim() || !validatePassword(confirmPassword)) {
      setConfirmPasswordValidation({
        showErrorMessage: true,
        errorMessage:
          'Invalid confirm password, please enter 8 characters, at least one number, one letter, and one special character',
      });
      return false;

      //  return false;
    }
    return true;
  };
  const validtephonenumber = (mobileNumber, setMobileNumberValidation) => {
    if (!mobileNumber || !validatePhoneNumber(mobileNumber)) {
      setMobileNumberValidation({
        showErrorMessage: true,
        errorMessage: 'Invalid Phonenumber',
      });
      return false;
    }
    return true;
  };
  const validatezipcode = (zipCode, setZipCodeValidation) => {
    if (!zipCode || !validateZipCode(zipCode)) {
      setZipCodeValidation({
        showErrorMessage: true,
        errorMessage:
          'Invalid zipCode, please enter valid zipCode with minimum 5 numbers',
      });
      return false;
    }

    return true;
  };
  // const validateInputs = () => {
  //   // Add specific validations for each input field
  //   if (!firstName.trim()) {
  //     setFirstNameValidation({
  //       showErrorMessage: true,
  //       errorMessage: 'First Name cannot be empty',
  //     });
  //     //return false;
  //   }

  //   if (!lastName.trim()) {
  //     setLastNameValidation({
  //       showErrorMessage: true,
  //       errorMessage: 'Last Name cannot be empty',
  //     });
  //     // return false;
  //   }

  //   if (!email.trim() || !validateEmail(email)) {
  //     setEmailValidation({
  //       showErrorMessage: true,
  //       errorMessage: 'Invalid email address',
  //     });

  //     // return false;
  //   }

  //   if (!password.trim() || !validatePassword(password)) {
  //     setPasswordValidation({
  //       showErrorMessage: true,
  //       errorMessage:
  //         'Invalid password, please enter 8 characters, at least one number, one letter, and one special character',
  //     });
  //     // return false;
  //   }

  //   if (!confirmPassword.trim() || !validatePassword(confirmPassword)) {
  //     setConfirmPasswordValidation({
  //       showErrorMessage: true,
  //       errorMessage: 'Invalid confirm password',
  //     });
  //     // return false;
  //   }

  //   if (!mobileNumber || !validatePhoneNumber(mobileNumber)) {
  //     setMobileNumberValidation({
  //       showErrorMessage: true,
  //       errorMessage: 'Invalid Phonenumber',
  //     });
  //     //return false;
  //   }
  //   // if (!zipCode || !validateZipCode(zipCode)) {
  //   //   setZipCodeValidation({
  //   //     showErrorMessage: true,
  //   //     errorMessage: 'Invalid zipCode',
  //   //   });
  //   //   ////  return false;
  //   // }

  //   // Add similar conditions for other fields

  //   // If all validations pass, return true
  //   //return true;
  // };

  const onRegister = async () => {
    // Check for validations
    // const isValid = validateInputs();
    const universityValid = validateDropdown(
      selectedUniversity,
      setSelectedUniversityValidation
    );
    const branchValid = validateDropdown(
      selectedBranch,
      setSelectedBranchValidation
    );
   
    const stateValid = validateDropdown(
      selectedState,
      setSelectedStateValidation
    );
    const genderValid = validateDropdown(
      selectedGender,
      setSelectedGenderValidation
    );
    const isfirstnamevalid = validtefirstname(
      firstName,
      setFirstNameValidation
    );
    const islastnamevalid = validtelastname(lastName, setLastNameValidation);
    const isemailvalid = validteemail(email, setEmailValidation);
    const ispasswrdvalid = validtepassword(password, setPasswordValidation);
    const iscnfpasswordvalid = validtecnfpassword(
      confirmPassword,
      setConfirmPasswordValidation
    );
    const ismobilevalid = validtephonenumber(
      mobileNumber,
      setMobileNumberValidation
    );
    const iszipcodevalid = validatezipcode(zipCode, setZipCodeValidation);

    // If any validation fails, display an error or alert
    if (
      !isfirstnamevalid ||
      !islastnamevalid ||
      !isemailvalid ||
      !ispasswrdvalid ||
      !iscnfpasswordvalid ||
      !ismobilevalid ||
      !iszipcodevalid ||
      !universityValid ||
      !branchValid ||
      !stateValid ||
      !genderValid
    ) {
      Alert.alert('My Professor', 'Please fill in all required fields');
      return;
    }

    // If all validations pass, proceed with registration
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      mobile: mobileNumber,
      inviteCode: referralCode,
      boardId: selectedUniversity,
      gradeId: selectedBranch,
      gender: selectedGender,
      state: selectedState,
      zipCode: zipCode,
    };

    await createNewUser({ data: payload, navigation, dispatch });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={authentiCation?.registerBanner}
            resizeMode={'cover'}
            style={styles.imageBackground}
          />
        </View>
        <View style={styles.curvedLineContainer}>
          <ImageBackground
            source={require('../../../assets/images/shape.png')}
            resizeMode={'cover'}
            style={styles.curvedLine}
          >
            <View style={styles.logoContainer}>
              <Image source={authentiCation.appCircleLogo} />
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{
                  backgroundColor: 'transparent',
                  overflow: 'hidden',
                }}
              >
                <View style={{ paddingBottom: 20 }}>
                  <ValidatedTextInput
                    label='First Name'
                    placeholder='Enter your first name'
                    value={firstName}
                    onChangeText={setFirstName}
                    validation={firstNameValidation}
                    iconName='person-outline'
                  />
                  <ValidatedTextInput
                    label='Last Name'
                    placeholder='Enter your last name'
                    value={lastName}
                    onChangeText={setLastName}
                    validation={lastNameValidation}
                    iconName='person-outline'
                  />

                  <ValidatedTextInput
                    label='Email'
                    placeholder='Enter your email Id'
                    value={email}
                    onChangeText={setEmail}
                    validation={emailValidation}
                    iconName='mail-outline'
                  />

                  <ValidatedTextInput
                    label='Password'
                    placeholder='Enter your password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    validation={passwordValidation}
                    iconName='lock-closed-outline'
                  />

                  <ValidatedTextInput
                    label='Confirm Password'
                    placeholder='Enter your Confirm password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    validation={confirmPasswordValidation}
                    iconName='lock-closed-outline'
                    prevpassword={password}
                  />

                  <ValidatedTextInput
                    label='Contact'
                    placeholder='Enter your number'
                    value={mobileNumber}
                    inputMode={'numeric'}
                    keyboardType={'number-pad'}
                    onChangeText={setMobileNumber}
                    validation={mobileNumberValidation}
                    iconName='call-outline'
                  />
                  <View style={styles.dropdownView}>
                    <DropDownSearch
                      placeholderText={'Select State'}
                      data={textContent?.indiaStates}
                      label={''}
                      labelField={'label'}
                      valueField={'value'}
                      width={width * 0.89}
                      handleChange={onChangeState}
                      selectedValue={selectedState}
                      validation={selectedStateValidation}
                    />

                    <DropDownSearch
                      placeholderText={'Select Gender'}
                      data={textContent?.genderList}
                      label={''}
                      labelField={'label'}
                      valueField={'value'}
                      width={width * 0.89}
                      handleChange={onChangeGender}
                      selectedValue={selectedGender}
                      validation={selectedGenderValidation}
                    />

                    <DropDownSearch
                      placeholderText={'Select Board'}
                      data={universities?.map((uni) => ({
                        label: uni.name,
                        value: uni.id,
                      }))}
                      label={''}
                      labelField={'label'}
                      valueField={'value'}
                      width={width * 0.89}
                      handleChange={onChangeUniversity}
                      selectedValue={selectedUniversity}
                      validation={selectedUniversityValidation}
                    />

                    <DropDownSearch
                      placeholderText={'Select Grade'}
                      label={''}
                      width={width * 0.89}
                      labelField={'label'}
                      valueField={'value'}
                      data={branches?.map((branch) => ({
                        label: branch.name,
                        value: branch.id,
                      }))}
                      handleChange={onChangeBranch}
                      selectedValue={selectedBranch}
                      validation={selectedBranchValidation}
                    />
                   {/* <DropDownSearch
                      placeholderText={'Select Semester'}
                      data={semesters?.map((sem) => ({
                        label: sem.name,
                        value: sem.id,
                      }))}
                      label={''}
                      labelField={'label'}
                      valueField={'value'}
                      width={width * 0.89}
                      handleChange={onChangeSemister}
                      selectedValue={selectedSemester}
                      validation={selectedSemesterValidation}
                    />*/}
                  </View>
                  <ValidatedTextInput
                    label='Zip Code'
                    placeholder='Enter your Zip code'
                    value={zipCode}
                    inputMode={'numeric'}
                    keyboardType={'number-pad'}
                    onChangeText={setZipCode}
                    iconName='locate-outline'
                    validation={zipCodeValidation}
                  />
                  <ValidatedTextInput
                    label='Referral Code'
                    placeholder='Enter your referral code'
                    value={referralCode}
                    onChangeText={setReferralCode}
                    validation={''}
                    iconName='barcode-outline'
                  />
                </View>
              </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={'REGISTER'}
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() => onRegister()}
              />

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.createAccountText}>
                  Do you have an account?{' '}
                  <Text style={styles.createAccountLink}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
