export default class framesManager {
    constructor(framesList) {
        this.framesList = framesList;
    }

    html() {
        let str = `
        <div class='frames'>
            <ul class='framesbar btn-group-vertical'>
                <button tool='newframe'>New frame</button>
            </ul>
        </div>`;
        $('body').append(str);
        this.framesList.frames().map((x) => x.html());
    }

    delete() {
        $('.frames').remove();
    }

    bind() {
        $('.preview').css('--i', window.globalState.unit_width);
        $('.preview').css('--w', '100px');
        $('.frame').on('click', this.chooseFrame.bind(this));
        $('.framesbar').on('click', (event) => {
            if ($(event.target).attr('tool') === 'newframe') {
                this.framesList.createFrame();
            }
        });
    }

    chooseFrame(e) {
        if (e.target.classList.contains('btn')) {
            let target = $(e.target).find('span');
            if (target.text() === window.globalState.currentFrame.count) {
                return true;
            }
            $('.frames-list .active').removeClass('active');

            e.target.classList.add('active');
            this.framesList.editFrame(target.text());
        }
    }
}
