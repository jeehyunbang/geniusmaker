from django.urls import path
from .views import ConferenceSearchView, ConferenceDetailView

urlpatterns = [
    path("conferences/search/", ConferenceSearchView.as_view(), name="conference-search"),
    path("conferences/<int:conference_id>/", ConferenceDetailView.as_view(), name="conference-detail"),
]
