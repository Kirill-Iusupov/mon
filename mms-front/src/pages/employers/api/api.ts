import axios from 'axios';

export const getPersonal = async () => {
  let response;

  try {
    response = await axios.get('http://localhost:5000/mms/api/personal');
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response?.data;
};
