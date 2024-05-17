// MyPractices API.js

import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';

import {
  setSubjectsInfo,
  setChapertsInfo,
  setPreviousQuesPaperTypes,
  setLeaderBoardData,
  setHeatMapData,
  setTopicsBySubject,
  setRuleBookCriteria,
  setPieChartData,
  setPreviousTestData,
  setChaptersData,
  setQuestionPapers,
  setPrePaperQuestionsData,
  setPrePaperQuestionsDatabyid,
  setendtestdata,
  setValidateAnswer,
  setSubjectiveData,
  setTestQuestionsData,
  setTestQuestionDatabyid,
  setassesmentDataPractice,
  setValidateAnswerPractice,
  setSummaryDataPractice,
  setEndTesetdatapractice,
  setSolutionsPractice,
} from '../../store/student/myLearning/slice';

const getAssessmentSubjects = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getAssessmentSubjects(payload.userId);
  const method = 'POST';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setSubjectsInfo(data));
  }
};
const getPracticeChapters = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getPracticeChapters(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setChapertsInfo(data));
  }
};
const getreviewsolutionsPractice = async (payload) => {
  const { userId } = payload;
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getreviewsolutionsPractice(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setSolutionsPractice(data));
  }
};

const getPreviousQuesPaperTypes = async (payload) => {
  const { userId } = payload;
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getPreviousQuesPaperTypes(userId);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setPreviousQuesPaperTypes(data));
  }
};

const getQuestionPapers = async (payload) => {
  const { userId } = payload;
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getQuestionPapers(userId);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setQuestionPapers(data));
  }
};

const getLeaderBoardData = async (payload) => {
  const { userId, universityId, collegeId, role } = payload;
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getLeaderBoardData(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setLeaderBoardData(data));
  }
};
const getHeatMapData = async (payload) => {
  const { userId, subjectId } = payload;
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getHeatMapData(userId, subjectId);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setHeatMapData(data));
  }
};
const getTopicsBySubjectId = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getTopicsBySubjectId(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setTopicsBySubject(data));
  }
};
const getRuleBookCriteria = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getRuleBookCriteria();
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setRuleBookCriteria(data));
  }
};
const getPieChartData = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getPieChartData(payload);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setPieChartData(data));
  }
};
const getprevioustestdata = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getprevioustestdata(payload);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setPreviousTestData(data));
  }
};
const getChapterData = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getChapterData(payload);

  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setChaptersData(data));
  }
};
const getPrPaperTestQuestionsData = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getPrPaperTestQuestionsData(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setPrePaperQuestionsData(data));
  }
};
const getPrePaperQuestionById = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getPrePaperQuestionById(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setPrePaperQuestionsDatabyid(data));
  }
};
const endTestapi = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.endTestapi(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setendtestdata(data));
  }
};
const validateAnswerapi = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.validateAnswer(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setValidateAnswer(data));
  }
};
const getsubjectivedata = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getsubjectivedata(payload);
  const method = 'GET';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setSubjectiveData(data));
  }
};
const getTestQuestionsData = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getTestQuestionsData(payload);
  const method = payload.method;
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setTestQuestionsData(response));
  }
};
const getQuestionByIdPractice = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getQuestionByIdPractice(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setTestQuestionDatabyid(data));
  }
};
const validateAnswerapiPractice = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.validateAnswerapiPractice(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setValidateAnswerPractice(data));
  }
};
const endTestapiPractice = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.endTestapiPractice(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setEndTesetdatapractice(data));
  }
};
const getsummaryreport = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getsummaryReport(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setSummaryDataPractice(data));
  }
};
const getassesmentsdatapractice = async (payload) => {
  const { myLearning } = apiEndPoints;
  const endpoint = myLearning.getassesmentsdatapractice(payload);
  const method = 'GET';
  const body = payload.data;
  const response = await makeApiCall(endpoint, method, body);

  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setassesmentDataPractice(data));
  }
};

export {
  getAssessmentSubjects,
  getsummaryreport,
  getassesmentsdatapractice,
  getQuestionByIdPractice,
  endTestapiPractice,
  getsubjectivedata,
  validateAnswerapiPractice,
  getPracticeChapters,
  getPreviousQuesPaperTypes,
  getQuestionPapers,
  getLeaderBoardData,
  getHeatMapData,
  getTopicsBySubjectId,
  getRuleBookCriteria,
  getPieChartData,
  getprevioustestdata,
  getChapterData,
  getPrPaperTestQuestionsData,
  getPrePaperQuestionById,
  endTestapi,
  validateAnswerapi,
  getTestQuestionsData,
  getreviewsolutionsPractice,
};
