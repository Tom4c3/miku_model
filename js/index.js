window.addEventListener('DOMContentLoaded', init);

function init() {
    // �����_���[���쐬
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),
        alpha: true,
    });
    // �E�B���h�E�T�C�Y�ݒ�
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // �V�[�����쐬
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87B8C0); // �w�i�F

    // �J�������쐬
    // new THREE.PerspectiveCamera(����p, �A�X�y�N�g��, near, far)
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, -500, -500);
    //camera.lookAt(url.position); 
    //��OrbitControls.js���g�p����lookAt�֐����g���Ȃ��Ȃ�܂��Bhttps://qiita.com/nogson/items/e5e4a5a09f7d594eabf8

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
            model.rotation.y = 180;
            model.position.set(0, -200, -200);
            scene.add(gltf.scene);
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


    // ���s����
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 1; // ���̋���
    light.position.set(3, 10, 1);
    // �V�[���ɒǉ�
    scene.add(light);


    //������(�A���r�G���g���C�g)�F���ׂĂ��ϓ��ɏƂ炷�A�e�̂Ȃ��A�S�̂𖾂邭���郉�C�g
    const ambient = new THREE.AmbientLight(0xf8f8ff, 0.7);
    scene.add(ambient); //�V�[���ɃA���r�G���g���C�g��ǉ�

    // ������s
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