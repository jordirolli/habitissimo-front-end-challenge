/* import dependencies */
import Storage from '../browser/storage';

/* export class definition */
export default class MultiStepFormController {

    constructor(form) {
        this.form = form;
    }

    init() {
        console.log("init()");
        var position = (Storage.retrieve("position") != null)? Storage.retrieve("position") : 1;
        this.currentStep = position;
        console.log("init(): position: " + position);
        this.form.restoreInput();
        this.form.showStep(position);
        this.manageControls(position);
    }

    manageControls(position) {
        switch(position) {
            /* first step */
            case 1:
                this.form.hidePrevious();
                this.form.showNext("Siguiente");
                break;
            /* last step */
            case this.form.getStepsCount():
                this.form.showPrevious();
                this.form.showNext("Solicitar");
                break;
            /* form submited */
            case this.form.getStepsCount() + 1:
                this.form.hidePrevious();
                this.form.hideNext();
                break;
            /* others */
            default:
                this.form.showPrevious();
                this.form.showNext("Siguiente");
        }
    }

    setSubCategoryOptions(options) {
        this.form.setSubCategoryOptions(options);
    }

    previous() {
        console.log("previous()");
        if (this.currentStep <= 1) {
            throw new Error("showPrevious(): First step has already been reached.");
        }
        this.form.hideStep(this.currentStep);
        this.currentStep--;
        this.saveCurrentStep();
        this.form.showStep(this.currentStep);
        this.manageControls(this.currentStep);
    }

    next() {
        console.log("next()");
        if (this.currentStep > this.form.getStepsCount()) {
            throw new Error("next(): Last step has already been reached.");
        }
        this.form.storeInput();
        this.form.hideStep(this.currentStep);
        this.currentStep++;
        this.saveCurrentStep();
        if (this.currentStep > this.form.getStepsCount()) {
            this.submit();
            this.form.showCongratulations();
        } else {
            this.form.showStep(this.currentStep);
        }
        this.manageControls(this.currentStep);
    }

    saveCurrentStep() {
        Storage.store("position", this.currentStep);
    }

    submit() {
        this.form.submitForm();
    }
}