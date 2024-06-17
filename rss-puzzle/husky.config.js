module.exports = {
    hooks: {
        'pre-commit': 'npm run prettier:check',
        'pre-push': 'npm run eslint && validate-branch-name',
    },
};
