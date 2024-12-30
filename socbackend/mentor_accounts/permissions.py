from rest_framework.permissions import BasePermission
from django.core.exceptions import ObjectDoesNotExist


class HasUserProfile(BasePermission):
    message = "User must have created their profile."

    def has_permission(self, request, view):
        try:
            request.user.userprofile2  # Will raise an error if the user does not have a profile
            return True
        except ObjectDoesNotExist:
            return False
