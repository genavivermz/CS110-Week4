const canvas = document.getElementById("renderCanvas");
const resetButton = document.getElementById("reset-view");
const statusText = document.getElementById("scene-status");

if (canvas && typeof BABYLON !== "undefined") {
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.96, 0.95, 0.95, 1);

        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 2,
            Math.PI / 2.5,
            8,
            BABYLON.Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);
        camera.wheelPrecision = 25;
        camera.lowerRadiusLimit = 4;
        camera.upperRadiusLimit = 14;
        camera.panningSensibility = 0;

        const hemiLight = new BABYLON.HemisphericLight(
            "hemiLight",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        hemiLight.intensity = 0.9;

        const ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 12,
            height: 12,
            subdivisions: 2
        }, scene);
        ground.position.y = -1.5;

        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: 2,
            segments: 32
        }, scene);
        sphere.position.y = 0.7;

        const material = new BABYLON.StandardMaterial("sphereMaterial", scene);
        material.diffuseColor = new BABYLON.Color3(0.82, 0.19, 0.19);
        material.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        sphere.material = material;

        const resetCamera = function () {
            camera.alpha = -Math.PI / 2;
            camera.beta = Math.PI / 2.5;
            camera.radius = 8;
        };

        resetButton.disabled = false;
        resetButton.addEventListener("click", resetCamera);

        statusText.textContent = "Scene ready.";
        return { scene, camera, resetCamera };
    };

    const sceneInfo = createScene();
    const { scene } = sceneInfo;

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
} else {
    if (statusText) {
        statusText.textContent = "The 3D scene could not load.";
    }
}
