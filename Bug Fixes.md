### Login fixes

- The admin seed now stores the correct MD5 digest for `Sample@123`.
- The 2FA endpoint converts the browser's string `user_id` to an integer before
	looking it up in MongoDB.
- MongoDB initialization scripts run only when the data volume is first created.
	To repair an existing volume with the old admin digest, run:

	```sh
	docker compose exec db mongosh -u brd_app -p brd_app_pass --authenticationDatabase admin harshwal_brd --eval 'db.users.updateOne({email: "admin@sample.com"}, {$set: {password_md5: "7431c778a9e22c38bb3378aa5604f1f5"}})'
	```

- Rebuild the backend after backend code changes with `docker compose up --build -d backend`.
