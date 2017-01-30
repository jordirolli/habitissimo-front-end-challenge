/* export class definition */
export default class Step {

    constructor(marker, form) {
        this.marker = marker;
        this.form = form;
    }

    show() {
        this.marker.addClass("active");
        this.form.show();
    }

    hide() {
        this.marker.removeClass("active");
        this.form.hide();
    }
}