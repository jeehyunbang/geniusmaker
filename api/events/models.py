from django.db import models
from django.utils.timezone import now #Django의 현재 시간 함수
from django.contrib.auth import get_user_model

User = get_user_model()  # Django 기본 유저 모델 사용

class Event(models.Model):
    thumbnail_url = models.CharField(max_length=1000)  # 행사 썸네일 (VARCHAR 1000)
    title = models.CharField(max_length=100)  # 행사 제목 (VARCHAR 100)
    region = models.CharField(max_length=100)  # 지역 (VARCHAR 100)
    category = models.CharField(max_length=20)  # 행사 카테고리 (VARCHAR 20)
    description = models.TextField()  # 행사 설명 (VARCHAR 1000 -> TextField)
    organizer = models.CharField(max_length=100)  # 행사 주최자 (VARCHAR 100)
    fee = models.IntegerField()  # 행사 참가비 (INT)
    join_path = models.CharField(max_length=100)  # 참가 신청 경로 (VARCHAR 100)
    join_requirement = models.CharField(max_length=100)  # 참가 자격 요건 (VARCHAR 100)
    contact = models.CharField(max_length=100, null=True, blank=True)  # 관계자 연락처 (VARCHAR 100)
    
    apply_start_at = models.DateTimeField(default=now)  # 참가 신청 시작일 (DATETIME)
    apply_end_at = models.DateTimeField(null=True, blank=True)  # 기존 데이터 허용 # 참가 신청 마감일 (DATETIME)
    event_start_at = models.DateTimeField()  # 행사 시작일 (DATETIME)
    event_end_at = models.DateTimeField()  # 행사 종료일 (DATETIME)
    
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일 (DATETIME)
    updated_at = models.DateTimeField(auto_now=True)  # 수정일 (DATETIME)
    
    member = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)     # 🔥 기존 데이터를 위해 `null=True, blank=True` 추가

    def __str__(self):
        return self.title
