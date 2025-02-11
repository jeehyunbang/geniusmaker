package com.example.genius_maker.common.controller.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
public class ApiResponse<T> {

    private final String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final T data;

    public static ApiResponse<Void> success(final String message) {
        return new ApiResponse<>(message, null);
    }

    public static <T> ApiResponse<T> successWithData(final String message, final T data) {
        return new ApiResponse<>(message, data);
    }

    public static ApiResponse<Void> fail(final String message) {
        return new ApiResponse<>(message, null);
    }

    public ApiResponse(final String message, final T data) {
        this.message = message;
        this.data = data;
    }
}
