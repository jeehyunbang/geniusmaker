from rest_framework.permissions import BasePermission

class IsAuthenticatedWithJWT(BasePermission):
    """
    Java에서 발급한 JWT가 있는 경우에만 접근 가능
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
