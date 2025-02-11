package com.example.genius_maker.s3.controller;

import com.example.genius_maker.common.controller.response.ApiResponse;
import com.example.genius_maker.s3.controller.response.S3ImageUploadResponse;
import com.example.genius_maker.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/api/s3/upload")
    public ApiResponse<S3ImageUploadResponse> uploadImage(@RequestParam("images") List<MultipartFile> images) {
        final List<String> uploadImageUrls = s3Service.uploadImage(images);
        return ApiResponse.successWithData(
            "S3 이미지 업로드 완료!",
            new S3ImageUploadResponse(uploadImageUrls)
        );
    }
}
