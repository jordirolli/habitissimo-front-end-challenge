/* import dependencies */
import $ from 'jquery';
import Step from './step';
import Storage from '../browser/storage';

/* export class definition */
export default class MultiStepForm {
    /*
    * This function does initialise the inner parameters of this class.
    * @param {String} form_selector: The selector to retrieve the form DOM element.
    * Notice that the multi step form is based on the following conventions:
    * * Each step has a header/marker of the step on a li element under a wrapper ul with id="progressbar".
    * * Each step is wrapped under a container with id="step-N" where N represents the position of the step.
    */
    constructor(form_selector) {

        console.log("Performing initialization of the multi step form.");

        /* Init variables pointing to the DOM elements */
        this.form = $(form_selector);
        this.progressbar = this.form.find("ul#progressbar");
        this.markers = this.progressbar.children();
        this.field_sets = this.form.find("fieldset");
        this.congratulations = this.form.find("div#congratulations");
        this.previous = this.form.find("input#previous");
        this.next = this.form.find("input#next");
        this.submit = this.form.find("input#submit");
        this.stepsCount = this.markers.length;
        console.log(this.stepsCount + " steps found.");

        this.fields = {
            description: this.form.find("#description"),
            estimated_date: this.form.find("#estimated-date"),
            price_preference: this.form.find("#price-preference"),
            category: this.form.find("#category"),
            subcategory: this.form.find("#subcategory"),
            name: this.form.find("#name"),
            email: this.form.find("#email"),
            phone: this.form.find("#phone")
        }

        if (this.markers.length != this.field_sets.length) {
            throw new Error("init(): The amount of markers should match the amount of steps.");
        }

        this.steps = [];
        var count = 0;
        while (count < this.stepsCount) {
            var step = new Step($(this.markers[count]), $(this.field_sets[count]));
            this.steps.push(step);
            count++;
        }

        console.log("steps: " + this.steps);
    }


    getStepsCount() {
        return this.stepsCount;
    }

    storeInput() {
        $.map(this.fields, function(value, key) {
            if (value.val() && value.val() != null) {
                Storage.store(key, value.val());
            }
        });
    }

    restoreInput() {
        $.map(this.fields, function(field, parameter) {
                field.val(Storage.retrieve(parameter));
            }
        );
    }

    setSubCategoryOptions(options) {
        this.fields["subcategory"].find('option').remove();
        this.fields["subcategory"].append($('<option>', {value: "", text: "Seleccionar"}));
        this.fields["subcategory"].append(options);
    }

    showStep(position) {
        if (position <= 0 || position > this.stepsCount) {
            throw new Error("showStep(" + position + "): Position out of bounds: [1," + this.stepsCount + "]");
        }
        this.steps[position-1].show();
    }

    hideStep(position) {
        if (position <= 0 || position > this.stepsCount) {
            throw new Error("showStep(" + position + "): Position out of bounds: [1," + this.stepsCount + "]");
        }
        this.steps[position-1].hide();
    }

    showCongratulations() {
        this.congratulations.show();
    }

    showPrevious() {
        this.previous.show();
    }

    hidePrevious() {
        this.previous.hide();
    }

    showNext(label) {
        this.next.attr("value", label);
        this.next.show();
    }

    hideNext() {
        this.next.hide();
    }

    submitForm() {
        console.log("Form submited!");
        this.form.submit();
    }
}