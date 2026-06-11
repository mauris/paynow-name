import test from 'node:test';
import assert from 'node:assert/strict';

test('the demo renders a masked result whenever its input changes', async () => {
  const classes = new Set();
  const input = {
    value: '',
    addEventListener(event, callback) {
      assert.equal(event, 'input');
      this.onInput = callback;
    }
  };
  const output = {
    textContent: '',
    innerHTML: '',
    classList: {
      add(className) {
        classes.add(className);
      },
      remove(className) {
        classes.delete(className);
      }
    }
  };

  globalThis.document = {
    querySelector(selector) {
      return selector === '#full-name' ? input : output;
    }
  };

  await import('../app.js');

  assert.match(output.innerHTML, /Your masked name will appear here/);
  input.value = 'Ravi s/o Kumar';
  input.onInput();
  assert.equal(output.textContent, 'RaXX s/X KumXX');
  assert.equal(classes.has('has-value'), true);

  input.value = '';
  input.onInput();
  assert.equal(classes.has('has-value'), false);

  delete globalThis.document;
});
