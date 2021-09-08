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
	@echo "  make start-cache     -- run expo with cleaned cache"
	@echo "  make start-android   -- run expo and launch the android app"
	@echo "  make start-web       -- run expo and launch the web app"
	@echo "  make lint            -- run the linter"
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

.PHONY: start-nocache
start-nocache:
	npm start -- --reset-cache

.PHONY: start-android
start-android:
	npm start -- -a

.PHONY: start-web
start-web:
	BROWSER="./chrome.sh"  npm start -- -w

.PHONY: lint
lint:
	npx eslint *.js containers/ components/ navigation/

.PHONY: lint-fix
lint-fix:
	npx eslint --fix *.js containers/ components/ navigation/
