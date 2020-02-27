package com.synechron.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(value = QuestionAlreadyReported.class)
	public ResponseEntity<String> exception(QuestionAlreadyReported exception) {
		return new ResponseEntity<String>("Question Already reported", HttpStatus.ALREADY_REPORTED);
	}
}
