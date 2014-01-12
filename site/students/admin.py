from django.contrib import admin
from students.models import *

# Register your models here.

class SkillAdmin(admin.ModelAdmin):
	list_display = ['name', 'desc']

class QuestionAnsweredAdmin(admin.ModelAdmin):
	list_display = ['student', 'question']

class SkillsRelationshipAdmin(admin.ModelAdmin):
	list_display = ['parent', 'child']

class SkillQuestionAdmin(admin.ModelAdmin):
	list_display = ['skill', 'question']

admin.site.register(Student)
admin.site.register(Skill,SkillAdmin)
admin.site.register(Question)
admin.site.register(SkillQuestion, SkillQuestionAdmin)
admin.site.register(QuestionsAnswered, QuestionAnsweredAdmin)
admin.site.register(SkillsRelationship, SkillsRelationshipAdmin)