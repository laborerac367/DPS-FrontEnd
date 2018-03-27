import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { EventService } from './core-module/event.service';

@Component({
    templateUrl: './add-job.component.html'
})
export class AddJobComponent implements OnInit {
    form: FormGroup;
    id = -1;
    name = '';
    startTime = null;
    endTime = null;
    eventId = null;

    constructor(private modalRef: BsModalRef, private fb: FormBuilder, private eventService: EventService) {}

    ngOnInit() {
        this.form = this.fb.group({
            name: [this.name, Validators.minLength(5)],
            startTime: new Date(this.startTime),
            endTime: new Date(this.endTime)
        });
    }

    isEditing() {
        return !(this.id === -1);
    }

    addJob(jobVal) {
        this.eventService.addJob(this.eventId, jobVal).subscribe(
            resp => {
                this.modalRef.hide();
            },
            err => {

            }
        );
    }

    editJob(jobVal) {
        this.eventService.updateJob(this.eventId, this.id, jobVal).subscribe(
            resp => {
                this.modalRef.hide();
            },
            err => {

            }
        );
    }

    close() {
        this.modalRef.hide();
    }

}
