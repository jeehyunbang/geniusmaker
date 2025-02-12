from django.urls import path
from .views import ConferenceSearchView, ConferenceDetailView

urlpatterns = [
    path("search/", ConferenceSearchView.as_view(), name="conference-search"),
    path("<int:conference_id>/", ConferenceDetailView.as_view(), name="conference-detail"),
]
