package com.example.genius_maker.common.config;

import com.example.genius_maker.auth.resolver.AuthenticatedMemberIdArgumentResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final AuthenticatedMemberIdArgumentResolver authenticatedMemberIdArgumentResolver;

    public WebConfig(final AuthenticatedMemberIdArgumentResolver authenticatedMemberIdArgumentResolver) {
        this.authenticatedMemberIdArgumentResolver = authenticatedMemberIdArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authenticatedMemberIdArgumentResolver);
    }
}
