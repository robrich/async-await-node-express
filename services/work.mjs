export default class work {
  resolves() {
    return Promise.resolve('resolved');
  }
  async awaits() {
    await Promise.resolve('awaited');
  }
  rejects() {
    return Promise.reject('rejecting');
  }
  throws() {
    throw new Error('throwing');
  }
}
