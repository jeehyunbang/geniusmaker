from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # Django 기본 유저 모델 사용

class Conference(models.Model):
    thumbnail_url = models.CharField(max_length=1000, blank=True)  # 학회 대표 이미지 URL
    name = models.CharField(max_length=100)  # 학회 이름
    region = models.CharField(max_length=100)  # 학회 지역
    category = models.CharField(max_length=20)  # 학회 카테고리
    description = models.TextField()  # 학회 설명
    fee = models.IntegerField(default=0)  # 참가비 (0이면 무료)
    join_path = models.CharField(max_length=500, blank=True)  # 참가 신청 경로
    contact = models.CharField(max_length=100, blank=True)  # 연락처
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 날짜
    updated_at = models.DateTimeField(auto_now=True)  # 수정 날짜
    member = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)     # 🔥 기존 데이터를 위해 `null=True, blank=True` 추가

    def __str__(self):
        return self.name
