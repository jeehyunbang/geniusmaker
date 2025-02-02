from django.urls import path
from .views import ConferenceSearchView

urlpatterns = [
    path("search/", ConferenceSearchView.as_view(), name="conference-search"),
]
