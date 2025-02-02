from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Conference
from .serializers import ConferenceSerializer

class ConferenceSearchView(APIView):
    """
    학회 검색 API
    GET /api/conferences/search?keyword=<keyword>&category=<category>&area=<region>
    """
    def get(self, request):
        keyword = request.GET.get("keyword", "")
        category = request.GET.get("category", "")
        area = request.GET.get("area", "")

        # 기본적으로 모든 학회 데이터를 가져옴
        conferences = Conference.objects.all()

        # 검색 조건에 맞춰 필터링
        if keyword:
            conferences = conferences.filter(name__icontains=keyword)
        if category:
            conferences = conferences.filter(category__icontains=category)
        if area:
            conferences = conferences.filter(region__icontains=area)

        # JSON 응답 생성
        serializer = ConferenceSerializer(conferences, many=True)
        return Response({"message": "학회 정보 검색 성공!", "data": {"conferences": serializer.data}})
