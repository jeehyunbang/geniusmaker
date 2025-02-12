from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Conference
from .serializers import ConferenceSearchSerializer, ConferenceDetailSerializer

class ConferenceSearchView(APIView):
    """
    학회 검색 API
    """
    permission_classes = [AllowAny]

    def get(self, request):
        keyword = request.GET.get("keyword", "")
        region = request.GET.get("region", "")
        is_online = request.GET.get("is_online", "")

        conferences = Conference.objects.all()
        if keyword:
            conferences = conferences.filter(name__icontains=keyword)
        if region:
            conferences = conferences.filter(region__icontains=region)
        if is_online.lower() == "true":
            conferences = conferences.filter(is_online=True)
        elif is_online.lower() == "false":
            conferences = conferences.filter(is_online=False)

        serializer = ConferenceSearchSerializer(conferences, many=True)
        return Response({"message": "학회 검색 성공!", "data": {"conferences": serializer.data}})

class ConferenceDetailView(APIView):
    """
    학회 상세 조회 API
    """
    permission_classes = [AllowAny]

    def get(self, request, conference_id):
        try:
            conference = Conference.objects.get(id=conference_id)
            serializer = ConferenceDetailSerializer(conference)
            return Response({"message": "학회 상세 정보 조회 성공!", "data": serializer.data})
        except Conference.DoesNotExist:
            return Response({"error": "해당 학회를 찾을 수 없습니다."}, status=404)
