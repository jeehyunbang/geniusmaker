package com.example.genius_maker.auth.resolver;

import com.example.genius_maker.auth.service.JwtHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
public class AuthenticatedMemberIdArgumentResolver implements HandlerMethodArgumentResolver {

    private final JwtHandler jwtHandler;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthenticatedMemberPersonalValue.class);
    }

    @Override
    public Object resolveArgument(
        final MethodParameter parameter,
        final ModelAndViewContainer mavContainer,
        final NativeWebRequest webRequest,
        final WebDataBinderFactory binderFactory
    ) throws Exception {
        final String bearerToken = webRequest.getHeader("Authorization");
        return jwtHandler.getPersonalValue(bearerToken);
    }
}
