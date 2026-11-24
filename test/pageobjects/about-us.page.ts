import Page from './page'

class AboutUsPage extends Page {
    public get btnAboutNav() {
        return $('a[data-target="#videoModal"]')
    }

    public get modal() {
        return $('#videoModal')
    }

    public get btnClose() {
        return $('button[data-dismiss="modal"]')
    }

    public get btnPlayVideo() {
        return $('button.vjs-big-play-button')
    }

    public get btnFullscreen() {
        return $('button.vjs-fullscreen-control')
    }
    public get videoProgressBar() {
        return $('div.vjs-progress-holder')
    }
}

export default new AboutUsPage()

