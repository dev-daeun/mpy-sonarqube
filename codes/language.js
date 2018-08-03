module.exports = {
    names: ['js', 'py', 'java'],
    rule: {
        py: 'python',
        java: 'squid',
        js: 'javascript'
    },
    plugin: {
        py: 'python',
        java: 'java',
        js: 'javascript'
    },
    template: {
        py: 44,
        java: 1114,
        js: 105
    },
    templateKey: {
        'py': 'python:XPath',
        'java': 'squid:ArchitecturalConstraint',
        'js': 'javascript:CommentRegularExpression'
    }
}