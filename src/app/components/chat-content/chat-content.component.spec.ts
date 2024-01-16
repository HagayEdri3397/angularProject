import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatContentComponent } from './chat-content.component';
import { ChatService } from '../../services/chat.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';

describe('ChatContentComponent', () => {
  let component: ChatContentComponent;
  let fixture: ComponentFixture<ChatContentComponent>;
  let chatServiceSpy: jasmine.SpyObj<ChatService>;

  beforeEach(() => {
    // Create a spy object for ChatService
    chatServiceSpy = jasmine.createSpyObj('ChatService', ['getMessages']);
    
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [],
      providers: [
        { provide: ChatService, useValue: chatServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ChatContentComponent);
    component = fixture.componentInstance;
  });

  it('should render chat messages', () => {
    // Provide some mock messages
    const mockMessages = [
      { sender: 'Alice', content: 'Hello' },
      { sender: 'Bob', content: 'Hi there' },
    ];

    // Set isBusy$ to false, so the spinner won't interfere
    chatServiceSpy.isBusy$ = of(false);

    // Set the messages$ observable directly
    Object.defineProperty(chatServiceSpy, 'messages$', { value: of(mockMessages) });

    // Trigger change detection
    fixture.detectChanges();

    // Query the chat message elements
    const chatMessages = fixture.nativeElement.querySelectorAll('app-chat-message');

    // Assert that the correct number of messages are rendered
    expect(chatMessages.length).toBe(2);
  });

  it('should display a spinner when chatService.isBusy$ is true', () => {
    // Set isBusy$ to true
    chatServiceSpy.isBusy$ = of(true);

    // Trigger change detection
    fixture.detectChanges();

    // Query the spinner element
    const spinner = fixture.nativeElement.querySelector('.spinner');

    // Assert that the spinner is present
    expect(spinner).toBeTruthy();
  });

  it('should not display a spinner when chatService.isBusy$ is false', () => {
    // Set isBusy$ to false
    chatServiceSpy.isBusy$ = of(false);

    // Trigger change detection
    fixture.detectChanges();

    // Query the spinner element
    const spinner = fixture.nativeElement.querySelector('.spinner');

    // Assert that the spinner is not present
    expect(spinner).toBeNull();
  });

  // Add more test cases as needed to cover other aspects of the component's behavior

  afterEach(() => {
    // Clean up and unsubscribe any subscriptions to prevent memory leaks
    fixture.destroy();
  });
});
