from django.urls import include, path
from .views import APIRootView

urlpatterns = [
    path("", APIRootView.as_view(), name="api-root"),  # 기본 API 상태 확인
    path("conferences/", include("api.conferences.urls")),  # 학회 관련 API
    path("events/", include("api.events.urls")),  # 행사 관련 API
]
