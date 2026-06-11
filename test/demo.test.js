import test from 'node:test';
import assert from 'node:assert/strict';

test('the demo renders typed and randomly generated names', async () => {
  const classes = new Set();
  const input = {
    value: '',
    focused: false,
    addEventListener(event, callback) {
      assert.equal(event, 'input');
      this.onInput = callback;
    },
    focus() {
      this.focused = true;
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
  const randomNameButton = {
    addEventListener(event, callback) {
      assert.equal(event, 'click');
      this.onClick = callback;
    }
  };

  globalThis.document = {
    querySelector(selector) {
      return {
        '#full-name': input,
        '#masked-name': output,
        '#random-name': randomNameButton
      }[selector];
    }
  };

  const originalRandom = Math.random;
  Math.random = () => 0;

  await import('../app.js');

  assert.match(output.innerHTML, /Your masked name will appear here/);
  input.value = 'Ravi s/o Kumar';
  input.onInput();
  assert.equal(output.textContent, 'RaXX s/X KumXX');
  assert.equal(classes.has('has-value'), true);

  randomNameButton.onClick();
  assert.equal(input.value, 'Aisyah Binte Rahman');
  assert.equal(output.textContent, 'AisXXX BinXX RahXXX');
  assert.equal(input.focused, true);

  randomNameButton.onClick();
  assert.equal(input.value, 'Ananya Nair');
  assert.equal(output.textContent, 'AnaXXX NaXX');

  input.value = '';
  input.onInput();
  assert.equal(classes.has('has-value'), false);

  Math.random = originalRandom;
  delete globalThis.document;
});
