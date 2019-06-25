

export default class toolbarManager {
    constructor(toolsObject) {
        this.toolsObject = toolsObject;
        globalState.currentTool = null;
    }

    start() {
        $('.toolbar').on('click', this.delegate.bind(this));
    }

    delegate(event) {

        if (globalState.currentTool && event.target.getAttribute('tool') === globalState.currentTool.name) {
            console.log(globalState.currentTool, event.target.getAttribute('tool'));
            globalState.currentTool.suspendTool(event);
            $('canvas').off('mousedown');
            $('canvas').off('mousemove');
            $('canvas').off('mouseup');
            $('canvas').off('mouseout');
            return true;
        }
        this.toolsObject[event.target.getAttribute('tool')].invokeTool(event);
        $('canvas').on('mousedown', (e) => globalState.currentTool.activateTool(e));
        $('canvas').on('mousemove', (e) => globalState.currentTool.toolAction(e));
        $('canvas').on('mouseup', (e) => globalState.currentTool.deactivateTool(e));
        $('canvas').on('mouseout', (e) => globalState.currentTool.deactivateTool(e));
    }
}
