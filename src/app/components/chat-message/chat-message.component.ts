import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from '../../models/message';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Sender } from '../../models/senderType';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChatMessageComponent {
  @Input() message: Message | undefined;
  Sender = Sender;
}
