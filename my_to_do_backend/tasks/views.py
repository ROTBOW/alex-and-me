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

# update task
@csrf_exempt
def update_task(req, id):
    # if we wanted to be more error catching, 
    # when object.get doesn't find something it throws an error
    # we could use a try block here to catch that
    curr_task = Task.objects.get(pk=id)
    
    if 'name' in req.POST:
        curr_task.name = req.POST['name']
    if 'desc' in req.POST:
        curr_task.desc = req.POST['desc']
    if 'finished' in req.POST:
        curr_task.finished = req.POST['finished'] == 'true'
    
    curr_task.save()
    
    return JsonResponse({id: {
        'name': curr_task.name,
        'desc': curr_task.desc,
        'finished': curr_task.finished
    }})


# delete task
@csrf_exempt
def delete_task(req, id):
    task_to_delete = Task.objects.filter(id=id)
    task_to_delete.delete()
    
    return JsonResponse({"STATUS": 'deleted!'})