from django.db import models
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.api import APIField
from wagtail.core.models import Page


class ResearchPage(Page):
    entry_number = models.IntegerField(default=0)
    authors = models.TextField()
    year = models.IntegerField()
    date = models.DateField()
    preprint = models.BooleanField()
    link = models.URLField()
    abstract = models.TextField()
    doi = models.CharField(max_length=255)

    content_panels = Page.content_panels + [
        FieldPanel("authors"),
        FieldPanel("year"),
        FieldPanel("date"),
        FieldPanel("preprint"),
        FieldPanel("link"),
        FieldPanel("abstract"),
        FieldPanel("doi"),
    ]

    api_fields = [
        APIField("title"),
        APIField("authors"),
        APIField("year"),
        APIField("date"),
        APIField("preprint"),
        APIField("link"),
        APIField("abstract"),
        APIField("doi"),
    ]
