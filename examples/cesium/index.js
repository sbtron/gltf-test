var modelInfo = ModelIndex.getCurrentModel();
if (!modelInfo) {
    document.getElementById('cesiumContainer').innerHTML = 'Please specify a model to load';
    throw new Error('Model not specified or not found in list.');
}

var terrain = Cesium.createDefaultTerrainProviderViewModels();

var viewer = new Cesium.Viewer('cesiumContainer', {
    selectionIndicator : false,
    terrainProviderViewModels: terrain,
    selectedTerrainProviderViewModel: terrain[1]
});

function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(139.691706, 35.689487, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);

    var entity = viewer.entities.add({
        name : modelInfo.filename,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            scale : 1000.0
        }
    });
    viewer.flyTo(entity, { duration: 4 }).then(function() {
        viewer.trackedEntity = entity;
    });
}

createModel('../../sampleModels/' + modelInfo.path, 10000);
