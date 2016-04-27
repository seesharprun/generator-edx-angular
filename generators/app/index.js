var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
    },
    prompting: {
        logIntro: function () {            
            this.log('─────────────────────');
            this.log('Creating New Angular App');
            this.log('─────────────────────');
        }
    },
    writing: {
        writeFolder: function() {
            this.fs.copyTpl(
                this.templatePath('launch.json'),
                this.destinationPath('.vscode/launch.json'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('index.html'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('app.component.ts'),
                this.destinationPath('app/app.component.ts'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('app.component.html'),
                this.destinationPath('app/app.component.html'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('main.ts'),
                this.destinationPath('app/main.ts'), 
                { }
            );
        }
    }
});