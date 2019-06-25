export default class Tool {
    constructor(name, canvasManager) {
        this.name = name;
        this.is_Acting = false;
        this.manager = canvasManager;
        globalState.currentTool = {};
    }

    activateTool(event, startAction) {
        startAction(event);
        this.is_Acting = true;
    }

    invokeTool(event, invoke) {
        if (globalState.currentTool) {
            globalState.currentTool.suspendTool(event);
        }
        globalState.currentTool = this;
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
        globalState.currentTool = null;
        if (suspend) {
            suspend(event);
        }
    }

    deactivateTool(event, stopAction) {
        this.is_Acting = false;
        stopAction(event);
    }
};
