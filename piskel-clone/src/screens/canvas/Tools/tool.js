export default class Tool {
    constructor(name, canvasManager) {
        this.name = name;
        this.is_Acting = false;
        this.manager = canvasManager;
        window.globalState.currentTool = {};
    }

    activateTool(event, startAction) {
        startAction(event);
        this.is_Acting = true;
    }

    invokeTool(event, invoke) {
        if (window.globalState.currentTool) {
            window.globalState.currentTool.suspendTool(event);
        }
        window.globalState.currentTool = this;
        if (invoke) {
            invoke(event);
        }
    }

    toolAction(event, intimeActions) {
        if (this.is_Acting) {
            intimeActions(event);
        }
    }

    suspendTool(event, suspend) {
        window.globalState.currentTool = null;
        if (suspend) {
            suspend(event);
        }
    }

    deactivateTool(event, stopAction) {
        this.is_Acting = false;
        stopAction(event);
    }
}
