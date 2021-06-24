
class Store {
  constructor(callback, initialState) {
    if (typeof callback !== 'function') {
      throw Error('You should put a function reducer')
    }
    // this.initialState = null;
    this.callback = callback;
    this.action = false;
    this.state = callback(initialState, this.action);
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    if (action.type) {
      this.state = this.callback(this.state, action);
      this.subscribers.forEach((subscribe) => subscribe(this.state))
    } else {
      throw Error("Action should be has type");
    }
  }

  subscribe(listener) {
    this.subscribers.push(listener)
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== listener);
    }
  }
}

export default Store;