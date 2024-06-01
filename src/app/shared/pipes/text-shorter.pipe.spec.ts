import { TextShorterPipe } from './text-shorter.pipe';

describe('TextShorterPipe', () => {
  it('create an instance', () => {
    const pipe = new TextShorterPipe();
    expect(pipe).toBeTruthy();
  });
});
