// var fs = require('fs');

module.exports = function(Container) {
  Container.afterRemote('upload', function(ctx, inst, next) {
    var models = Container.app.models;

  //  var fileModule = Container.app.modules.file.getManager(app);

    var modelName = ctx.result.result.fields.componentId[0];
    var functionName = ctx.result.result.fields.componentClass[0];
    var targetId = ctx.result.result.fields.targetId[0];
    var file = ctx.result.result.files.file[0];

//    fs.rename(fileModule.storagePath + 'import/' , '/tmp/world'

    models.file.create(ctx.result.result.files.file[0], function(err, data) {
      models[modelName][functionName](targetId, data)
       .then(function (data) {
        ctx.result.result.model = data;
        next();
       })
       .catch(function(err) {
        next(err);
       });
    });
  });
};
