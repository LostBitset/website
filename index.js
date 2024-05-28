let flip_board = document.getElementsByClassName('flip-board')[0];
let flip_letters = [...flip_board.children];
let flip_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.: ()";

function set_flip_board(text) {
  let to_flip = flip_letters.map((x, i) => ({
    el: x,
    desired: text[i],
    pos: flip_alphabet.indexOf(x.innerText),
  }));
  let interval;
  interval = setInterval(() => {
    let done = [];
    for (const [i, obj] of to_flip.entries()) {
      obj.pos = (obj.pos + 1) % flip_alphabet.length;
      let new_char = flip_alphabet[obj.pos];
      obj.el.innerText = new_char;
      if (new_char === obj.desired) {
        done.push(i);
      }
    }
    let offset = 0;
    for (const i of done) {
      to_flip.splice(i - offset, 1);
      offset++;
    }
    if ((interval !== undefined) && (to_flip.length === 0)) {
      clearInterval(interval);
      console.log("CLEARED INTERVAL :)");
    }
  }, 30);
}

set_flip_board('EEE001');
