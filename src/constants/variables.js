const apiEndPoints = {
  auth: {
    login: `/users/login`,
    register: `/users/new-registration`,
    logout: `/users/logout`,
    forgotPassword: `/users/forgot-password`,
    resetPassword: `/users/forgot-password/validate-otp`,
    generateOtp: (userId) => `/users/${userId}/validate-account/generate-otp`,
    verifyOtp: (userId) => `/users/${userId}/validate-web-account`,
    changePassword: '/users/change-password',
    updateProfile: (userId) => `/users/${userId}/update`,
    allUniversities: `/boards?offset=0&limit=1000`,
    allBranches: (boardId) => `/boards/${boardId}/grades?offset=0&limit=1000`,
    allSemesters: (universityId, branchId) =>
      `/boards/${universityId}/grades?offset=0&limit=1000`,
  },
  calender: {
    getschedulefiltered: (payload) => `/user-events/filtered`,
  },
  myCourses: {
    getSubjects: (userId) => `/analytics/users/${userId}/subjects`,
    getChapters: (userId) => `/analytics/users/${userId}/chapters`,
    getTopics: (userId) => `/analytics/users/${userId}/topics`,
    getGatePreviousQuestionPaperCountByTopic: (payload) =>
      `/gate/question-papers/${payload.semesterId}/${payload.subjectId}/${payload.chapterId}/questions/count`,
    getPreviousQuestionPaperByCount: (payload) =>
      `/question-papers/${payload.semesterId}/${payload.subjectId}/${payload.chapterId}/questions/count`,
    getActivities: (userId) => `/analytics/users/${userId}/activities`,
    getTestQuestionsData: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/test-questions?assignedActivityId=${payload.assignedActivityId}`,
    getQuestionById: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/test-questions/${payload.index}?assignedActivityId=${payload.assignedActivityId}&userTestId=${payload.testId}&questionId=${payload.questionId}`,
    validateAnswer: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/test-questions/${payload.index}/validate?assignedActivityId=${payload.assignedActivityId}`,
    endtest: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/tests/${payload.testId}/end?assignedActivityId=${payload.assignedActivityId}`,
    getsummaryReport: (payload) =>
      `/analytics/users/${payload.userId}/assessments/${payload.userTestId}/report?activityDimId=${payload.activityDimId}`,
    getQuestionByIdReattempt: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/test/re-attempt?assignedActivityId=${payload.assignedActivityId}`,
    getNotesActivityData: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}`,
    getNotesActivityDataProfe: (payload) =>
      `/activities/${payload.id}/activity-info/${payload.activityInfoId}`,
    addtocalender: (payload) => `/user-schedules`,
    getCalenderDataapi: (payload) =>
      `/user-schedules?userId=${payload.userId}&scheduleType=${payload.scheduleType}&scheduleTypeId=${payload.scheduleTypeId}`,
    addtocalenderPut: (payload) => `/user-schedules/${payload.id}`,
    getassesmentsdata: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/assessments`,
    updateanalyticsNotes: (payload) =>
      `/users/${payload.userId}/analytics/capture-activity`,
    getprofessorresources: (payload) =>
      `/topics/${payload.topicId}/activities?resourceType=Teacher`,
    getreviewsolutions: (payload) =>
      `/analytics/users/${payload.userId}/assessments/${payload.userTestId}/review-questions?activityDimId=${payload.activityDimId}`,
    //getrecommendedtopics: (payload = `/recommended-topics/${payload.topicId}`),
    getrecommendedtopics: (payload) => `/recommended-topics/${payload.topicId}`,
    getQuestionPaperByTopicIdRequest: (payload) =>
      `/question-papers/topics/${payload.topicId}/questions`,
    getGateQuestionPaperByTopicIdRequest: (payload) =>
      `/gate/question-papers/topics/${payload.topicId}/questions`,
    getrecommendedtopicActivities: (payload) =>
      `/recommended-topics/${payload.universalTopicId}/activities`,
    validatevideoquestiona: (payload) =>
      `analytics/users/${payload.userId}/activities/${payload.activityDimId}/videos/test-questions/${payload.questionId}/validate`,
    getvideoquestions: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/videos/test-questions?assignedActivityId=${payload.assignedActivityId}`,
    getAssessmentTestQuestionRequest: (payload) =>
      `/analytics/users/${payload.userId}/activities/${payload.activityDimId}/test-questions/${payload.index}?assignedActivityId=${payload.assignedActivityId}&userTestId=${payload.testId}&questionId=${payload.questionId}`,
    getVideoquestionsvideopro: (payload) =>
      `/activities/${payload.activityId}/video-questions`,
  },
  topicsinProgress: {
    getTopicsProgress: (userId) =>
      `/analytics/users/${userId}/inProgress-topics`,
  },

  myLearning: {
    getAssessmentSubjects: (userId) => `/analytics/users/${userId}/subjects`,
    // `/analytics/users/${userId}/assessment/subjects`,
    getPracticeChapters: (payload) =>
      `/boards/${payload.boardId}/subjects/${payload.subjectId}/practice-tests?userId=${payload.userId}`,
    getPreviousQuesPaperTypes: (userId) =>
      `/users/${userId}/questionPaperTypes`,
    getQuestionPapers: (userId) => `/users/${userId}/questionPapers`,
    getLeaderBoardData: (payload) =>
      `/users/${payload.userId}/leader-board?boardId=${payload.boardId}&schoolId=${payload.schoolId}&role=${payload.role}`,
    getHeatMapData: (userId, subjectId) =>
      `/subjects/${subjectId}/knowledge-map?userId=${userId}`,
    getTopicsBySubjectId: (payload) => `/subjects/${payload.subjectId}/topics`,
    getRuleBookCriteria: () => `/leader-board/rules`,
    getPieChartData: (payload) =>
      `/subjects/${payload.subjectId}/learning-analysis/averages?userId=${payload.userId}`,
    getprevioustestdata: (payload) =>
      `/boards/${payload.boardId}/subjects/${payload.subjectId}/practice-tests?userId=${payload.userId}`,
    getChapterData: (payload) =>
      `/subjects/${payload.subjectId}/learning-analysis?userId=${payload.userId}`,
    getPrPaperTestQuestionsData: (payload) =>
      `/users/${payload.userId}/questionPapers/${payload.questionPaperId}/user-tests`,
    getPrePaperQuestionById: (payload) =>
      `/users/${payload.userId}/questionPapers/${payload.questionPaperId}/user-tests/${payload.testId}/questions/${payload.index}?questionId=${payload.questionId}`,
    endTestapi: (payload) =>
      `/users/${payload.userId}/questionPapers/${payload.questionPaperId}/user-tests/${payload.testId}/end`,
    validateAnswer: (payload) =>
      `/users/${payload.userId}/questionPapers/${payload.data.previousQuestionPaperId}/user-tests/${payload.data.userTestId}/questions/${payload.data.questionId}/${payload.index}/validate`,
    getsubjectivedata: (payload) =>
      `/question-papers/${payload.questionPaperId}/subjective-questions`,
    getTestQuestionsData: (payload) => payload.url,
    getQuestionByIdPractice: (payload) => payload.url,
    validateAnswerapiPractice: (payload) => payload.url,
    endTestapiPractice: (payload) => payload.url,
    getassesmentsdatapractice: (payload) => payload.url,
    getsummaryReport: (payload) =>
      `/analytics/users/${payload.userId}/assessments/${payload.userTestId}/report?activityDimId=${undefined}`,
    getreviewsolutionsPractice: (payload) =>
      `/analytics/users/${payload.userId}/assessments/${
        payload.userTestId
      }/review-questions?activityDimId=${''}`,
  },
  referAndEarn: {
    getReferalCode: (payload) =>
      `/registration-invites/metrics?userId=${payload.userId}`,
    getRegisteredUsers: (payload) =>
      `/registration-invites/users/${payload.userId}`,
    getPayoutData: (payload) => `/payouts/users/${payload.userId}`,
    postPayouts: `/payouts`,
  },
  profile: {
    getUserData: (payload) => `/users/${payload.userId}`,
    updateProfile: (payload) => `/users/${payload.userId}/update`,
  },
  validatepackages: {
    validatepackages: (userId) => `/users/${userId}/subscription-status`,
    getsubjectpackages: (payload) => `/packages/${payload.branchId}/list`,
    activationapi: (payload) => `/packages/${payload.data.packageId}/payments`,
    promoCodeapi: (payload) =>
      `/promo-codes/${payload.promocode}/validate-usage`,
    paymentapi: (payload) => `/packages/${payload.packageId}/payments`,
    razorapyapi: (payload) => `/users/${payload.userId}/subscription-status`,
  },
  searchPage: {
    getSearchData: (payload) =>
      `/global-search?userId=${payload.userId}&searchValue=${payload.searchValue}`,

    getTopicDetails: (payload) =>
      `/boards/${payload.boardId}/grades/${payload.gradeId}/subjects/${payload.subjectId}/chapters/${payload.chapterId}/topics/${payload.topicId}`,
    getChapterDetails: (payload) =>
      `/boards/${payload.boardId}/grades/${payload.gradeId}/subjects/${payload.subjectId}/chapters/${payload.chapterId}`,
  },
};

export { apiEndPoints };
