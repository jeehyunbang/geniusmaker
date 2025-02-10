from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Conference
from .serializers import ConferenceSerializer, ConferenceDetailSerializer

class ConferenceSearchView(APIView):
    """
    학회 검색 API
    GET /api/conferences/search?keyword=<keyword>&category=<category>&area=<region>
    """
    permission_classes = [AllowAny]  # 누구나 검색 가능

    def get(self, request):
        keyword = request.GET.get("keyword", "")
        category = request.GET.get("category", "")
        area = request.GET.get("area", "")

        conferences = Conference.objects.all()
        if keyword:
            conferences = conferences.filter(name__icontains=keyword)
        if category:
            conferences = conferences.filter(category__icontains=category)
        if area:
            conferences = conferences.filter(region__icontains=area)

        serializer = ConferenceSerializer(conferences, many=True)
        return Response({"message": "학회 정보 검색 성공!", "data": {"conferences": serializer.data}})


class ConferenceDetailView(APIView):
    """
    학회 상세 조회 API
    GET /api/conferences/<conference_id>/
    """
    permission_classes = [AllowAny]  # 누구나 상세 조회 가능

    def get(self, request, conference_id):
        try:
            conference = Conference.objects.get(id=conference_id)
            serializer = ConferenceDetailSerializer(conference)
            return Response({"message": "학회 상세 정보 조회 성공!", "data": serializer.data})
        except Conference.DoesNotExist:
            return Response({"error": "해당 학회 정보를 찾을 수 없습니다."}, status=404)
