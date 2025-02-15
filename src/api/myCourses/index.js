// MyCourses API.js

import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';
import {
  setActivities,
  setChapters,
  setSubjects,
  setTopics,
  setTestQuestionsData,
  setQuestionById,
  setValidateAnswer,
  setendtest,
  setvideoActivitydata,
  setSummaryData,
  setNotestActivitydata,
  setQuestionByIdReattempt,
  setCalenderData,
  setaddtocalenderPut,
  setgetassesmentsdata,
  setgetcalenderdataapi,
  setupdateanalyticsNotes,
  setPreviousQuestionPaperByCount,
  setGatePreviousQuestionPaperByCount,
  setProfActivities,
  setreviewsolutions,
  setrecommendedTopics,
  setGateQuestionPaperByTopicIdRequests,
  setNotestActivitydataProf,
  setQuestionPaperByTopicIdRequest,
  setvideoActivitydataPro,
  setrecommtopicActivities,
  setvideoquestionsdata,
  setytvideoActivitydata,
  setvalidatevideoquestiona,
  setvideoquestionassesdata,
  setVideoquestionsvideopro,
} from '../../store/student/myCourses/slice';

const getSubjects = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getSubjects(payload.userId);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setSubjects(data));
  }
};

const getChapters = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getChapters(payload.userId);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setChapters(data));
  }
};

const getTopics = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getTopics(payload.userId);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setTopics(data));
  }
};
const getrecommendedtopics = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getrecommendedtopics(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setrecommendedTopics(data));
  }
};
const getPreviousQuestionPaperByCount = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getPreviousQuestionPaperByCount(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setPreviousQuestionPaperByCount(data));
  }
};
const getGatePreviousQuestionPaperCountByTopic = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getGatePreviousQuestionPaperCountByTopic(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setGatePreviousQuestionPaperByCount(data));
  }
};

const getActivities = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getActivities(payload.userId);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setActivities(data));
  }
};
const getrecommendedtopicActivities = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getrecommendedtopicActivities(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setrecommtopicActivities(data));
  }
};
const getprofessorresources = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getprofessorresources(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setProfActivities(data));
  }
};
const addtocalenderPost = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.addtocalender(payload.userId);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    console.log('/////////', response);
    payload.dispatch(setCalenderData(data));
  }
};
const addtocalenderPut = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.addtocalenderPut(payload);
  const method = 'PUT';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  console.log('put.......', response);
  if (response) {
    const { data } = response;
    console.log('put.......', response);
    payload.dispatch(setaddtocalenderPut(data));
  }
};
const getCalenderDataapi = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getCalenderDataapi(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setgetcalenderdataapi(data));
  }
};
const getTestQuestionsData = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getTestQuestionsData(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check f   or success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setTestQuestionsData(data));
  }
};
const getQuestionById = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getQuestionById(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setQuestionById(data));
  }
};
const validateAnswerapi = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.validateAnswer(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setValidateAnswer(data));
  }
};
const endTestapi = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.endtest(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { code } = response;
    payload.dispatch(setendtest(code));
  }
};
const getsummaryreport = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getsummaryReport(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setSummaryData(data));
  }
};
const getQuestionByIdReattemptapi = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getQuestionByIdReattempt(payload);
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setQuestionByIdReattempt(data));
  }
};
const getNotesActivityData = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getNotesActivityData(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setNotestActivitydata(data));
  }
};
const getNotesActivityDataProfe = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getNotesActivityDataProfe(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setNotestActivitydataProf(data));
  }
};
const getVideoActivityData = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getNotesActivityData(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setvideoActivitydata(data));
  }
};
const getVideoquestionsvideopro = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getVideoquestionsvideopro(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setVideoquestionsvideopro(data));
  }
};
const getAssessmentTestQuestionRequest = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getAssessmentTestQuestionRequest(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setvideoquestionassesdata(data));
  }
};
const validatevideoquestiona = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.validatevideoquestiona(payload);
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for   success and handle accordingly

  if (response) {
    const { data } = response;
    payload.dispatch(setvalidatevideoquestiona(data));
  }
};
const getVideoquestions = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getvideoquestions(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    var { data } = response;
    payload.dispatch(setvideoquestionsdata(data));
  }
};
const getVideoActivityDatayoutube = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getNotesActivityData(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setytvideoActivitydata(data));
  }
};
const getVideoActivityDataProf = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getNotesActivityDataProfe(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setvideoActivitydataPro(data));
  }
};
const getassesmentsdata = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getassesmentsdata(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setgetassesmentsdata(data));
  }
};
const updateanalyticsNotes = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.updateanalyticsNotes(payload);
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setupdateanalyticsNotes(data));
  }
};
const getreviewsolutions = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getreviewsolutions(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setreviewsolutions(data));
  }
};
const getQuestionPaperByTopicIdRequest = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getQuestionPaperByTopicIdRequest(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setQuestionPaperByTopicIdRequest(data));
  }
};
const getGateQuestionPaperByTopicIdRequest = async (payload) => {
  const { myCourses } = apiEndPoints;
  const endpoint = myCourses.getGateQuestionPaperByTopicIdRequest(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for   success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setGateQuestionPaperByTopicIdRequests(data));
  }
};
export {
  getGateQuestionPaperByTopicIdRequest,
  getQuestionPaperByTopicIdRequest,
  getreviewsolutions,
  getassesmentsdata,
  getSubjects,
  getChapters,
  getTopics,
  getActivities,
  getVideoActivityData,
  getTestQuestionsData,
  getQuestionById,
  validateAnswerapi,
  endTestapi,
  getsummaryreport,
  getVideoActivityDatayoutube,
  getprofessorresources,
  getQuestionByIdReattemptapi,
  getNotesActivityData,
  addtocalenderPost,
  getCalenderDataapi,
  addtocalenderPut,
  validatevideoquestiona,
  updateanalyticsNotes,
  getPreviousQuestionPaperByCount,
  getGatePreviousQuestionPaperCountByTopic,
  getrecommendedtopics,
  getNotesActivityDataProfe,
  getVideoActivityDataProf,
  getrecommendedtopicActivities,
  getVideoquestions,
  getAssessmentTestQuestionRequest,
  getVideoquestionsvideopro,
};
