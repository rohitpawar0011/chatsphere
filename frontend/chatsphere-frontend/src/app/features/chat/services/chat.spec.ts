
import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain three conversations', () => {
    expect(service.conversations().length).toBe(3);
  });

  it('should select Amit by default', () => {
    expect(service.selectedConversation()?.name)
      .toBe('Amit Kumar');
  });
});
