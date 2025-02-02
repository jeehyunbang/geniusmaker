from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer

class EventSearchView(APIView):
    """
    행사 검색 API
    GET /api/events/search?keyword=<keyword>&category=<category>&area=<region>
    """
    def get(self, request):
        keyword = request.GET.get("keyword", "")
        category = request.GET.get("category", "")
        area = request.GET.get("area", "")

        # 기본적으로 모든 행사 데이터를 가져옴
        events = Event.objects.all()

        # 검색 조건에 맞춰 필터링
        if keyword:
            events = events.filter(title__icontains=keyword)
        if category:
            events = events.filter(category__icontains=category)
        if area:
            events = events.filter(region__icontains=area)

        # JSON 응답 생성
        serializer = EventSerializer(events, many=True)
        return Response({"message": "행사 정보 검색 성공!", "data": {"events": serializer.data}})
