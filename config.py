from pydantic import BaseModel


class Settings(BaseModel):
    port: int = 1883
    topic: str = "/python/mqtt"
    path: str = "scripts"
    broker: str = 'mqtt://54.180.126.214:1883'
