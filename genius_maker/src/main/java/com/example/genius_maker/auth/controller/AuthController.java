package com.example.genius_maker.auth.controller;

import com.example.genius_maker.auth.controller.request.LoginRequest;
import com.example.genius_maker.auth.controller.request.RegisterRequest;
import com.example.genius_maker.auth.controller.response.LoginResponse;
import com.example.genius_maker.auth.resolver.AuthenticatedMemberId;
import com.example.genius_maker.auth.service.AuthService;
import com.example.genius_maker.common.controller.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<Void> register(
        @RequestBody final RegisterRequest request
    ) {
        authService.saveMember(
            request.email(),
            request.password(),
            request.name(),
            request.memberType()
        );

        return ApiResponse.success("회원 가입 성공!");
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
        @RequestBody final LoginRequest request
    ) {
        final String loginToken = authService.login(request.email(), request.password());
        return ApiResponse.successWithData(
            "로그인 성공!",
            new LoginResponse(loginToken)
        );
    }

    @DeleteMapping("/withdraw")
    public ApiResponse<Void> withdraw(
        @AuthenticatedMemberId final Long memberId
    ) {
        authService.deleteMember(memberId);
        return ApiResponse.success("회원 탈퇴 성공!");
    }
}
