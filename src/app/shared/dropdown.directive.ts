import { Directive, OnInit, HostListener, ElementRef, Renderer2,  HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen(e: Event) {
        this.isOpen = !this.isOpen;
    }
}