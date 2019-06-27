export default class layersManager {
    constructor(layersList) {
        this.layersList = layersList;
    }

    html() {
        let str = this.layersList.layers().reduce((acc, x) => acc += x.html(), '');
        return `
        <div class='layers btn-toolbar-vertical'>
            <ul class='layers-list btn-group-vertical'>
            ${str}
            </ul>
            <ul class='layersbar btn-group-vertical'>
                <button tool='newlayer'>New layer</button>
            </ul>
        </div>`
    }

    delete() {
        $('.layers').remove();
    }

    bind() {
        $('.layers-list').on('click', this.chooseLayer.bind(this));
        $('.layersbar').on('click', (e) => { if (e.target.getAttribute('tool') === 'newlayer') this.layersList.createLayer(); });
    }

    chooseLayer(e) {
        if ($(e.target).text() === window.globalState.currentLayer.name) {
            return true;
        }
        $('.layers-list .active').removeClass('active');

        e.target.classList.add('active');
        this.layersList.editLayer($(e.target).text());
    }
}
