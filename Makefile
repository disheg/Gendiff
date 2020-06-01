lint:
	npx eslint .
publish:
	npm publish --dry-run
gendiff:
	npx babel-node src/bin/gendiff.js before.json after.json
