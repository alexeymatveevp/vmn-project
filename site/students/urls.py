from django.conf.urls import patterns, url

from students import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^custom$', views.custom, name='custom'),
    url(r'^students$', views.students, name='students'),
    url(r'^student/(?P<name>[a-zA-Z]+)', views.student_descr, name='student_descr'),
    url(r'^skills', views.skills, name='skills'),
    url(r'^skill/(?P<name>[a-zA-Z]+)', views.skill_descr, name='skill_descr'),
    url(r'^questions', views.questions, name='questions'),
    url(r'^question/(?P<id>\d+)', views.question_descr, name='question_descr')
)