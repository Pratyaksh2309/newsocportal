from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.db import transaction

from .models import UserProfile2
from .options import DepartmentChoices
from django.contrib.auth.models import User


class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
        ]
        extra_kwargs = {
            "password": {"style": {"input_type": "password"}, "write_only": True}
        }

    def validate_password(self, password):
        """
        Validate the password against all password validators.
        """
        validate_password(password)

        return password


class RegisterUserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = UserProfile2
        exclude = ["verified", "verification_token"]
        extra_kwargs = {
            "password": {"style": {"input_type": "password"}, "write_only": True}
        }

class UserProfileSerializer2(serializers.ModelSerializer):
    class Meta:
        model = UserProfile2
        exclude = ["user", "verified",  "verification_token"]
        extra_kwargs = {
            "roll_number": {"read_only": True}
        }

    # def create(self, validated_data):
    #     """
    #     Override the create method with objects.create_user,
    #     since the former saves with an unencrypted password
    #     """
    #     return User.objects.create_user(validated_data)


class RegisterUserProfileSerializer2(serializers.ModelSerializer):
    user = UserSerializer2()

    class Meta:
        model = UserProfile2
        fields = "__all__"
        # extra_kwargs = {
        #     "password": {"style": {"input_type": "password"}, "write_only": True}
        # }

    @transaction.atomic
    def create(self, validated_data):
        """
        Override the create method with objects.create_user,
        since the former saves with an unencrypted password
        """
        user_data = validated_data.pop("user")
        user = User.objects.create_user(**user_data)
        return UserProfile2.objects.create(user=user, **validated_data)


class UserAutoCompleteSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(source="user.id")
    name = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile2
        fields = ["id", "roll_number", "name"]

    def get_name(self, obj):
        return obj.user.get_full_name()
