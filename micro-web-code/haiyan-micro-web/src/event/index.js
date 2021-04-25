export class Custom {
  constructor() {
  }
  on(eventName, cb) {
    window.addEventListener(eventName, function(e) {
      cb(e.detail)
    });
  }
  emit(eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data
    })
    window.dispatchEvent(event);
  }
}
