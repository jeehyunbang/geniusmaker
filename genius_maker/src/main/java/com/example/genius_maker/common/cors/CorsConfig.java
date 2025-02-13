package com.example.genius_maker.common.cors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                log.info("CORS 설정 동작!!!");
                registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
                    .allowedOriginPatterns("*") // 허용할 출처
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                    .allowedHeaders("*") // 모든 헤더 허용
                    .allowCredentials(true); // 쿠키 포함 여부
            }
        };
    }
}
