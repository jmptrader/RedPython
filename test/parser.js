
var parser = require('../lib/parser.js');

exports['compile integer'] = function (test) {
    var parsr = parser.createParser('123');
    parsr.parseIndent();
    
    var expr = parsr.parseExpression();
    test.ok(expr);
    test.equal(expr.compile(), '123');
    
    test.strictEqual(parsr.parseExpression(), null);
};

exports['compile name'] = function (test) {
    var parsr = parser.createParser('name');
    parsr.parseIndent();
    
    var expr = parsr.parseExpression();
    test.ok(expr);
    test.equal(expr.compile(), 'name');
    
    test.strictEqual(parsr.parseExpression(), null);
};

exports['compile sum'] = function (test) {
    var parsr = parser.createParser('123+a');
    parsr.parseIndent();
    
    var expr = parsr.parseExpression();
    test.ok(expr);
    test.equal(expr.compile(), '123 + a');
    
    test.strictEqual(parsr.parseExpression(), null);
};

exports['compile arithmetic expression'] = function (test) {
    var parsr = parser.createParser('123+a-1*2/3');
    parsr.parseIndent();
    
    var expr = parsr.parseExpression();
    test.ok(expr);
    test.equal(expr.compile(), '123 + a - 1 * 2 / 3');
    
    test.strictEqual(parsr.parseExpression(), null);
};

exports['compile arithmetic expression with parens'] = function (test) {
    var parsr = parser.createParser('123+(a-1)*2/3');
    parsr.parseIndent();
    
    var expr = parsr.parseExpression();
    test.ok(expr);
    test.equal(expr.compile(), '123 + (a - 1) * 2 / 3');
    
    test.strictEqual(parsr.parseExpression(), null);
};

exports['get indent with zero size'] = function (test) {
    var parsr = parser.createParser('name');
    var indent = parsr.parseIndent();
    
    test.strictEqual(indent, 0);
};

exports['get indent with size equals two'] = function (test) {
    var parsr = parser.createParser('  name');
    var indent = parsr.parseIndent();
    
    test.strictEqual(indent, 2);
};

exports['compile simple expression command'] = function (test) {
    var parsr = parser.createParser('123');
    var command = parsr.parseCommand();
    
    test.ok(command);
    test.equal(command.compile(), '123;');
    
    test.strictEqual(parsr.parseCommand(), null);
};

exports['compile simple assignment command'] = function  (test) {
    var parsr = parser.createParser('a=123');
    var command = parsr.parseCommand();
    
    test.ok(command);
    test.equal(command.compile(), 'a = 123;');
    
    test.strictEqual(parsr.parseCommand(), null);
};

exports['compile simple program with assignment'] = function (test) {
    var parsr = parser.createParser('a=123');
    var program = parsr.parseProgram();
    test.ok(program);
    test.ok(Array.isArray(program));
    test.equal(program.length, 2);
    test.equal(program[0], 'int a;');
    test.equal(program[1], 'a = 123;');
};

exports['compile simple return command'] = function (test) {
    var parsr = parser.createParser('return 123');
    var command = parsr.parseCommand();
    
    test.ok(command);
    test.equal(command.compile(), 'return 123;');
    
    test.strictEqual(parsr.parseCommand(), null);
};

exports['compile simple if command'] = function (test) {
    var parsr = parser.createParser('if a:\n  b = 1');
    var command = parsr.parseCommand();
    
    test.ok(command);
    
    var result = command.compile();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    test.equal(result[0], 'if (a)');
    test.ok(Array.isArray(result[1]));
    test.equal(result[1].length, 1);
    test.equal(result[1][0], 'b = 1;');
    
    test.strictEqual(parsr.parseCommand(), null);
};

exports['compile assignment to text'] = function (test) {
    var text = parser.compile('a = 1');
    
    test.ok(text);
    test.equal(text, "int a;\r\na = 1;\r\n");
};

exports['compile simple if to text'] = function (test) {
    var text = parser.compile('if b:\n  a = 1');
    
    test.ok(text);
    test.equal(text, "int a;\r\nif (b)\r\n    a = 1;\r\n");
};
