const { Plugin } = require('powercord/entities');
const { React, getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
const { findInReactTree } = require("powercord/util");

module.exports = class CharacterCount extends Plugin {
  async startPlugin() {

    const ChannelTextAreaContainer = await getModule(m => m.default && m.default.displayName === 'SlateCharacterCount', false);
    
    inject('CharacterCount', ChannelTextAreaContainer, 'default', (args, res) => {

      return React.createElement(
        'div', 
        {className: "CharacterCount", id: "CharacterCount"},
        `Characters Typed: ${args[0].currentLength}`
      )

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