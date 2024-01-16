import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, finalize } from 'rxjs';
import { Message } from '../models/message';
import { Sender } from '../models/senderType';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  // Observable that emits the chat messages history 
  private _messages$ = new BehaviorSubject<Message[]>([]);
  messages$ = this._messages$.asObservable();

  // Observable that emits if the chat service is busy with generating AI response
  _isBusy$ = new BehaviorSubject<boolean>(false);
  isBusy$ = this._isBusy$.asObservable();

  constructor() {
    this._messages$.next(this.getMockData());
  }

  // Get user message and 
  sendMessage(userMessage: string): void {
    // automaticly trigger user message. before generating AI response
    const newMessage: Message = {
      content: userMessage,
      sender: Sender.MySelf,
    };
    this._messages$.next([...this._messages$.value, newMessage]);

    // Simulate AI response after a delay (current simulated delay is 2 seconds)
    this._isBusy$.next(true);
    let aiResponse: Message = {
      content: ``,
      sender: Sender.Bot,
    };

    // Simulate AI API response
    this.getAiResponse(userMessage)
      .pipe(
        finalize(() => {
          this._isBusy$.next(false);
          this._messages$.next([...this._messages$.value, aiResponse]);
        })
      )
      .subscribe({
        next: (result) => {
          aiResponse.content = result;
        },
        error: () => {
          aiResponse.content = `Failed to generate result to message ${userMessage}`;
        },
      });
  }

  // Simulate AI API response on  user message
  getAiResponse(userMessage: string): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      setTimeout(() => {
        // Simulate a successful response
        observer.next(`Mock response on ${userMessage}`);
        observer.complete();
      }, 2000);
    });
  }

  getMockData(): Message[] {
    const newMessage1: Message = {
      content: 'Hi robot!',
      sender: Sender.MySelf,
    };
    const newMessage2: Message = {
      content: 'Hi human!',
      sender: Sender.Bot,
    };
    const newMessage3: Message = {
      content: 'Hello, how are you?',
      sender: Sender.MySelf,
    };
    const newMessage4: Message = {
      content: 'Im good, thank you!',
      sender: Sender.Bot,
    };
    return [newMessage1, newMessage2, newMessage3, newMessage4];
  }
}
