from django.urls import path
from .views import EventSearchView, EventDetailView

urlpatterns = [
    # 🔹 행사 검색 API (썸네일, 제목, 지역, 온/오프라인 여부)
    path("events/search/", EventSearchView.as_view(), name="event-search"),
    
    # 🔹 행사 상세 조회 API (전체 정보 제공)
    path("events/<int:event_id>/", EventDetailView.as_view(), name="event-detail"),
]
