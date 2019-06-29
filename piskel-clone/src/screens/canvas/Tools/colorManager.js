export default class colorManager {
  constructor(default_primary, default_secondary) {
    window.globalState.primaryColor = default_primary;
    window.globalState.secondaryColor = default_secondary;
    this.default_primary = default_primary;
    this.default_secondary = default_secondary;
  }

  start() {
    $(".colorbar [tool='primaryColor']")[0].value = window.globalState.primaryColor;
    $(".colorbar [tool='secondaryColor']")[0].value = window.globalState.secondaryColor;
    $(".colorbar [tool='primaryColor']")[0].style.backgroundColor = window.globalState.primaryColor;
    $(".colorbar [tool='secondaryColor']")[0].style.backgroundColor = window.globalState.secondaryColor;
    $('.colorbar').on('input', this.delegate.bind(this));
    $('.colorbar').on('click', this.delegate.bind(this));
  }

  delegate(event) {
    if (event.target.getAttribute('tool') === 'swap_colors') {
      let buf = window.globalState.secondaryColor;
      window.globalState.secondaryColor = window.globalState.primaryColor;
      window.globalState.primaryColor = buf;
      $(".colorbar [tool='primaryColor']")[0].value = window.globalState.primaryColor;
      $(".colorbar [tool='primaryColor']")[0].style.backgroundColor = window.globalState.primaryColor;
      $(".colorbar [tool='secondaryColor']")[0].value = window.globalState.secondaryColor;
      $(".colorbar [tool='secondaryColor']")[0].style.backgroundColor = window.globalState.secondaryColor;
      return true;
    }
    window.globalState[event.target.getAttribute('tool')] = event.target.value;
    event.target.style.backgroundColor = window.globalState[event.target.getAttribute('tool')];
  }
}
