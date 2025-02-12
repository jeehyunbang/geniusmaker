from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # Django 기본 유저 모델 사용

class Conference(models.Model):
    id = models.AutoField(primary_key=True)  # ✅ Django 기본 ID 대신 직접 설정
    thumbnail_url = models.CharField(max_length=1000, blank=True)  # 학회 대표 이미지 URL
    name = models.CharField(max_length=100)  # 학회 이름
    region = models.CharField(max_length=100)  # 학회 지역
    category = models.CharField(max_length=20)  # 학회 카테고리
    description = models.TextField()  # 학회 설명
    fee = models.IntegerField(default=0)  # 참가비 (0이면 무료)
    join_path = models.CharField(max_length=500, blank=True)  # 참가 신청 경로
    contact = models.CharField(max_length=100, blank=True)  # 연락처

    def __str__(self):
        return self.name

