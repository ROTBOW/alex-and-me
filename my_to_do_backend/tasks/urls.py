from django.urls import path
from . import views

add_name = 'tasks'
urlpatterns = [
    # ping for status
    path('ping', views.ping),
    
    # Index of all tasks
    path('tasks', views.index),
    
    # create task
    path('tasks/new', views.create_task),
    
    # delete task
    path('tasks/delete/<id>', views.delete_task)
]
