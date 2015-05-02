BABEL=./node_modules/.bin/babel
JASMINE=./node_modules/.bin/jasmine

SRC_FILES=$(wildcard src/*.js)
TARGET_FILES=$(patsubst src/%.js, %.js, $(SRC_FILES))

all: node_modules $(TARGET_FILES)

test: all
	@$(JASMINE)

node_modules:
	npm install

%.js:: src/%.js
	$(BABEL) -o $@ $<

clean:
	@rm -r node_modules $(TARGET_FILES)

.PHONY: all test clean