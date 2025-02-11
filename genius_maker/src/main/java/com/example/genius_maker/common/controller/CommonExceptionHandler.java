package com.example.genius_maker.common.controller;

import com.example.genius_maker.common.controller.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler
    public ApiResponse<Void> handleException(final Exception e) {
        log.error(e.getMessage(), e);
        return ApiResponse.fail(e.getMessage());
    }
}
