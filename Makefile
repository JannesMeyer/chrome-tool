BABEL = ./node_modules/.bin/babel

.PHONY: all
all: node_modules
	@$(BABEL) . --out-dir . --ignore "node_modules" --extensions ".ts"

.PHONY: watch
watch: node_modules
	@$(BABEL) . -w --out-dir . --ignore "node_modules" --extensions ".ts"

.PHONY: clean
clean:
	-rm -f *.log *.js ./spec/*.js

node_modules:
	npm install

%.js:: %.es6
	$(BABEL) $< --out-file $@