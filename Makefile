.PHONY: all
all: help

.PHONY: help
help:
	@echo z:t development tools
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
	@echo "  make lint-fix        -- run the linter and fix simple errors"
	@echo "  make test            -- run tests with coverage"
	@echo "  make test-nocov      -- run tests without coverage"
	@echo "  make test-debug      -- run changed tests only, no coverage"
	@echo "  make updateSnapshots -- update the snapshots for tests"
	@echo "  make translations    -- create or update translation files"
	@echo "  make publish-dev     -- publish to dev channel"
	@echo "  make publish-prod    -- publish to prod channel"
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
	npm start

.PHONY: start-local
start-local:
	LOCAL_API=true npm run start

.PHONY: start-nocache
start-nocache:
	npm start -- -c

.PHONY: start-android
start-android:
	npm start -- -a

.PHONY: start-web
start-web:
	BROWSER="./chrome.sh" npm start -- -w

.PHONY: lint
lint:
	npx eslint *.js src/ --ignore-pattern tests/

.PHONY: lint-fix
lint-fix:
	npx eslint --fix *.js src/ --ignore-pattern tests/

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

.PHONY: translations
translations:
	npx i18next

.PHONY: publish-dev
publish-dev:
	npx eas update --channel dev

.PHONY: publish-prod
publish-prod:
	npx eas update --channel prod
