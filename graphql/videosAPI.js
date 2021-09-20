import axios from 'axios';
class VideoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://strapi-joking-on-backend.onrender.com/";
  }

  async findVideos(video) {
    return axios.get(
      `${this.baseURL}videos/${video.id}` // path
    );
  }

  // an example making an HTTP POST request
  async postVideo(video) {
    return axios.post(
      `videos`, // path
      video // request body
    );
  }

  // an example making an HTTP PUT request
  async newVideo(video) {
    return axios.post(
      `${this.baseURL}videos/`, // path
      video // request body
    );
  }

  // an example making an HTTP PATCH request
  async updateVideo(video) {
    return axios.put(
      `${this.baseURL}videos/${video.id}`, // path
      video // request body
    );
  }

  // an example making an HTTP DELETE request
  async deleteVideo(video) {
    return axios.delete(
      `video/${video.id}` // path
    );
  }
}
