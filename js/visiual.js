var s = window.screen;
var width = skillbg.width = s.width;
var height = skillbg.height = s.height;
var letters = Array(256).join(1).split('');
var draw = function () {
  skillbg.getContext('2d').fillStyle='rgba(0,0,0,.05)';
  skillbg.getContext('2d').fillRect(0,0,width,height);
  skillbg.getContext('2d').fillStyle='#0F0';
  letters.map(function(y_pos, index){
    text = String.fromCharCode(3e4+Math.random()*33);
    x_pos = index * 10;
    skillbg.getContext('2d').fillText(text, x_pos, y_pos);
    letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
  });
};
setInterval(draw, 33);