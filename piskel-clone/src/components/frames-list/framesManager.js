export default class framesManager {
    constructor(framesList) {
        this.framesList = framesList;
    }

    html() {
        let str = this.framesList.frames().map((x) => x.html()).join('');
        return `
        <div class='frames'>
            ${str}
            <ul class='framesbar btn-group-vertical'>
                <button tool='newframe'>New frame</button>
            </ul>
        </div>`
    }

    delete() {
        $('.frames').remove();
    }

    bind() {
        $('.frame').on('click', this.chooseFrame.bind(this));
        $('.framesbar').on('click', (event) => {
            if ($(event.target).attr('tool') === 'newframe') {
                this.framesList.createFrame();
            }
        });
    }

    chooseFrame(e) {
        let target = $(e.target).children().eq(0).children().eq(0);
        if (target.text() === window.globalState.currentFrame.count) {
            return true;
        }
        $('.frames-list .active').removeClass('active');

        e.target.classList.add('active');
        this.framesList.editFrame(target.text());
    }
}
