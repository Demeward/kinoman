

export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  setComments(comments) {
    this._comments = comments;
    this._callHandlers(this._dataChangeHandlers);
  }

  getComments() {
    return this._comments;
  }

  setRemoveComment(id) {
    const index = this._comments.findIndex((currentComment) => currentComment.id === (id * 1));

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(comment) {
    this._comments = [].concat(this._comments, comment.getComment());

    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
