import axios from 'axios';
import React from 'react'

const axiosPublic = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials:true,
  });
const useAxiosPublic = () => {
  return axiosPublic;
}

export default useAxiosPublic