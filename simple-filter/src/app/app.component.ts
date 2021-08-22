import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface eventsStructure {
  events: string[];
  eventAttributes: string[]
  stringOperations: string[]
  numberOperations: string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'simple-filter';
  event = new FormControl('');
  attribute = new FormControl('Unnamed');
  operation = new FormControl('');
  filteredEvents!: Observable<string[]>;


  attributeAdded: boolean = false;
  operationType: string = 'string';

  eventsList: eventsStructure = {
    events: ["first-event", "second-event", "third-event", "fourth-event"],
    eventAttributes: ["Unnamed", "price", "number of items", "timestamp", "index"],
    stringOperations: ["equal to", "in between", "less than", "greater than"],
    numberOperations: ["equals", "does not equal", "contains", "does not contain"]
  };


  ngOnInit() {
    this.filteredEvents = this.event.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log(this.event.value);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.eventsList.events.filter(event => this._normalizeValue(event).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }

}
