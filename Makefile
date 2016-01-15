BABEL = ./node_modules/.bin/babel

.PHONY: all
all: node_modules
	@$(BABEL) src --out-dir .

.PHONY: watch
watch: node_modules
	@$(BABEL) src --out-dir . --watch

.PHONY: clean
clean:
	-rm *.js
	-rm *.log

node_modules:
	npm install

%.js:: src/%.js
	$(BABEL) $< --out-file $@