// index.js
import { combineReducers } from 'redux';
import authReducer from '../authManagement/slice';
import myCoursesReducer from '../student/myCourses/slice';
import myLearningReducer from '../student/myLearning/slice';
import myReferandEarnReducer from '../student/referAndEarn/slice';
import myProfileReducer from '../student/MyProfile/slice';
import myTopicsProgress from '../student/myTopicProgress/slice';
import validatePackage from '../student/validatePackages/slice';
import mySearch from '../student/search/slice';
import myCalender from '../student/myCalender/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  myCourses: myCoursesReducer,
  myLearning: myLearningReducer,
  myReferandEarn: myReferandEarnReducer,
  myProfile: myProfileReducer,
  myTopicsProgress: myTopicsProgress,
  validatePackage: validatePackage,
  mySearch: mySearch,
  myCalender: myCalender,
  // Add other reducers if needed
});

export default rootReducer;
