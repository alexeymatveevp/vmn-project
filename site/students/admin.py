from django.contrib import admin
from students.models import *


class MilestoneAdmin(admin.ModelAdmin):
    list_display = ['name', 'date']


class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'desc']


class QuestionAnsweredAdmin(admin.ModelAdmin):
    list_display = ['student', 'question']


class SkillsRelationshipAdmin(admin.ModelAdmin):
    list_display = ['parent', 'child']


class SkillQuestionAdmin(admin.ModelAdmin):
    list_display = ['skill', 'question']


class LinkAdmin(admin.ModelAdmin):
    list_display = ['skill', 'link']


admin.site.register(Student)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Milestone, MilestoneAdmin)
admin.site.register(Question)
admin.site.register(Link, LinkAdmin)
admin.site.register(SkillQuestion, SkillQuestionAdmin)
admin.site.register(QuestionsAnswered, QuestionAnsweredAdmin)
admin.site.register(SkillsRelationship, SkillsRelationshipAdmin)