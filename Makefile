install:
	npm install
lint:
	npx eslint .
publish:
	npm publish --dry-run
gendiff:
	npx bin/gendiff.js __tests__/fixtures/beforeJson.json __tests__/fixtures/afterJson.json
