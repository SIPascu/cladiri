self.addEventListener('message', function(e) {
  var data = e.data;

  switch (data.cmd) {
    case 'filter':
      var filteredFeatures = data.geojsonData.features.filter(function(feature) {
        var bbox = turf.bbox(feature);

        return !(bbox[0] > data.bounds.maxX || 
                 bbox[2] < data.bounds.minX || 
                 bbox[1] > data.bounds.maxY || 
                 bbox[3] < data.bounds.minY);
      });

      self.postMessage({
        cmd: 'filtered',
        features: filteredFeatures
      });
      break;

    default:
      self.postMessage('Unknown command: ' + data.cmd);
  };
}, false);
