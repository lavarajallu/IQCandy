// content.js

export const textContent = {
  buttonLabels: {
    getStarted: 'GET STARTED',
  },
  introductionTitle: 'Join IQ Candy and learn Online',
  introductionDescription:
    'IQ Candy is an interesting platform that will teach you in more an interactive way.',
  // Add more text variables as needed
  homeScreenData: {
    data: [
      // Add your data items here
      {
        id: '1',
        text: 'Problem and Solving Programming',
        imageUrl: require('../../assets/images/flist/first.png'),
        progressPercentage: '50',
      },
      {
        id: '2',
        text: 'Mathematics One',
        imageUrl: require('../../assets/images/flist/second.png'),
        progressPercentage: '80',
      },
      {
        id: '3',
        text: 'Allu Lavaraju Technology',
        imageUrl: require('../../assets/images/flist/first.png'),
        progressPercentage: '90',
      },
      {
        id: '4',
        text: 'Mathematics I',
        imageUrl: require('../../assets/images/flist/second.png'),
        progressPercentage: '80',
      },
      {
        id: '5',
        text: 'Javascript Technology',
        imageUrl: require('../../assets/images/flist/first.png'),
        progressPercentage: '90',
      },
      {
        id: '6',
        text: 'GoLang Technology',
        imageUrl: require('../../assets/images/flist/second.png'),
        progressPercentage: '48',
      },
    ],
  },

  chaptersData: {
    chaptersList: [
      {
        id: 1,
        title: 'Introduction to Computers',
        image: require('../../assets/images/chapters/first.png'),
        progress: '80',
      },
      {
        id: 2,
        title: 'Constants and Variables',
        image: require('../../assets/images/chapters/second.png'),
        progress: '50',
      },
      {
        id: 3,
        title: 'Arrays and Strings',
        image: require('../../assets/images/chapters/third.png'),
        progress: '70',
      },
      {
        id: 4,
        title: 'Pointers and Structures',
        image: require('../../assets/images/chapters/fourth.png'),
        progress: '60',
      },
      {
        id: 5,
        title: 'Modular Programming',
        image: require('../../assets/images/chapters/fifth.png'),
        progress: '90',
      },
      {
        id: 6,
        title: 'Programmes',
        image: require('../../assets/images/chapters/sixth.png'),
        progress: '45',
      },

      // ... add more data as needed
    ],
  },

  activityResourcesData: {
    resourcesList: [
      {
        id: 1,
        title: 'Pre Assessment',
        image: require('../../assets/images/activityresources/pre_assignment.jpg'),
        type: 'pre',
        questions: 5,
      },
      {
        id: 2,
        title: 'Notes',
        image: require('../../assets/images/activityresources/notes.jpg'),
        type: 'notes',
        refLink: 1,
      },
      {
        id: 3,
        title: 'Videos',
        image: require('../../assets/images/activityresources/video.png'),
        type: 'video',
        no_of_videos: 1,
        duration: '6:19',
      },
      {
        id: 4,
        title: 'Post Assessment',
        image: require('../../assets/images/activityresources/post_assignment.jpg'),
        type: 'post',
        questions: 5,
      },
    ],
  },

  questions: [
    {
      question:
        'Which of the following is not a valid variable name declaration?',
      options: ['hyd', 'Teadd', 'Rajaa', 'Mole'],
      correctAnswer: 1, // Index of the correct answer
    },
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 2,
    },
    {
      question:
        'Which programming language is known for its use in web development?',
      options: ['Java', 'Python', 'JavaScript', 'C++'],
      correctAnswer: 2,
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
      correctAnswer: 1,
    },
    {
      question: 'In which year did the Titanic sink?',
      options: ['1905', '1912', '1920', '1931'],
      correctAnswer: 1,
    },
    // Add more questions as needed
  ],

  labelsList: [
    {
      name: 'Poor',
      labelColor: '#c44921',
      activeBarColor: '#c44921',
    },
    
    {
      name: 'Average',
      labelColor: '#d88414',
      activeBarColor: '#d88414',
    },
    {
      name: 'Good',
      labelColor: '#a3ba6d',
      activeBarColor: '#a3ba6d',
    },
    {
      name: 'Excellent',
      labelColor: '#016313',
      activeBarColor: '#016313',
    },
  ],
  learningData: [
    {
      id: 1,
      progress: '80',
      title: 'My Practice',
      description: 'Role Readiness Score',
      type: 'my_practice',
      image_uri: require('../../assets/images/my_learning/practice.png'),
      color: '#d88212',
    },
    {
      id: 2,
      progress: '30',
      title: 'Learning Overview',
      description: 'Role Readiness Score',
      type: 'learning_analysis',
      image_uri: require('../../assets/images/my_learning/learning_analysis.png'),
      color: '#f94d48',
    },
    {
      id: 3,
      progress: '50',
      title: 'Knowledge Map',
      description: 'Role Readiness Score',
      type: 'knowledge_map',
      image_uri: require('../../assets/images/my_learning/heatmap.png'),
      color: '#277292',
    },
    {
      id: 4,
      progress: '40',
      title: 'Leader Board',
      description: 'Role Readiness Score',
      type: 'leader_board',
      image_uri: require('../../assets/images/my_learning/leader_board.png'),
      color: '#924ad4',
    },
  ],

  questionPapersData: [
    {
      id: 1,
      paper_code: '15CIVI13Jan17',
      image: require('../../assets/images/activityresources/video.png'),
    },
    {
      id: 2,
      paper_code: 'RT21053SET3',
      image: require('../../assets/images/activityresources/video.png'),
    },
    {
      id: 3,
      paper_code: 'R19ES1101Jan20set1',
      image: require('../../assets/images/activityresources/video.png'),
    },
    {
      id: 4,
      paper_code: 'R19BS1102Jan20set1',
      image: require('../../assets/images/activityresources/video.png'),
    },
    {
      id: 5,
      paper_code: 'R1621052Nov18set1',
      image: require('../../assets/images/activityresources/video.png'),
    },
    {
      id: 6,
      paper_code: 'RT21053SET4',
      image: require('../../assets/images/activityresources/video.png'),
    },
    {
      id: 7,
      paper_code: 'RT21053SET2',
      image: require('../../assets/images/activityresources/video.png'),
    },
    {
      id: 8,
      paper_code: 'RT21053SET0',
      image: require('../../assets/images/activityresources/video.png'),
    },
  ],
  subjectsList: [
    { label: 'MATHEMATICS - I', value: '1' },
    { label: 'MATHEMATICS - II', value: '2' },
    { label: 'OPERATING SYSTEMS', value: '3' },
    { label: 'OBJECT ORIENTED PROGRAMMING LANGUAGE', value: '4' },
    { label: 'C LANGUAGE', value: '5' },
    { label: 'PYTHON', value: '6' },
    { label: 'ELECTRICAL SYSTEMS', value: '7' },
    { label: 'POWER MANAGEMENT SYSTEM', value: '8' },
  ],
  genderList: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'others', label: 'Others' },
  ],
  indiaStates: [
    { value: 'AP', label: 'Andhra Pradesh' },
    { value: 'AN', label: 'Andaman and Nicobar Islands' },
    { value: 'AR', label: 'Arunachal Pradesh' },
    { value: 'AS', label: 'Assam' },
    { value: 'BR', label: 'Bihar' },
    { value: 'CG', label: 'Chandigarh' },
    { value: 'CH', label: 'Chhattisgarh' },
    { value: 'DH', label: 'Dadra and Nagar Haveli' },
    { value: 'DD', label: 'Daman and Diu' },
    { value: 'DL', label: 'Delhi' },
    { value: 'GA', label: 'Goa' },
    { value: 'GJ', label: 'Gujarat' },
    { value: 'HR', label: 'Haryana' },
    { value: 'HP', label: 'Himachal Pradesh' },
    { value: 'JK', label: 'Jammu and Kashmir' },
    { value: 'JH', label: 'Jharkhand' },
    { value: 'KA', label: 'Karnataka' },
    { value: 'KL', label: 'Kerala' },
    { value: 'LD', label: 'Lakshadweep' },
    { value: 'MP', label: 'Madhya Pradesh' },
    { value: 'MH', label: 'Maharashtra' },
    { value: 'MN', label: 'Manipur' },
    { value: 'ML', label: 'Meghalaya' },
    { value: 'MZ', label: 'Mizoram' },
    { value: 'NL', label: 'Nagaland' },
    { value: 'OR', label: 'Odisha' },
    { value: 'PY', label: 'Puducherry' },
    { value: 'PB', label: 'Punjab' },
    { value: 'RJ', label: 'Rajasthan' },
    { value: 'SK', label: 'Sikkim' },
    { value: 'TN', label: 'Tamil Nadu' },
    { value: 'TS', label: 'Telangana' },
    { value: 'TR', label: 'Tripura' },
    { value: 'UK', label: 'Uttarakhand' },
    { value: 'UP', label: 'Uttar Pradesh' },
    { value: 'WB', label: 'West Bengal' },
  ],

  knowledgeMap: {
    bulletItems: [
      {
        icon: 'radio-button-on-outline',
        text: 'NOT STARTED',
        color: 'grey',
      },
      {
        icon: 'radio-button-on-outline',
        text: 'SCORE 0-40%',
        color: '#e60800',
      },
      {
        icon: 'radio-button-on-outline',
        text: 'SCORE 40-60%',
        color: 'rgb(246, 70, 5)',
      },
      {
        icon: 'radio-button-on-outline',
        text: 'SCORE 60-80%',
        color: '#77e63b',
      },
      {
        icon: 'radio-button-on-outline',
        text: 'SCORE ABOVE 80%',
        color: '#01460e',
      },
    ],
    data: [
      // Gray (0-10%)
      {
        id: 1,
        title: 'Rectilinear Motion of a Particle with Uniform Acceleration',
        percentage: 5,
        color: '#F2F2F2',
      },
      { id: 2, title: 'System of Focus', percentage: 8, color: '#F2F2F2' },
      {
        id: 3,
        title: 'Centroid for Central of Gravity',
        percentage: 10,
        color: '#F2F2F2',
      },
      { id: 20, title: 'System of Focus', percentage: 10, color: '#F2F2F2' },

      // Green (10-40%)
      {
        id: 4,
        title: 'Item 4',
        percentage: 15,
        color: '#C4EDFF',
        textColor: '#0074A5',
      },
      {
        id: 5,
        title: 'Item 5',
        percentage: 20,
        color: '#C4EDFF',
        textColor: '#0074A5',
      },
      {
        id: 6,
        title: 'Item 6',
        percentage: 30,
        color: '#C4EDFF',
        textColor: '#0074A5',
      },
      {
        id: 7,
        title: 'Item 7',
        percentage: 40,
        color: '#C4EDFF',
        textColor: '#0074A5',
      },

      // Red (40-60%)
      {
        id: 8,
        title: 'Item 8',
        percentage: 45,
        color: '#EEC7FF',
        textColor: '#B03AE1',
      },
      {
        id: 9,
        title: 'Item 9',
        percentage: 50,
        color: '#EEC7FF',
        textColor: '#B03AE1',
      },
      {
        id: 10,
        title: 'Item 10',
        percentage: 55,
        color: '#EEC7FF',
        textColor: '#B03AE1',
      },
      {
        id: 11,
        title: 'Item 11',
        percentage: 60,
        color: '#EEC7FF',
        textColor: '#B03AE1',
      },

      // Orange (60-80%)
      {
        id: 12,
        title: 'Item 12',
        percentage: 65,
        textColor: '#77BF1C',
        color: '#E4FFC3',
      },
      {
        id: 13,
        title: 'Item 13',
        percentage: 70,
        textColor: '#77BF1C',
        color: '#E4FFC3',
      },
      {
        id: 14,
        title: 'Item 14',
        percentage: 75,
        textColor: '#77BF1C',
        color: '#E4FFC3',
      },
      {
        id: 15,
        title: 'Item 15',
        percentage: 80,
        textColor: '#77BF1C',
        color: '#E4FFC3',
      },

      // Blue (80% and above)
      {
        id: 16,
        title: 'Item 16',
        percentage: 85,
        color: '#FEDCBD',
        textColor: '#D78234',
      },
      {
        id: 17,
        title: 'Item 17',
        percentage: 90,
        color: '#FEDCBD',
        textColor: '#D78234',
      },
      {
        id: 18,
        title: 'Item 18',
        percentage: 95,
        color: '#FEDCBD',
        textColor: '#D78234',
      },
      {
        id: 19,
        title: 'Item 19',
        percentage: 100,
        color: '#FEDCBD',
        textColor: '#D78234',
      },
    ],
  },
};
