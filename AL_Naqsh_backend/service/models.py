from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=255,null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.service_name 
   
    # overriding the save method to delete the file if new image is uploaded
    def save(self, *args, **kwargs):
        if self.pk:
            previos_data = Service.objects.get(pk=self.pk)
            if previos_data.image and previos_data.image != self.image:
                previos_data.image.delete(save=False)
        super().save(*args, **kwargs)
    
    # overriding the delete method to delete the file if the instance is deleted
    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)