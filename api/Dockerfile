FROM python:3.11-slim

ENV POETRY_VERSION=1.8.2 \
    POETRY_VIRTUALENVS_CREATE=false \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/root/.local/bin:$PATH"

WORKDIR /app

# Instala dependências do sistema e Poetry
RUN apt-get update && apt-get install -y curl build-essential \
  && curl -sSL https://install.python-poetry.org | python3 - \
  && apt-get clean

# Copia arquivos de dependência primeiro (melhor cache)
COPY pyproject.toml poetry.lock* /app/

# Instala as dependências com Poetry
RUN poetry install --no-interaction --no-ansi

# Copia o restante do projeto
COPY . /app

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
