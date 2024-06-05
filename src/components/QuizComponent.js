import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import { getAlphabetLetter, formatTime } from '../utils/questionUtils';
import CustomButton from './CustomButton';
import i18n from '../i18n';

const QuizComponent = ({
  questions,
  submitQuestions,
  seconds,
  secondsTimer,
  currentQuestionData,
  newquestionid,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(currentQuestionData);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [examStarted, setExamStarted] = useState(false);

  const handleStartExam = () => {
    setExamStarted(true);
    //setTimerRunning(true);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // if (currentQuestion < questions.length - 1) {
    //   setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    //   setSelectedAnswer(null);
    // }
  };

  const handlePrevQuestion = () => {
    // if (currentQuestion > 0) {
    //   setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    //   setSelectedAnswer(null);
    // }
  };

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text
          style={styles.questionCounter}
        >{`Question ${newquestionid} of ${questions?.length}`}</Text>

        <View style={styles.timerRow}>
          <Ionicons name='timer' size={20} color={COLORS.whiteColor} />
          <Text style={styles.timer}>{`${formatTime(seconds)}`}</Text>
        </View>
      </View>

      <>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>

        <ScrollView style={styles.optionsScrollView}>
          {currentQuestion?.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswerSelection(index)}
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    selectedAnswer === index
                      ? COLORS.coursesColor
                      : COLORS.lightWhite,
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      selectedAnswer === index
                        ? COLORS.whiteColor
                        : COLORS.tabBarLabelInactiveColor,
                  },
                ]}
              >{`${getAlphabetLetter(index)}. ${option}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {newquestionid > 0 && (
            <CustomButton
              title={i18n.t('previous')}
              onPress={handlePrevQuestion}
              color={COLORS.previousButtonColor}
            />
          )}
          {newquestionid < questions.length - 1 && (
            <CustomButton
              title={i18n.t('next')}
              onPress={handleNextQuestion}
              disabled={selectedAnswer === null}
              color={COLORS.nextButtonColor}
            />
          )}
          {newquestionid === questions.length - 1 && (
            <CustomButton
              title={i18n.t('submit')}
              onPress={handleSubmit}
              color={COLORS.submitButtonColor}
            />
          )}
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'mulish-medium',
    color: COLORS.black,
  },
  timer: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.black,
  },
  optionsScrollView: {
    flex: 1,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'mulish-bold',
    color: COLORS.tabBarLabelInactiveColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  timerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.coursesColor,
    padding: 6,
    borderRadius: 5,
  },
});

export default QuizComponent;
