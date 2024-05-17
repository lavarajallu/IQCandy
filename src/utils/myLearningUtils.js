//myLearningUtils

export const navigateToScreen = (type) => {
  switch (type) {
    case 'my_practice':
      return 'MyPractice';
    case 'learning_analysis':
      return 'LearningAnalysis';
    case 'leader_board':
      return 'LeaderBoard';
    case 'knowledge_map':
      return 'KnowledgeMap';
    case 'prev_question_papers':
      return 'PreviousQuestionPapers';
    default:
      return null;
  }
};
