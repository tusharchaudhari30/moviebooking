package com.moviebooking.moviebookingapp.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.moviebooking.moviebookingapp.exception.TokenValidationFailedException;
import com.moviebooking.moviebookingapp.exception.UserCustomException;
import com.moviebooking.moviebookingapp.model.dto.ExceptionMessage;

@ControllerAdvice
@Validated
public class CustomExceptionController {
    @ExceptionHandler(value = TokenValidationFailedException.class)
    public ResponseEntity<ExceptionMessage> exception(TokenValidationFailedException tokenValidationFailedException) {
        return new ResponseEntity<>(
                new ExceptionMessage(HttpStatus.UNAUTHORIZED, tokenValidationFailedException.getMessage()),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = UserCustomException.class)
    public ResponseEntity<ExceptionMessage> exception(UserCustomException userCustomException) {
        return new ResponseEntity<>(new ExceptionMessage(HttpStatus.UNAUTHORIZED, userCustomException.getMessage()),
                HttpStatus.UNAUTHORIZED);
    }
}
