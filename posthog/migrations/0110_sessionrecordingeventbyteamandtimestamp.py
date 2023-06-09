# Generated by Django 3.0.11 on 2021-01-05 12:55

from django.db import migrations


class Migration(migrations.Migration):
    atomic = False

    dependencies = [
        ("posthog", "0109_fix_retention_filters"),
    ]

    operations = [
        migrations.RunSQL(
            "CREATE INDEX CONCURRENTLY IF NOT EXISTS posthog_ses_team_id_0409c4_idx ON posthog_sessionrecordingevent(team_id, timestamp);",
            reverse_sql='DROP INDEX "posthog_ses_team_id_0409c4_idx";',
            elidable=True,  # This table no longer exists
        )
    ]
