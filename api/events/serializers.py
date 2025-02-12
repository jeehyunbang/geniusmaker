from rest_framework import serializers
from .models import Event

class EventSearchSerializer(serializers.ModelSerializer):
    """ 행사 검색 시 필요한 최소 정보 (썸네일, 제목, 지역, 온/오프라인 여부) """
    class Meta:
        model = Event
        fields = ["id", "thumbnail_url", "title", "region", "is_online"]


class EventDetailSerializer(serializers.ModelSerializer):
    """ 행사 상세 조회 시 모든 정보 제공 """
    image_url = serializers.SerializerMethodField()  # 본문 삽입용 이미지 URL 변환

    class Meta:
        model = Event
        fields = [
            "id", "thumbnail_url", "title", "region", "category", "description", "image_url",
            "fee", "join_path", "join_requirement", "contact", "is_online", "apply_start_at",
            "apply_end_at", "event_start_at", "event_end_at"
        ]

    def get_image_url(self, obj):
        """ 이미지 필드가 있을 경우 URL 반환 """
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None
