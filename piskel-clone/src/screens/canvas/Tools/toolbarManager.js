export default class toolbarManager {
    constructor(toolsObject) {
        this.toolsObject = toolsObject;
        window.globalState.currentTool = null;
    }

    start() {
        $('.btn').mouseup(function () { this.blur() });

        $('.toolbar').on('click', this.delegate.bind(this));
        this.signal = this.signal.bind(this);
    }

    signal() {
        this.tool = window.globalState.currentTool;
        this.tool.invokeTool();
        console.log(this.tool.manager.canvas.style.zIndex);
        $(this.tool.manager.canvas).off('click');
        $(this.tool.manager.canvas).off('mousedown');
        $(this.tool.manager.canvas).off('mousemove');
        $(this.tool.manager.canvas).off('mouseup');
        $(this.tool.manager.canvas).off('mouseout');
        $(this.tool.manager.canvas).on('click', (e => { e.stopImmediatePropagation(); window.globalState.currentTool.clickAction(e); }));
        $(this.tool.manager.canvas).on('mousedown', (e) => window.globalState.currentTool.activateTool(e));
        $(this.tool.manager.canvas).on('mousemove', (e) => window.globalState.currentTool.toolAction(e));
        $(this.tool.manager.canvas).on('mouseup', (e) => window.globalState.currentTool.deactivateTool(e));
        $(this.tool.manager.canvas).on('mouseout', (e) => window.globalState.currentTool.deactivateTool(e));
    }

    delegate(event) {
        this.event = event;
        console.log(window.globalState.currentTool);
        this.tool = new this.toolsObject[event.target.getAttribute('tool')].prototype.constructor();

        console.log(this.tool.manager.canvas.style.zIndex);
        if (window.globalState.currentTool) {
            $(this.tool.manager.canvas).off('click');
            $(this.tool.manager.canvas).off('mousedown');
            $(this.tool.manager.canvas).off('mousemove');
            $(this.tool.manager.canvas).off('mouseup');
            $(this.tool.manager.canvas).off('mouseout');
            $('.toolbar .active').removeClass('active');
            if (event.target.getAttribute('tool') === window.globalState.currentTool.name) {
                window.globalState.currentTool.suspendTool(event);
                return true;
            }
            window.globalState.currentTool.suspendTool(event);
        }
        event.target.classList.add('active');
        this.tool.invokeTool(event);
        $(this.tool.manager.canvas).on('click', (e => { e.stopImmediatePropagation(); window.globalState.currentTool.clickAction(e); }));
        $(this.tool.manager.canvas).on('mousedown', (e) => window.globalState.currentTool.activateTool(e));
        $(this.tool.manager.canvas).on('mousemove', (e) => window.globalState.currentTool.toolAction(e));
        $(this.tool.manager.canvas).on('mouseup', (e) => window.globalState.currentTool.deactivateTool(e));
        $(this.tool.manager.canvas).on('mouseout', (e) => window.globalState.currentTool.deactivateTool(e));
        this.tool = null;
    }


}
