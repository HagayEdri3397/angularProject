import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-user-message-input',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-message-input.component.html',
  styleUrl: './user-message-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMessageInputComponent {
  constructor(public chatService: ChatService) {
    
    // Subscribe to userInput changes and chat service isBusy$ observable. 
    // with map operator i return a boolean that checks if the user input is not empty and the chat service is not busy
    // in this case i can send the message
    combineLatest([
      this.userInput.valueChanges,
      this.chatService.isBusy$,
    ]).pipe(
      map(([message, isBusy]: [string, boolean]) => message.trim().length > 0 && !isBusy)
    ).subscribe(this.canSendMessage$)
  }

  userInput = new FormControl<string>('',{nonNullable: true}); 
  canSendMessage$ = new BehaviorSubject<boolean>(false);
    
  // Send the user messsage to the chat service
  sendMessage(): void {
    if (this.canSendMessage$.value) {
      this.chatService.sendMessage(this.userInput.value);
      this.userInput.setValue('');
    }
  }
}
