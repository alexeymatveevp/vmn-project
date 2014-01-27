from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    class Meta:
        db_table = 'student'
    def __unicode__(self):
        return self.name

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=200)
    class Meta:
        db_table = 'question'
    def __unicode__(self):
        return self.question

class Skill(models.Model):
    name = models.CharField(max_length=40, primary_key=True)
    desc = models.CharField(max_length=400)
    img = models.CharField(max_length=400)
    class Meta:
        db_table = 'skill'
    def __unicode__(self):
        return self.name

class Link(models.Model):
    id = models.AutoField(primary_key=True)
    link = models.CharField(max_length=400)
    skill = models.ForeignKey(Skill, db_column="skill")
    class Meta:
        db_table = 'link'

class SkillsRelationship(models.Model):
    parent = models.ForeignKey(Skill, db_column="parent", related_name="parent")
    child = models.ForeignKey(Skill, db_column="child", related_name="child")
    class Meta:
        db_table = 'skill_relationship'

class SkillQuestion(models.Model):
    skill = models.ForeignKey(Skill, db_column="skill")
    question = models.ForeignKey(Question, db_column="question")
    class Meta:
        db_table = 'skill_question'

class QuestionsAnswered(models.Model):
    student = models.ForeignKey(Student, db_column="student")
    question = models.ForeignKey(Question, db_column="question")
    class Meta:
        db_table = 'questions_answered'
