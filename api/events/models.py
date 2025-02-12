from django.db import models
from django.utils.timezone import now #Django의 현재 시간 함수
from django.contrib.auth import get_user_model

User = get_user_model()  # Django 기본 유저 모델 사용

class Event(models.Model):
    id = models.AutoField(primary_key=True)  # ✅ Django 기본 ID 대신 직접 설정
    thumbnail_url = models.CharField(max_length=1000)  # 행사 썸네일 (VARCHAR 1000)
    title = models.CharField(max_length=100)  # 행사 제목 (VARCHAR 100)
    region = models.CharField(max_length=100)  # 지역 (VARCHAR 100)
    category = models.CharField(max_length=20)  # 행사 카테고리 (VARCHAR 20)
    description = models.TextField()  # 행사 설명 (VARCHAR 1000 -> TextField)
    image = models.ImageField(upload_to='events_images/', blank=True, null=True) #본문 삽입용 이미지
    fee = models.IntegerField()  # 행사 참가비 (INT)
    join_path = models.CharField(max_length=100)  # 참가 신청 경로 (VARCHAR 100)
    join_requirement = models.CharField(max_length=100)  # 참가 자격 요건 (VARCHAR 100)
    contact = models.CharField(max_length=100, null=True, blank=True)  # 관계자 연락처 (VARCHAR 100)
    is_online = models.BooleanField(default=False)  # 🔥 온/오프라인 여부 추가 (True=온라인, False=오프라인)
    apply_start_at = models.DateTimeField(default=now)  # 참가 신청 시작일 (DATETIME)
    apply_end_at = models.DateTimeField(null=True, blank=True)  # 기존 데이터 허용 # 참가 신청 마감일 (DATETIME)
    event_start_at = models.DateTimeField()  # 행사 시작일 (DATETIME)
    event_end_at = models.DateTimeField()  # 행사 종료일 (DATETIME)
    
    def __str__(self):
        return self.title


