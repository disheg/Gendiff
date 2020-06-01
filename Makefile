install:
	npm install
lint:
	npx eslint .
publish:
	npm publish --dry-run
gendiff:
	npx babel-node src/bin/gendiff.js before.json after.json
gendif yml:
	npx babel-node src/bin/gendiff.js __tests__/fixtures/before1.ini __tests__/fixtures/after1.ini
test:
	npx jest
test-coverage:
	npx jest --coverage
