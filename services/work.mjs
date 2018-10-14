export default class work {
  resolves() {
    return Promise.resolve('worked');
  }
  rejects() {
    return Promise.reject('rejecting');
  }
  throws() {
    throw new Error('throwing');
  }
}
