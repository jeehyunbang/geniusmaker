package com.example.genius_maker.s3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {

    private final AmazonS3 s3Client;

    @Value("${secret.aws.s3.bucket-name}")
    private String bucketName;

    public List<String> uploadImage(final List<MultipartFile> images) {
        return images.stream()
            .map(this::uploadImage)
            .toList();
    }

    private String uploadImage(final MultipartFile image) {
        if (image == null || image.getOriginalFilename() == null || image.getOriginalFilename().isBlank()) {
            throw new IllegalArgumentException("이미지와 이미지 이름은 필수 값 입니다.");
        }

        final String uploadFileName = "images/" + UUID.randomUUID() + "." + parseExtension(image.getOriginalFilename());

        try {
            final ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(image.getContentType());
            objectMetadata.setContentLength(image.getSize());
            s3Client.putObject(bucketName, uploadFileName, image.getInputStream(), objectMetadata);

            log.info("이미지 업로드 완료! 원본 이미지 이름 : {}, 업로드 이미지 이름 : {}", image.getOriginalFilename(), uploadFileName);
        } catch (final Exception e) {
            log.error("이미지 업로드에 문제가 발생했습니다. 이미지 이름 : {}", image.getOriginalFilename());
        }

        return s3Client.getUrl(bucketName, uploadFileName).toString();
    }

    private String parseExtension(final String originalFilename) {
        return originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
    }
}
