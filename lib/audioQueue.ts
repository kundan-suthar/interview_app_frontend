// lib/audioQueue.ts
export class AudioQueue {
  private queue: AudioBuffer[] = [];
  private isPlaying = false;
  private ctx: AudioContext;

  constructor() {
    this.ctx = new AudioContext();
  }

  async enqueue(wavB64: string) {
    try {
      // Resume context if browser suspended it (autoplay policy)
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      const bytes = Uint8Array.from(atob(wavB64), (c) => c.charCodeAt(0));
      const buffer = await this.ctx.decodeAudioData(bytes.buffer);
      this.queue.push(buffer);

      if (!this.isPlaying) this.playNext();
    } catch (err) {
      console.error("AudioQueue enqueue error:", err);
    }
  }

  private playNext() {
    if (!this.queue.length) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const buffer = this.queue.shift()!;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(this.ctx.destination);
    src.onended = () => this.playNext(); // seamless chain
    src.start();
  }

  stop() {
    this.queue = [];
    this.isPlaying = false;
    this.ctx.close().then(() => {
      this.ctx = new AudioContext(); // reset for next session
    });
  }
}