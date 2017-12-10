function exportAll(lib) {
  for (var name in lib) {
    if (!exports.hasOwnProperty(name)) exports[name] = lib[name];
  }
}

exportAll(require('./js/associativearray'));
exportAll(require('./js/is-associativearray'));
