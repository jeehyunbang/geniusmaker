from rest_framework import serializers
from .models import Event

class EventSearchSerializer(serializers.ModelSerializer):
    """ 행사 검색 시 필요한 최소 정보 (썸네일, 제목, 지역, 온/오프라인 여부) """
    class Meta:
        model = Event
        fields = ["id", "thumbnail_url", "title", "region", "is_online"]


class EventDetailSerializer(serializers.ModelSerializer):
    """ 행사 상세 조회 시 모든 정보 제공 """
    class Meta:
        model = Event
        fields = "__all__"
