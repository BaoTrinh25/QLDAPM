# Generated by Django 4.2.11 on 2024-07-17 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0019_company_companytype_job_jobseeker_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CompanyType',
            new_name='EmploymentType',
        ),
        migrations.RenameField(
            model_name='job',
            old_name='companytype',
            new_name='employmenttype',
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Ứng viên'), (2, 'Nhà tuyển dụng')], null=True),
        ),
    ]
