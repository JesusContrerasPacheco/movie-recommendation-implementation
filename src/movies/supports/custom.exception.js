

class CustomException extends AppException {
  constructor(
    code,
    message,
    details,
    httpStatus,
    exception,
  ) {
    super(code, message);
    this.name = 'CustomException';
    this.code = code;
    this.success = false;
    this.message = message;
    if (details) this.details = details; // Detail Array

    this.httpStatus = httpStatus;
    if (exception) {
      Logger.error(exception);
    }
  }
}

module.exports = CustomException;
