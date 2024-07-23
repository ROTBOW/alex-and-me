# from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Task

# Create your views here.
# ping backend
def ping(req):
    return JsonResponse({'STATUS': 'GOOD'})


# index of tasks
def index(req):
    tasks_set = Task.objects.all()
    tasks = dict()
    
    for task in tasks_set:
        tasks[task.id] = {
            'name': task.name,
            'desc': task.desc,
            'finished': task.finished
        }
    
    return JsonResponse(tasks)


# creation of task
@csrf_exempt
def create_task(req):
    new_task = Task()
    
    new_task.name = req.POST['name']
    new_task.desc = req.POST['desc']
    new_task.finished = req.POST['finished']
    
    new_task.save()
    return JsonResponse({
        new_task.id: {
            'name': new_task.name,
            'desc': new_task.desc,
            'finished': new_task.finished
        }
    })


# delete task
@csrf_exempt
def delete_task(req, id):
    task_to_delete = Task.objects.filter(id=id)
    task_to_delete.delete()
    
    return JsonResponse({"STATUS": 'deleted!'})