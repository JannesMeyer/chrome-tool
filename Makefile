BABEL = ./node_modules/.bin/babel
JASMINE = ./node_modules/.bin/jasmine

all: node_modules
	@$(BABEL) src --out-dir .

test: all
	@$(JASMINE)

node_modules:
	npm install

%.js:: src/%.js
	$(BABEL) $< --out-file $@

watch:
	@$(BABEL) src --out-dir . -w

clean:
	@rm *.js

.PHONY: all test watch clean