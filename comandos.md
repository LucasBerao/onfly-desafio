# Comandos para o n8n

## Criar volume para o n8n (se não existir)

```bash
docker volume create n8n_data
```

## Iniciar o n8n

```bash
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="America/Sao_Paulo" \
 -e TZ="America/Sao_Paulo" \
 -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true \
 -e N8N_RUNNERS_ENABLED=true \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```
Este comando cria um volume para armazenar dados persistentes, faz o download da imagem necessária do n8n e inicia o contêiner com as seguintes configurações:

- Mapeia e expõe a porta 5678 no host.
- Define o fuso horário do contêiner:
  - A variável de ambiente TZ define o timezone do sistema, controlando o que comandos como date retornam.
  - A variável GENERIC_TIMEZONE define o timezone correto para nodes orientados a agendamento, como o Schedule Trigger.
- Garante permissões seguras para o arquivo de configuração do n8n.
- Habilita os task runners, a forma recomendada de executar tarefas no n8n.
- Monta o volume n8n_data no diretório /home/node/.n8n para persistir os dados entre reinicializações do contêiner.
- Usa o SQL Lite como banco de dados por padrão.

Após iniciar, você pode acessar o n8n em: http://localhost:5678



Para usar o n8n com o PostgreSQL, devemos rodar

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="<YOUR_TIMEZONE>" \
 -e TZ="<YOUR_TIMEZONE>" \
 -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true \
 -e N8N_RUNNERS_ENABLED=true \
 -e DB_TYPE=postgresdb \
 -e DB_POSTGRESDB_DATABASE=<POSTGRES_DATABASE> \
 -e DB_POSTGRESDB_HOST=<POSTGRES_HOST> \
 -e DB_POSTGRESDB_PORT=<POSTGRES_PORT> \
 -e DB_POSTGRESDB_USER=<POSTGRES_USER> \
 -e DB_POSTGRESDB_SCHEMA=<POSTGRES_SCHEMA> \
 -e DB_POSTGRESDB_PASSWORD=<POSTGRES_PASSWORD> \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n



Isso vai iniciar o n8n com as configuracoes de boas praticas, e usando o PostgreSQL como banco de dados. (Obs: aqui, esse banco devera estar rodando em algum lugar!)


Para usar o n8n com um banco local, podemos rodar com o docker compose