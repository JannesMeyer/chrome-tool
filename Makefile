BABEL = ./node_modules/.bin/babel
JASMINE = ./node_modules/.bin/jasmine
WATCHMAN = watchman

SRC_FILES = $(wildcard src/*.js)
TARGET_FILES = $(patsubst src/%.js, %.js, $(SRC_FILES))

all: node_modules $(TARGET_FILES)

test: all
	@$(JASMINE)

node_modules:
	npm install

%.js:: src/%.js
	$(BABEL) $< -o $@

watch:
	@$(WATCHMAN) -n watch src > /dev/null
	@$(WATCHMAN) -nj < watchman.json > /dev/null
	@tail -fn0 build.log

clean:
	@rm *.js

.PHONY: all test watch clean