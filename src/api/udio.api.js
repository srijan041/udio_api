import { asyncHandler } from "../utils/AsyncHandler.js";
import axios from 'axios';
import { BASE_URL, COOKIE } from '../constants.js';
import fs from "fs"

axios.defaults.withCredentials = true;




function getHeaders(get_request = false) {
  if (get_request) {
    return {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
      'Cookie': `${COOKIE}`,
      "Origin": "https://www.udio.com",
      "Referer": "https://www.udio.com/my-creations",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty"

    }
  }
  else {
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Cookie': `${COOKIE}`,
      "Origin": "https://www.udio.com",
      "Referer": "https://www.udio.com/my-creations",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "sec-ch-ua": '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',

    }
  }
}

const get_upload_url = async () => {
  try {
    const headers = getHeaders()
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers,
    })
    const response = await axiosInstance.get('audio?contentType=audio%2Fmpeg&ext=mp3')

    return response.data.url
  }
  catch (error) {
    return error
  }
}

let media_url = ''

const upload_media = asyncHandler(async (req, res) => {

  const { text } = req.body
  const data_path = req.file.path
  // console.log(req.file);
  const fileData = fs.readFileSync(data_path);

  const formData = new FormData();
  formData.append("data",fileData)

  // console.log(data_path);

  try {
    let headers = {
      "Accept":
        "*/*",
      "Accept-Encoding":
        "gzip, deflate, br, zstd",
      "Accept-Language":
        "en-GB,en-US;q=0.9,en;q=0.8",
      "Access-Control-Request-Headers":
        "content-type,x-goog-content-length-range",
      "Access-Control-Request-Method":
        "PUT",
      "Connection":
        "keep-alive",
      "Host":
        "storage.googleapis.com",
      "Origin":
        "https://www.udio.com",
      "Referer":
        "https://www.udio.com/",
      "Sec-Fetch-Dest":
        "empty",
      "Sec-Fetch-Mode":
        "cors",
      "Sec-Fetch-Site":
        "cross-site",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",

    }
    let axiosInstance = axios.create({
      headers,
    })
    media_url = await get_upload_url()
    console.log(media_url);

    const url_response = await axiosInstance.options(media_url)
    console.log(url_response.status);
    if (url_response.status === 200) {
      headers = {
        "set-method": "PUT",
        "Accept":
          "application/json, text/plain, */*",
        "Accept-Encoding":
          "gzip, deflate, br, zstd",
        "Accept-Language":
          "en-GB,en-US;q=0.9,en;q=0.8",
        "Connection":
          "keep-alive",
        "Content-Length":
          `${fileData.length}`,
        "Content-Type":
          "audio/mpeg",
        "Host":
          "storage.googleapis.com",
        "Origin":
          "https://www.udio.com",
        "Referer":
          "https://www.udio.com/",
        "sec-ch-ua":
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile":
          "?0",
        "sec-ch-ua-platform":
          '"Linux"',
        "Sec-Fetch-Dest":
          "empty",
        "Sec-Fetch-Mode":
          "cors",
        "Sec-Fetch-Site":
          "cross-site",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "X-Client-Data":
          "CJWAywE=",
        "x-goog-content-length-range":
          "0,26214400"
      }

      axiosInstance = axios.create({ headers, })
      

      const response = await axiosInstance.post(url, formData)
      console.log(response.status);

      res.status(200).json(response.status, url_response.data)
    }
  }
  catch (error) {
    return error
  }
})



const upload_music = asyncHandler(async (req, res) => {
  const user_id = await getUser()
  console.log(user_id);
  try{

  }
  catch(error){
    res.status(500).json(error)
  }

  
})

const getUser = asyncHandler(async (req, res) => {
  try {
    const headers = getHeaders(true)
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers,
    })

    const response = await axiosInstance.get('/users/current')
    // console.log(response);

    res.status(200).json(response.data)
    return response.data.user.id
  }
  catch (error) {
    console.error(error);
  }

})

const postTrack = asyncHandler(async (req, res) => {
  const timestamp = Date.now()
  try {
    const response = await axiosInstance.post(`/mp/track?verbose=1&ip=1&_=${timestamp}`, req.body)
    res.status(200).json(response.data)
  }
  catch (error) {
    res.status(500).json(error)
  }
})


export {
  postTrack,
  get_upload_url,
  getUser,
  upload_music,
  upload_media,
}
