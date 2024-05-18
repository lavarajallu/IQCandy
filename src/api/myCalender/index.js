import { apiEndPoints } from '../../constants/variables';
import { makeApiCall } from '../axios';
import { setschedulefiltered } from '../../store/student/myCalender/slice';

const getschedulefiltered = async (payload) => {
  const { calender } = apiEndPoints;
  const endpoint = calender.getschedulefiltered(payload);
  const method = 'POST';
  const body = payload.data;

  const response = await makeApiCall(endpoint, method, body);
  // Check for success and handle accordingly
  if (response) {
    const { data } = response;
    payload.dispatch(setschedulefiltered(data));
  }
};

export { getschedulefiltered };
