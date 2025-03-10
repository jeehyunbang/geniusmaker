from rest_framework import serializers
from .models import Conference

class ConferenceSerializer(serializers.ModelSerializer):
    """학회 검색 시 간단한 정보만 제공"""
    class Meta:
        model = Conference
        fields = ["name", "region", "thumbnail_url"]  # 🔥 권한 없는 사용자가 볼 수 있는 3개 필드

class ConferenceDetailSerializer(serializers.ModelSerializer):
    """학회 상세 조회 시 모든 정보 제공"""
    class Meta:
        model = Conference
        fields = "__all__"  # 🔥 상세 조회에서는 모든 필드 제공
