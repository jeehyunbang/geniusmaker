import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model

User = get_user_model()

# JWT Secret Key (고정된 값 사용)
JWT_SECRET_KEY = "Z2VuaXVzX21ha2VyX2p3dF9zZWNyZXRfa2V5"
JWT_ALGORITHM = "HS256"

class JavaBackendJWTAuthentication(BaseAuthentication):
    """
    Java 백엔드에서 발급한 JWT를 검증하는 인증 클래스
    """

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return None  # 인증 없이 접근 가능

        token = auth_header.split(" ")[1]

        try:
            # JWT 검증 및 payload 디코딩
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])

            # JWT에서 유저 정보 추출
            user_id = payload.get("user_id")

            if not user_id:
                raise AuthenticationFailed("JWT에 필수 정보가 없습니다.")

            # Django User 모델에서 해당 유저 검색 (없으면 생성)
            user, _ = User.objects.get_or_create(id=user_id, defaults={"email": email})

            return (user, None)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("토큰이 만료되었습니다.")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("유효하지 않은 토큰입니다.")
