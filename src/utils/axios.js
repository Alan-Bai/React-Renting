import axios from 'axios';

import {
    Component
} from 'react'

import {
    BASEURL
} from './url';
axios.defaults.baseURL = BASEURL
Component.prototype.$axios = axios;