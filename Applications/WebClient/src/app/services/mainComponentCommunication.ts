import { EventEmitter } from '@angular/core';

export class MainComponentService {
    emitter = new EventEmitter<string>();
    emitValue() {
        this.emitter.emit();
    }
}