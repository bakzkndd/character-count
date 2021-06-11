const { Plugin } = require('powercord/entities');
const { React, getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");

module.exports = class CharacterCount extends Plugin {
  async startPlugin() {

    this.loadStylesheet('./style.css')

    const ChannelTextAreaContainer = await getModule(m => m.default && m.default.displayName === 'SlateCharacterCount');
    
    inject('CharacterCount', getModule(m => m?.default?.displayName === 'SlateCharacterCount'), 'default', (args, res) => {

      return <div className= {`${getModule('characterCount', 'upsell').characterCount} characterCount`}>{`Characters Typed: ${args[0].currentLength}`}</div>
      

    });

    const EditContainer = await getModule(m => m.displayName === 'MessageEditor', false);
    
    inject('EditCharacterCount', EditContainer.prototype, 'render', (args, res) => {

      res.props.children.push(
        React.createElement(
          'div', 
          {className: "CharacterCount", id: "CharacterCount"},
          `Characters Typed: ${res.props.children[0].props.textValue.length}`
        )
      )

      return res

    });
	
  }

  pluginWillUnload() {
	 uninject('CharacterCount')
   uninject('EditCharacterCount')
  }
}