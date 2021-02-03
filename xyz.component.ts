import { Component, OnInit } from '@angular/core';
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
// import { telnet } from 'telnet'

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.initTerm();
  }

  initTerm() {
    // const term = new Terminal({
    //   fontSize: 14,
    //   // cursorBlink: true
    // });
    const term = new Terminal({
      fontSize: 14,
      cursorBlink: true
    });
    // const attachAddon = new AttachAddon(this.socket);
    const fitAddon = new FitAddon();
    // term.loadAddon(attachAddon);
    term.loadAddon(fitAddon);
    term.open(document.getElementById('xterm'));
    fitAddon.fit();
    term.write('Hello $')
    // term.on('data', (data) => {
    //   term.write(data);
    // });
    let curr = '';
    let coordinate = 0;
    term.onKey(function (data) {
      console.dir(data.domEvent.keyCode)
      if (data.domEvent.keyCode == 13) {
        term.write('\n');
        term.write(data.key);
        console.log(curr);
        curr = '';
      } else if (data.domEvent.keyCode == 8 || data.domEvent.keyCode == 46) {

        if(coordinate != 0){
          // curr = curr.substring(0, curr.length - coordinate) + data.key + curr.substring(curr.length - coordinate + 1);
          // console.log(curr)
          // coordinate = coordinate - 1;
          // term.write(data.key);
        }else{
          if (curr) {
            curr = curr.slice(0, -1);
          }
          console.log(curr);
          term.write('\b \b');
        }



      } else if (data.domEvent.keyCode == 37) {
        if (coordinate < curr.length) {
          coordinate = coordinate + 1;
          console.log(curr.length);
          console.log(coordinate);
          term.write(data.key);
        }

      } else if (data.domEvent.keyCode == 39) {

        if(coordinate > 0){
          coordinate = coordinate - 1;
          console.log(coordinate);
          term.write(data.key);
        }

      } else if (data.domEvent.keyCode == 40 || data.domEvent.keyCode == 38) {
        console.log('123');
      } else {
        if(coordinate != 0){
          curr = curr.substring(0, curr.length - coordinate) + data.key + curr.substring(curr.length - coordinate + 1);
          console.log(curr)
          coordinate = coordinate - 1;
          term.write(data.key);
        }else{
          curr = curr + data.key;
          term.write(data.key);
        }

      }

    });
    // term.textarea.onkeypress = function (e) {
    //   term.write(String.fromCharCode(e.keyCode)); 
    // }



  }


}
