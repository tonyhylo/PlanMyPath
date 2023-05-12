// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from './send-request';
const BASE_URL = '/api/mypaths';
// const BASE_URL = 'mongodb://localhost/planmypath'

  // const newPath = Mypath.create({country: 'Canada', description: 'true north', tags: 'north', itinerary: 'depart airport'}).then((result) => console.log(result)).catch((e) => console.log(e))

export function getAll() {
  return sendRequest(BASE_URL);
}

export function create(payload) {
  return sendRequest(`${BASE_URL}`,"POST",payload);
}

export function edit(payload) {
  return sendRequest(`${BASE_URL}/${payload._id}`,"PUT",payload);
}

export function deletePath(payload) {
  return sendRequest(`${BASE_URL}/${payload}/delete`,"DELETE");
}

// Won't be used in SEI CAFE, but demonstrates
// what you might need if you have a, for example,
// a MovieDetailPage component
export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
