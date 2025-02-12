from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .authentication import JavaBackendJWTAuthentication

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
                "auth_user_info": "/api/auth/user-info/",  # ✅ JWT 사용자 정보 조회 엔드포인트 추가
            }
        })

class UserInfoFromJWTView(APIView):
    """
    JWT에서 user_id를 추출하여 JSON으로 반환하는 API
    GET /api/auth/user-info/
    """
    authentication_classes = [JavaBackendJWTAuthentication]  # JWT 인증 적용
    permission_classes = [IsAuthenticated]  # 인증된 사용자만 접근 가능

    def get(self, request):
        # request.user에서 유저 ID 추출
        user_id = request.user.id if request.user else None

        if not user_id:
            return Response({"error": "사용자를 찾을 수 없습니다."}, status=400)

        return Response({"user_id": user_id}, status=200)
