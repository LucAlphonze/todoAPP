import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../service/todo.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo')
  todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput')
  textInput!: ElementRef;

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    console.log(`item ${this.todoProps.id} selected for editing`);
    this.setEditingIdEvent.emit(this.todoProps.id);
  }
  removeTodo(): void {
    this.todoService.removeTodo(this.todoProps.id);
  }
  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id);
  }
  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('change text');
  }
  changeTodo(): void {
    console.log('change todo', this.editingText);
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
