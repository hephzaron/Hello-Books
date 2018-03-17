import axios from 'axios';

const { API_VERSION } = process.env;

axios.defaults.baseURL = `/api/${API_VERSION}`;

validURL = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g