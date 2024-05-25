// coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';

var myCoursesSlice = createSlice({
  name: 'myCourses',
  initialState: {
    subjects: {},
    chapters: {},
    topics: {},
    activities: {},
    testQuestionsData: {},
    questionDatabyId: {},
    validatedanswer: {},
    questionDatabyIdreattempt: {},
    summaryData: {},
    endtestdata: {},
    notesActivityData: {},
    calenderData: {},
    getcalenderdata: {},
    getassesmenttests: {},
    videoActivityData: {},
    getupdateanalyticsNotes: {},
    PreviousQuestionPaperByCount: {},
    Profactivities: {},
    reviewsolquestions: {},
    recommendedtopics: {},
    GatePreviousQuestionPaperByCount:{},
    QuestionPaperByTopicIdRequest:{},
    GateQuestionPaperByTopicIdRequests:{},
    notesActivityDataProf:{},
    videoActivityDataPro:{},
    recommtopicActivities:{},
    ytvideoActivityData:{},
    validatevideoquestiona:{},
    videoquestionsdata:[],
    Videoquestionassesdata:{},
    Videoquestionsvideopro:{}
  },
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setreviewsolutions: (state, action) => {
      state.reviewsolquestions = action.payload;
    },
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setvideoquestionsdata: (state, action) => {
      state.videoquestionsdata = action.payload;
      state.Videoquestionassesdata = {};
    },
    setrecommendedTopics: (state, action) => {
      state.recommendedtopics = action.payload;
    },
    setPreviousQuestionPaperByCount: (state, action) => {
      state.PreviousQuestionPaperByCount = action.payload;
    },
    setGatePreviousQuestionPaperByCount: (state, action) => {
      state.GatePreviousQuestionPaperByCount = action.payload;
    },
    setvideoquestionassesdata:(state, action) => {
      state.Videoquestionassesdata = action.payload;
    },
    setvalidatevideoquestiona:(state, action) => {
      state.validatevideoquestiona = action.payload;
    },
    setgetcalenderdataapi: (state, action) => {
      state.getcalenderdata = action.payload;
      state.calenderData = {};
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
    setProfActivities: (state, action) => {
      state.Profactivities = action.payload;
    },
    setVideoquestionsvideopro:(state, action) => {
      state.Videoquestionsvideopro = action.payload;
    },
    setrecommtopicActivities: (state, action) => {
      state.recommtopicActivities = action.payload;
    },
    setCalenderData: (state, action) => {
      state.calenderData = action.payload;
    },
    setaddtocalenderPut: (state, action) => {
      state.calenderData = action.payload;
    },
    setTestQuestionsData: (state, action) => {
      state.testQuestionsData = action.payload;
    },
    setQuestionById: (state, action) => {
      state.questionDatabyId = action.payload;
    },
    setValidateAnswer: (state, action) => {
      state.validatedanswer = action.payload;
    },
    setendtest: (state, action) => {
      state.endtestdata = action.payload;
      state.questionDatabyId = {};
      state.questionDatabyIdreattempt = {};
      state.testQuestionsData = {};
    },
    setSummaryData: (state, action) => {
      state.summaryData = action.payload;
    },
    setQuestionByIdReattempt: (state, action) => {
      state.questionDatabyIdreattempt = action.payload;
    },
    setNotestActivitydata: (state, action) => {
      state.notesActivityData = action.payload;
    },
    setNotestActivitydataProf: (state, action) => {
      state.notesActivityDataProf = action.payload;
      state.videoActivityDataPro = {};

    },
    setvideoActivitydata: (state, action) => {
      state.videoActivityData = action.payload;
      state.notesActivityDataProf = {}
    },
    setytvideoActivitydata: (state, action) => {
      state.ytvideoActivityData = action.payload;
      state.notesActivityDataProf = {}
    },
    setvideoActivitydataPro: (state, action) => {
      state.videoActivityDataPro = action.payload;
      state.notesActivityDataProf = {}
    },
    setgetassesmentsdata: (state, action) => {
      state.getassesmenttests = action.payload;
    },
    setupdateanalyticsNotes: (state, action) => {
      state.getupdateanalyticsNotes = action.payload;
      state. videoquestionsdata = []
      state.Videoquestionassesdata ={}
    },
    setQuestionPaperByTopicIdRequest: (state, action) => {
      state.QuestionPaperByTopicIdRequest = action.payload;
    },
    setGateQuestionPaperByTopicIdRequests: (state, action) => {
      state.GateQuestionPaperByTopicIdRequests = action.payload;
    },
  },
});

export const {
  setQuestionPaperByTopicIdRequest,
  setGateQuestionPaperByTopicIdRequests,
  setSubjects,
  setChapters,
  setTopics,
  setProfActivities,
  setPreviousQuestionPaperByCount,
  setGatePreviousQuestionPaperByCount,
  setvideoActivitydata,
  setActivities,
  setQuestionById,
  setTestQuestionsData,
  setrecommtopicActivities,
  setValidateAnswer,
  setendtest,
  setSummaryData,
  setNotestActivitydata,
  setQuestionByIdReattempt,
  setCalenderData,
  setvideoquestionassesdata,
  setaddtocalenderPut,
  setgetcalenderdataapi,
  setupdateanalyticsNotes,
  setgetassesmentsdata,
  setreviewsolutions,
  setrecommendedTopics,
  setNotestActivitydataProf,
  setvideoActivitydataPro,
  setvideoquestionsdata,
  setytvideoActivitydata,
  setVideoquestionsvideopro
} = myCoursesSlice.actions;
export default myCoursesSlice.reducer;
