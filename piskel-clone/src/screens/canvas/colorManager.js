export default class colorManager {
    constructor(default_primary, default_secondary) {
        window.globalState.primaryColor = default_primary;
        window.globalState.secondaryColor = default_secondary;
        this.default_primary = default_primary;
        this.default_secondary = default_secondary;
    }

    start() {
        $(".colorbar [tool='primaryColor']")[0].value = this.default_primary;
        $(".colorbar [tool='secondaryColor']")[0].value = this.default_secondary;
        $('.colorbar').on('input', this.delegate.bind(this));
    }

    delegate(event) {
        window.globalState[event.target.getAttribute('tool')] = event.target.value;
        console.log(window.globalState.primaryColor, window.globalState.secondaryColor)
    }
}
