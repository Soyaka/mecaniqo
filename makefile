include .env
export $(shell sed 's/=.*//' .env)

print-env:
	@echo $(DB_USERNAME)
	@echo $(DB_DATABASE)
	@echo $(DB_PASSWORD)

docker-up:
	@cd docker && docker-compose up -d

start-db:
	@cd docker && docker-compose start
stop-db:
	@cd docker && docker-compose stop

migrate:
	@php artisan migrate --force

fresh:
	@php artisan migrate:fresh --force

run:
	@php artisan serve --host=0.0.0.0 --port=5555

rundev:
	@npm run dev

commit:
	@read -p "commit: " commit; \
	git add . && git commit -m "$$commit"

push:
	@git push origin main

git:commit push