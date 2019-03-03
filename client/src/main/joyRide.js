import React from "react";
import Joyride from 'react-joyride';

export default class JoyRide extends React.Component {
  state = {
    steps: [
      {
        target: '#root',
        content:
          <div>
            <div className="big mb-20">VÍTEJTE</div>
            <div className="mb-10">Mapová aplikace zobrazuje dopravní nehodovost na území Brna a dálnice D1.</div>
            <div>Data jsou rozdělená do 2 skupin - pracovní týden a víkend. </div>
          </div>,
        disableBeacon: true,
        placement: "center",
      },
      {
        target: '#layers',
        content: <div>
          <div className="big mb-20">PŘEPÍNAČ VRSTEV</div>
          <div className="mb-10">Zde je možné přepínat mezi vrstvami a nastavovat jejich průhlednost.</div>
          <div className="">Nyní se zobrazuje nehodovost pro pracovní týden.</div>
        </div>,
        placement: "left",
      },
      {
        target: '#legend',
        content: <div>
          <div className="big mb-20">LEGENDA</div>
          <div className="mb-10">Legenda se mění podle aktuálního nastavení v Menu</div>
        </div>,
        placement: "left",
      },
      {
        target: '#menu',
        content: <div>
          <div className="big mb-20">MENU</div>
          <div className="mb-10"> 
          Zde je hlavní nastavení aplikace</div>
        </div>,
        placement: "left",
      },
      {
        target: '#hour-slider',
        content: <div>
          <div className="big mb-20">POSUVNÍK</div>
          <div className="mb-10"> 
          Posuvníkem měníte časový úsek pro který chcete data zobrazit.
           Lze vybrat buď celý den nebo jakýkoliv hodinový interval během dne.
           </div>
        </div>,
        placement: "left",
        spotlightPadding: 10
      },
      {
        target: '#graph-button',
        content: <div>
          <div className="big mb-20">GRAFY</div>
          <div className="mb-10"> 
           Pro aktuálně zobrazenou oblast si můžete nechat vykreslit infografiku s průběhem nehodovosti během dne a rozdělením druhů silnic podle nehodovosti.</div>
        </div>,
        placement: "left",
      },
      {
        target: '#grid-button',
        content: <div>
          <div className="big mb-20">GRID</div>
          <div className="mb-10"> 
           Pro aktuálně zobrazenou oblast lze spočítat grid s celkovým počtem nehod za víkend i pracovní týden.</div>
        </div>,
        placement: "left",
      } 
    ]
  };

  handleJoyrideCallback = data => {
    const { index, status } = data;
    index === 0 && this.props.rightMenuRef.current.onOpen("layers");
    index === 1 && this.props.rightMenuRef.current.onOpen("layers");
    index === 2 && this.props.rightMenuRef.current.onOpen("legend");
    index === 3 && this.props.rightMenuRef.current.onOpen("menu");
    status === 'ready' && this.props.rightMenuRef.current.onOpen("menu");
  };

  render() {
    const { steps } = this.state;

    return (
      <Joyride
        callback={this.handleJoyrideCallback}
        steps={steps}
        scrollToFirstStep={true}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        locale={{ back: 'Zpět', close: 'Zavřít', last: 'Poslední', next: 'Další', skip: 'Přeskočit' }}
        styles={{
          options: {
            primaryColor: '#303F9F',
          }
        }}
        // disableOverlay={true}
        spotlightPadding={0}
      />
    );
  }
}
