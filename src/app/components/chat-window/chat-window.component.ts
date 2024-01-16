import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserMessageInputComponent } from '../user-message-input/user-message-input.component';
import { ChatContentComponent } from '../chat-content/chat-content.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ChatContentComponent, UserMessageInputComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChatWindowComponent {
}
