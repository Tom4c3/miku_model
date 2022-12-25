window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        alpha: true,
    });
    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87B8C0); // 背景色

    // カメラを作成
    // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, -500, -500);
    //camera.lookAt(url.position); 
    //※OrbitControls.jsを使用中はlookAt関数が使えなくなります。https://qiita.com/nogson/items/e5e4a5a09f7d594eabf8

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = '3d/test.glb';

    // window size
    const w_height = window.innerHeight;

    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            model.scale.set(100.0, 100.0, 100.0);
            model.rotation.y = -245;
            model.position.set(0, -250 , -250);
            scene.add(gltf.scene);
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 1; // 光の強さ
    light.position.set(3, 10, 1);
    // シーンに追加
    scene.add(light);


    //環境光源(アンビエントライト)：すべてを均等に照らす、影のない、全体を明るくするライト
    const ambient = new THREE.AmbientLight(0xf8f8ff, 0.7);
    scene.add(ambient); //シーンにアンビエントライトを追加

    // 初回実行
    tick();

    function tick() {
        controls.update();

        if (model != null) {
            console.log(model);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}