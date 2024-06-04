.PHONY: test build run dev clean migrate seed init push

run:
	@php artisan serve --host=0.0.0.0 --port=8000 --no-tls

init:
	@php artisan migrate:fresh
	@php artisan db:seed
	@bun run dev
	@php artisan serve --host=0.0.0.0 --port=8000 --no-tls

docker:
	@if [ -f docker/docker-compose.yml ]; then \
		cd docker && docker-compose up -d; \
	else \
		echo "docker-compose.yml not found in the docker directory"; \
		exit 1; \
	fi
	@echo "Waiting for PostgreSQL to be ready..."; \
	until docker exec postgres pg_isready -U root -d laravel -h 127.0.0.1 -p 5433; do \
		sleep 1; \
	done
	@echo "PostgreSQL is ready!";


clean:
	@if [ -f docker/docker-compose.yml ]; then \
		cd docker && docker-compose down; \
	else \
		echo "docker-compose.yml not found in the docker directory"; \
		exit 1; \
	fi

push:
	@read -p "commit message: " message; \
	git add .; \
	git commit -m "$$message"; \
	git push origin main