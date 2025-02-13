package com.example.genius_maker.auth.controller;

import com.example.genius_maker.auth.controller.request.LoginRequest;
import com.example.genius_maker.auth.controller.request.SaveConferenceMemberInfoRequest;
import com.example.genius_maker.auth.controller.request.SavePrivateMemberInfoRequest;
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

    @PostMapping("/private-register")
    public ApiResponse<Void> savePrivateMemberInfo(
        @RequestBody final SavePrivateMemberInfoRequest request
    ) {
        authService.savePrivateMemberInfo(request);
        return ApiResponse.success("회원 가입 성공!");
    }

    @PostMapping("/conference-register")
    public ApiResponse<Void> saveConferenceMemberInfo(
        @RequestBody final SaveConferenceMemberInfoRequest request
    ) {
        authService.saveConferenceMemberInfo(request);
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
