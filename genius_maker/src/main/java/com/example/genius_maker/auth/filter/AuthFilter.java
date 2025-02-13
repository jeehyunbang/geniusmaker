package com.example.genius_maker.auth.filter;

import com.example.genius_maker.auth.service.JwtHandler;
import com.example.genius_maker.common.controller.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class AuthFilter implements Filter {

    private static final List<String> WHITE_LIST = List.of(
        "/api/members/private-register",
        "/api/members/conference-register",
        "/api/members/login",
        "/api/s3/upload"
    );

    private final ObjectMapper objectMapper;
    private final JwtHandler jwtHandler;

    @Override
    public void doFilter(
        final ServletRequest servletRequest,
        final ServletResponse servletResponse,
        final FilterChain filterChain
    ) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (checkWhiteList(request)) {
            log.info("로그인이 필요없는 서비스 - {}", request.getRequestURI());
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        final String bearerToken = request.getHeader("Authorization");
        if (bearerToken == null || bearerToken.isBlank()) {
            log.error("인증 토큰이 헤더에 포함되어 있지 않음. - {}", request.getRequestURI());
            sendErrorResponse(response, 401, "로그인이 필요한 서비스입니다.");
            return;
        }

        try {
            jwtHandler.validateToken(bearerToken);
        } catch (final Exception e) {
            log.error("유효하지 않은 토큰이 요청에 포함됨. - {}", request.getRequestURI());
            sendErrorResponse(response, 401, "유효하지 않은 토큰입니다.");
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private boolean checkWhiteList(final HttpServletRequest request) {
        final String requestURI = request.getRequestURI();
        return WHITE_LIST.stream()
            .anyMatch(whiteListUrl -> whiteListUrl.equals(requestURI));
    }

    private void sendErrorResponse(final HttpServletResponse response, final int status, final String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // JSON 응답 바디 생성
        final ApiResponse<Void> apiResponse = ApiResponse.fail(message);

        // JSON 변환 및 응답 전송
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.getWriter().flush();
    }
}
