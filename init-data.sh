#!/bin/bash
set -e;

# Este script cria um usuário com privilégios limitados para o n8n usar,
# em vez de usar o superusuário do PostgreSQL.

if [ -n "$POSTGRES_NON_ROOT_USER" ] && [ -n "$POSTGRES_NON_ROOT_PASSWORD" ]; then
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
		CREATE USER $POSTGRES_NON_ROOT_USER WITH PASSWORD '$POSTGRES_NON_ROOT_PASSWORD';
		GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_NON_ROOT_USER;
		GRANT CREATE ON SCHEMA public TO $POSTGRES_NON_ROOT_USER;
	EOSQL
else
	echo "SETUP INFO: Nenhum usuário não-root foi criado pois as variáveis de ambiente não foram fornecidas."
fi
