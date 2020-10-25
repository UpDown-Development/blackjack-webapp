import React from "react";
import blackjackGame from "../blackjackGame";
import {deck} from '../utils/blackJackDeck';

function App() {
    return <div>{deck.map((item, key) => {
        return (
            <div><img style={{width: '70px', height: 'auto'}} key={key} src={item.img}/>
                <div>{item.value}</div>
                <div>{item.name}</div>
            </div>
        )
    })}
    </div>;
}

export default App;
