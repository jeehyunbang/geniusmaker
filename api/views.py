from rest_framework.views import APIView
from rest_framework.response import Response

class APIRootView(APIView):
    """
    API 상태를 확인할 수 있는 헬스 체크 엔드포인트
    GET /api/
    """
    def get(self, request):
        return Response({
            "message": "API is working!",
            "endpoints": {
                "conferences": "/api/conferences/",
                "events": "/api/events/",
            }
        })
