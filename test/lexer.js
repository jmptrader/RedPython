
var lexer = require('../lib/lexer.js');
TokenType = lexer.TokenType;

exports['get null if empty string'] = function (test) {
    var lxr = lexer.createLexer('');
    
    test.strictEqual(lxr.nextToken(), null);
}

exports['get null if blank string'] = function (test) {
    var lxr = lexer.createLexer('    ');
    
    test.strictEqual(lxr.nextToken(), null);
}

exports['get null if empty lines'] = function (test) {
    var lxr = lexer.createLexer('  \n   \n');
    
    test.strictEqual(lxr.nextToken(), null);
}

exports['get null if empty lines with carriage return'] = function (test) {
    var lxr = lexer.createLexer('  \r\n   \n');
    
    test.strictEqual(lxr.nextToken(), null);
}

exports['get indent and integer'] = function (test) {
    var lxr = lexer.createLexer('123');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Integer);
    test.equal(token.value, '123');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get indent and real'] = function (test) {
    var lxr = lexer.createLexer('123.45');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Real);
    test.equal(token.value, '123.45');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get indent and name'] = function (test) {
    var lxr = lexer.createLexer('name');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get indent and two names'] = function (test) {
    var lxr = lexer.createLexer('foo bar');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'foo');
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'bar');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get indent two spaces and name'] = function (test) {
    var lxr = lexer.createLexer('  name');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 2);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get string'] = function (test) {
    var lxr = lexer.createLexer('"foo"');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.String);
    test.equal(token.value, 'foo');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get indent two spaces and name skipping empty lines'] = function (test) {
    var lxr = lexer.createLexer('    \r\n\n  name');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 2);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Name);
    test.equal(token.value, 'name');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get parenthesis as punctuation'] = function (test) {
    var lxr = lexer.createLexer('()');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Punctuation);
    test.equal(token.value, '(');
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Punctuation);
    test.equal(token.value, ')');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get colons as punctuation'] = function (test) {
    var lxr = lexer.createLexer(':');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Punctuation);
    test.equal(token.value, ':');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get equal as operator'] = function (test) {
    var lxr = lexer.createLexer('=');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Operator);
    test.equal(token.value, '=');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get plus as operator'] = function (test) {
    var lxr = lexer.createLexer('+');
    
    var token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Indent);
    test.equal(token.value, 0);
    
    token = lxr.nextToken();
    test.ok(token);
    test.equal(token.type, TokenType.Operator);
    test.equal(token.value, '+');
    
    test.strictEqual(lxr.nextToken(), null);
};

exports['get comparison operators'] = function (test) {
    var operators = ['==', '!=', '<', '<=', '>', '>='];
    var lxr = lexer.createLexer(operators.join(' '));
    
    lxr.nextToken();
    
    for (var k = 0; k < operators.length; k++) {
        var token = lxr.nextToken();
        test.ok(token);
        test.equal(token.type, TokenType.Operator);
        test.equal(token.value, operators[k]);
    }
    
    test.strictEqual(lxr.nextToken(), null);
};
