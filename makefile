


.PHONY : test build run dev clean migrate seed init


run:
	@php artisan serve --host=0.0.0.0 --port=8000 --no-tls
init :
	@docker-compose up -d
	@php artisan migrate:fresh
	@php artisan db:seed
	@php artisan serve --host=0.0.0.0 --port=8000 --no-tls


clean:
	@docker-compose down


push :
	@read -p "commit message: " message;\
	git add .;\
	git commit -m "$$message";\
	git push origin main