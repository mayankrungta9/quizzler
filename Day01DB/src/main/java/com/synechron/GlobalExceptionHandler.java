package com.synechron;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(PersonNotFoundException.class)
	public ResponseEntity<String> handlePersonNotFoundException(PersonNotFoundException ex, 
			WebRequest webRequest) {
		String message = "Person not found for " + ex.getMessage();
		message += ", " + webRequest.getDescription(false);
		return new ResponseEntity<String>(message, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException ex, 
			WebRequest webRequest) {
		String message = "Error: " + ex.getMessage();
		message += ", " + webRequest.getDescription(false);
		return new ResponseEntity<String>(message, HttpStatus.NOT_ACCEPTABLE);
	}
}
