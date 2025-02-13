//package com.example.genius_maker.common.filter;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//@Slf4j
//@Component
//public class CorsFilter implements Filter {
//
//    @Override
//    public void doFilter(
//        final ServletRequest servletRequest,
//        final ServletResponse servletResponse,
//        final FilterChain filterChain
//    ) throws IOException, ServletException {
//        final HttpServletResponse res = (HttpServletResponse) servletResponse;
//        res.setHeader("Access-Control-Allow-Origin", "*");
//        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//        res.setHeader("Access-Control-Allow-Headers", "*");
//        res.setHeader("Access-Control-Allow-Credentials", "true");
//
//        log.info("CORS 필터 작동!");
//        filterChain.doFilter(servletRequest, servletResponse);
//    }
//}
