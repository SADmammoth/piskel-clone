let currentTool;

export default class Tool {
    constructor(name, canvasManager) {
        this.name = name;
        this.is_Acting = false;
        this.manager = canvasManager;
    }

    invokeTool(event, startAction) {
        if (currentTool) {
            currentTool.suspendTool(event);
        }
        currentTool = this;
        startAction(event);
        this.is_Acting = true;
    }

    toolAction(event, intimeActions) {
        if (this.is_Acting) {
            intimeActions(event);
        }
    }
    suspendTool(event, stopAction) {
        this.is_Acting = false;
        stopAction(event);
    }
};
