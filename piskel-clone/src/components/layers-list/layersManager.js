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
        $('.layers-list').on('click', (e) => { this.layersList.editLayer($(e.target).text()) });
        $('.layersbar').on('click', (e) => { if (e.target.getAttribute('tool') === 'newlayer') this.layersList.createLayer(); });
    }
}
