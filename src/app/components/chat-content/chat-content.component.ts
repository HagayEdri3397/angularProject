import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-chat-content',
  standalone: true,
  imports: [ChatMessageComponent, CommonModule,MatProgressSpinnerModule],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatContentComponent {

  constructor(public chatService: ChatService) { }
}
