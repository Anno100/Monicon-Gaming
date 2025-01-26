import { Snake } from './Snake';
import { Pong } from './Pong';

const openGame = (game: string) => {
    switch(game){
        case 'Snake': Snake.run(); break;
        case 'Pong': Pong.run(); break;
        default: console.log('Game not found');
    }
}

export class Boot{
    constructor(){
        document.body.style.height = (window.innerHeight - 50) + 'px';
        document.body.style.width = (window.innerWidth - 50) + 'px';
        document.querySelector('main')!.style.height = (window.innerHeight - 50) + 'px';
        document.querySelector('main')!.style.width = (window.innerWidth - 50) + 'px';
        document.querySelectorAll('navbar').forEach(e => {
            if(e.classList.contains('exit')){
                let exit = document.createElement('button');
                exit.className = 'Exit';
                exit.innerHTML = 'x';
                exit.onclick = () => window.close();
                e.appendChild(exit);
            }
        })

        /**Set up navbuttons */
        Array.from(document.querySelectorAll('navbar button'))
            .filter(e => !e.classList.contains('Exit'))
            .map(e => e as HTMLButtonElement)
            .forEach(e => {
                e.onclick = () => {
                    document.querySelector('main')!.innerHTML = '';
                    openGame(e.innerHTML);
                }
            })

            Snake.run();
    
        
    }

}