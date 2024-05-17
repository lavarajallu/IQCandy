// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const myLearningSlice = createSlice({
  name: 'myLearning',
  initialState: {
    subjectsInfo: {},
    chapertsInfo: {},
    previousQuesPaperTypes: {},
    questionPapers: {},
    leaderBoardData: {},
    heatMapData: [],
    topicsBySubject: {},
    rulBookCriteria: {},
    pieChartData: {},
    previousTestData: {},
    chapterData: {},
    prepaerQuestionsData: {},
    prepaerQuestionbyid: {},
    endtestdata: {},
    validatedanswer: {},
    subjectiveData: {},
    loading: false,
    testQuestionsData: {},
    questionDatabyId: {},
    validateanswerpractice: {},
    endTesetdatapractice: {},
    summaryDataPractice: {},
    assesmentDataPractice: {},
    practiceSolutionsData: {},
  },
  reducers: {
    setSubjectsInfo: (state, action) => {
      state.subjectsInfo = action.payload;
    },
    setChapertsInfo: (state, action) => {
      state.chapertsInfo = action.payload;
    },
    setPreviousQuesPaperTypes: (state, action) => {
      state.previousQuesPaperTypes = action.payload;
    },
    setQuestionPapers: (state, action) => {
      state.questionPapers = action.payload;
    },
    setLeaderBoardData: (state, action) => {
      state.leaderBoardData = action.payload;
    },
    setHeatMapData: (state, action) => {
      state.heatMapData = action.payload;
    },
    setSolutionsPractice: (state, action) => {
      state.practiceSolutionsData = action.payload;
    },
    setTopicsBySubject: (state, action) => {
      state.topicsBySubject = action.payload;
    },
    setRuleBookCriteria: (state, action) => {
      state.rulBookCriteria = action.payload;
    },
    setPieChartData: (state, action) => {
      state.pieChartData = action.payload;
    },
    setPreviousTestData: (state, action) => {
      state.previousTestData = action.payload;
    },
    setChaptersData: (state, action) => {
      state.chapterData = action.payload;
    },
    setPrePaperQuestionsData: (state, action) => {
      state.prepaerQuestionsData = action.payload;
    },
    setPrePaperQuestionsDatabyid: (state, action) => {
      state.prepaerQuestionbyid = action.payload;
    },
    setendtestdata: (state, action) => {
      state.endtestdata = action.payload;
    },
    setValidateAnswer: (state, action) => {
      state.validatedanswer = action.payload;
    },
    setSubjectiveData: (state, action) => {
      state.subjectiveData = action.payload;
    },
    setTestQuestionsData: (state, action) => {
      state.testQuestionsData = action.payload;
    },
    setTestQuestionDatabyid: (state, action) => {
      state.questionDatabyId = action.payload;
    },
    setValidateAnswerPractice: (state, action) => {
      state.validateanswerpractice = action.payload;
    },
    setEndTesetdatapractice: (state, action) => {
      state.endTesetdatapractice = action.payload;
    },
    setSummaryDataPractice: (state, action) => {
      state.summaryDataPractice = action.payload;
    },
    setassesmentDataPractice: (state, action) => {
      state.assesmentDataPractice = action.payload;
    },
  },
});

export const {
  setassesmentDataPractice,
  setTestQuestionsData,
  setEndTesetdatapractice,
  setSubjectsInfo,
  setValidateAnswerPractice,
  setChapertsInfo,
  setPreviousQuesPaperTypes,
  setQuestionPapers,
  setLeaderBoardData,
  setHeatMapData,
  setTopicsBySubject,
  setSubjectiveData,
  setRuleBookCriteria,
  setPieChartData,
  setPrePaperQuestionsData,
  setPreviousTestData,
  setChaptersData,
  setendtestdata,
  setTestQuestionDatabyid,
  setSummaryDataPractice,
  setSolutionsPractice,
} = myLearningSlice.actions;
export default myLearningSlice.reducer;
