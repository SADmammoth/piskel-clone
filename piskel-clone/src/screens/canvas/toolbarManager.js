

export default class toolbarManager {
    constructor(toolsObject) {
        this.toolsObject = toolsObject;
        window.globalState.currentTool = null;
    }

    start() {
        $('.btn').mouseup(function () { this.blur() });

        $('.toolbar').on('click', this.delegate.bind(this));
    }

    delegate(event) {

        if (window.globalState.currentTool) {
            $('canvas').off('click');
            $('canvas').off('mousedown');
            $('canvas').off('mousemove');
            $('canvas').off('mouseup');
            $('canvas').off('mouseout');
            $('.toolbar .active').removeClass('active');
            if (event.target.getAttribute('tool') === window.globalState.currentTool.name) {
                window.globalState.currentTool.suspendTool(event);
                return true;
            }
            window.globalState.currentTool.suspendTool(event);
        }

        event.target.classList.add('active');
        this.toolsObject[event.target.getAttribute('tool')].invokeTool(event);
        $('canvas').on('click', (e => { e.stopImmediatePropagation(); window.globalState.currentTool.clickAction(e); }));
        $('canvas').on('mousedown', (e) => window.globalState.currentTool.activateTool(e));
        $('canvas').on('mousemove', (e) => window.globalState.currentTool.toolAction(e));
        $('canvas').on('mouseup', (e) => window.globalState.currentTool.deactivateTool(e));
        $('canvas').on('mouseout', (e) => window.globalState.currentTool.deactivateTool(e));
    }
}
