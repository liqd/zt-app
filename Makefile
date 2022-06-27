.PHONY: all
all: help

.PHONY: help
help:
	@echo adhocracy+ development tools
	@echo
	@echo It will either use an exisiting virtualenv if it was entered
	@echo before or create a new one in the venv subdirectory.
	@echo
	@echo usage:
	@echo
	@echo "  make install         -- install dev setup"
	@echo "  make clean           -- delete node modules and venv"
	@echo "  make start           -- run expo"
	@echo "  make start-local     -- run expo with api set to local"
	@echo "  make start-nocache   -- run expo with cleaned cache"
	@echo "  make start-android   -- run expo and launch the android app"
	@echo "  make start-web       -- run expo and launch the web app"
	@echo "  make lint            -- run the linter"
	@echo "  make test            -- run tests with coverage"
	@echo "  make test-nocov      -- run tests without coverage"
	@echo "  make test-debug      -- run changed tests only, no coverage"
	@echo "  make updateSnapshots -- update the snapshots for tests"
	@echo

.PHONY: install
install:
	npm install

.PHONY: clean
clean:
	if [ -f package-lock.json ]; then rm package-lock.json; fi
	if [ -d node_modules ]; then rm -rf node_modules; fi
	if [ -d /tmp/metro-cache ]; then rm -rf /tmp/metro-cache; fi
	if [ -f /tmp/haste-map-metro-* ]; then rm -f /tmp/haste-map-metro-*; fi

.PHONY: start
start:
	NODE_OPTIONS=--openssl-legacy-provider npm start

.PHONY: start-local
start-local:
	NODE_OPTIONS=--openssl-legacy-provider LOCAL_API=true npm run start

.PHONY: start-nocache
start-nocache:
	NODE_OPTIONS=--openssl-legacy-provider npm start -- --reset-cache

.PHONY: start-android
start-android:
	NODE_OPTIONS=--openssl-legacy-provider npm start -- -a

.PHONY: start-web
start-web:
	BROWSER="./chrome.sh" NODE_OPTIONS=--openssl-legacy-provider npm start -- -w

.PHONY: lint
lint:
	npx eslint *.js containers/ components/ navigation/

.PHONY: lint-fix
lint-fix:
	npx eslint --fix *.js containers/ components/ navigation/

.PHONY: test
test:
	npm run test

.PHONY: test-nocov
test-nocov:
	npm run testNoCov

.PHONY: test-debug
test-debug:
	npm run testDebug

.PHONY: updateSnapshots
updateSnapshots:
	npm run updateSnapshots
