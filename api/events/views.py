from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Event
from .serializers import EventSearchSerializer, EventDetailSerializer

class EventSearchView(APIView):
    """
    행사 검색 API (모든 사용자 접근 가능)
    """
    permission_classes = [AllowAny]

    def get(self, request):
        keyword = request.GET.get("keyword", "")
        region = request.GET.get("region", "")
        is_online = request.GET.get("is_online", "")

        events = Event.objects.all()
        if keyword:
            events = events.filter(title__icontains=keyword)
        if region:
            events = events.filter(region__icontains=region)
        if is_online.lower() == "true":
            events = events.filter(is_online=True)
        elif is_online.lower() == "false":
            events = events.filter(is_online=False)

        serializer = EventSearchSerializer(events, many=True)
        return Response({"message": "행사 정보 검색 성공!", "data": {"events": serializer.data}})


class EventDetailView(APIView):
    """
    행사 상세 조회 API (모든 사용자 접근 가능)
    """
    permission_classes = [AllowAny]

    def get(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
            serializer = EventDetailSerializer(event)
            return Response({"message": "행사 상세 정보 조회 성공!", "data": serializer.data})
        except Event.DoesNotExist:
            return Response({"error": "해당 행사 정보를 찾을 수 없습니다."}, status=404)
