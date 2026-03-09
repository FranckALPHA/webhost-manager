from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "WebHostManager API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    DATABASE_URL: str = "sqlite+aiosqlite:///./webhostmanager.db"

    SECRET_KEY: str = "supersecret-change-in-production-please"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24h

    class Config:
        env_file = ".env"


settings = Settings()
