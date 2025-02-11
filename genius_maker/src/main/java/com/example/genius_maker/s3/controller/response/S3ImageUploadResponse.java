package com.example.genius_maker.s3.controller.response;

import java.util.List;

public record S3ImageUploadResponse(
    List<String> imageUrls
) {
}
