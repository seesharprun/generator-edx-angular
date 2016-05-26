var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.option('transpile');
    },
    prompting: {
        logIntro: function () {            
            this.log('─────────────────────');
            this.log('Creating New Angular App');
        },
        logSelection: function () {            
            this.options.transpile ?
                this.log('[TypeScript Files Are Transpiled in Browser]') :
                this.log('[TypeScript Files Are Transpiled in IDE]');
        },
        logOutro: function () {          
            this.log('─────────────────────');
        }
    },
    configuring : {
        configuration: function () {
            this.folderName = this.options.transpile ? 'browser/' : 'ide/';
        }
    },
    writing: {
        writeSupportFiles: function() {
            this.fs.copyTpl(
                this.templatePath('tsconfig.json'),
                this.destinationPath('tsconfig.json'), 
                { }
            );  
            this.fs.copyTpl(
                this.templatePath(this.folderName + 'launch.json'),
                this.destinationPath('.vscode/launch.json'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath(this.folderName + 'settings.json'),
                this.destinationPath('.vscode/settings.json'), 
                { }
            );   
            this.fs.copyTpl(
                this.templatePath(this.folderName + 'package.json'),
                this.destinationPath('package.json'), 
                { }
            );   
            this.fs.copyTpl(
                this.templatePath(this.folderName + 'systemjs.config.js'),
                this.destinationPath('systemjs.config.js'), 
                { }
            );  
            if (!this.options.transpile) {  
                this.fs.copyTpl(
                    this.templatePath(this.folderName + 'typings.json'),
                    this.destinationPath('typings.json'), 
                    { }
                );  
                this.fs.copyTpl(
                    this.templatePath(this.folderName + 'tasks.json'),
                    this.destinationPath('.vscode/tasks.json'), 
                    { }
                );                
            }       
        },
        writeHTMLFiles: function() {    
            this.fs.copyTpl(
                this.templatePath(this.folderName + 'index.html'),
                this.destinationPath('index.html'), 
                { }
            );        
        },
        writeApplication: function() {
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
    },
    install: {
        installNPMDependencies: function () {
            this.npmInstall(['typescript', 'typings'], { 'global': true });
            this.installDependencies({
                npm: true,
                bower: false
            });
        }
    }
});