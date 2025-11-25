(function (Scratch) {
  'use strict';

  /**
   * Custom Builders Assembly
   * Old ID: serializesystemplus15
   * ID: custombuildersassembly
   * Old Name: Serialization System+ v15 (Ultimate)
   * Name: Custom Builders Assembly
   * Author: TheJavaScripter
   *
   * - Contiene TODOS los bloques para mejorar tu proyecto
   * - Retrocompatibilidad (aliases)
   * - Bloques de guardado/carga/get saved/clear
   * - Implementaciones seguras / stubs donde corresponde
   */

  class CBA {
    constructor(runtime) {
      this.runtime = runtime;

      // Core storage
      this.STORAGE = {
        vars: {},            // variables
        builders: {},        // open builder buffers
        builderStack: [],    // stack for builders
        buffers: {},         // binary buffers (Uint8Array)
        lambdas: {},         // named lambdas
        functions: {},       // function bodies (stubs)
        classes: {},
        customBlocks: {},    // user-defined custom blocks metadata
        symbols: {},         // created symbols
        savedData: null,     // last saved payload (string)
        logs: [],
        listmaps: {},  // lists can created
        appEnum: {},
      };

      this._returnValue = '';
      this._console = '';
      this._STACKvalue = '';
    }

    getInfo() {
      return {
        id: 'custombuilderassembly',
        name: 'Custom Builder Assembly',
        color1: '#276edb',
        blockIconURI: 'data:image/png;base64,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',
        blocks: [
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'functions'
          },

          {
  opcode: 'setReturnValue',
  blockType: Scratch.BlockType.COMMAND,
  text: 'return [VALUEr]',
  arguments: {
    VALUEr: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: '0'
    }
  },
  func: 'setReturnValue',
  isTerminal: true,
},

        {
          opcode: 'myReporterFunc',
          blockType: Scratch.BlockType.REPORTER,
          blockShape: Scratch.BlockShape.SQUARE,
          text: 'function',
          arguments: {},
          disableMonitor: true,
        },
          
          // --- Experimental ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'operators'
          },
          {
            opcode: 'selecttrig',
            blockType: Scratch.BlockType.REPORTER,
            text: 'calc [Menutrig] in number [NUM]',
            arguments: 
            {
             Menutrig: {type: Scratch.ArgumentType.STRING, menu: 'trigmenu'},
             NUM: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },
          {
           opcode: 'basearray',
           blockType: Scratch.BlockType.REPORTER,
           text: 'BaseArray [array]',
           arguments: 
           {
            array: {type: Scratch.ArgumentType.STRING, defaultValue: '["a","b","c"]'}
           }
          },

          {
           opcode: 'timer',
           blockType: Scratch.BlockType.REPORTER,
           text: 'timer',
           arguments: {}
          },

          {
            opcode: 'sin',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sin [Sin]',
            arguments: 
            {
             Sin: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            colour: '#4CBF5F'
          },

          {
            opcode: 'tan',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tan [Tan]',
            arguments: 
            {
             Tan: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            colour: '#4CBF5F'
          },

          {
            opcode: 'cos',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cos [Cos]',
            arguments: 
            {
             Cos: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            colour: '#4CBF5F'
          },

          {opcode: 'add', blockType: Scratch.BlockType.REPORTER, text: '[NUM1] + [NUM2]', arguments: {NUM1: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},

          {opcode: 'subtract', blockType: Scratch.BlockType.REPORTER, text: '[NUM1s] - [NUM2s]', arguments: {NUM1s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},

          {opcode: 'multiply', blockType: Scratch.BlockType.REPORTER, text: '[NUM1m] * [NUM2m]', arguments: {NUM1m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},

          {opcode: 'divide', blockType: Scratch.BlockType.REPORTER, text: '[NUM1d] / [NUM2d]', arguments: {NUM1d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},
        
          {opcode: 'module', blockType: Scratch.BlockType.REPORTER, text: '[NUM1mo] % [NUM2mo]', arguments: {NUM1mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}, colour: '#4CBF5F'},
          {
            opcode: 'sinh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sinh [Sinh]',
            arguments: 
            {
             Sinh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            colour: '#4CBF5F'
          },

          {
            opcode: 'cosh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cosh [Cosh]',
            arguments: 
            {
             Cosh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            colour: '#4CBF5F'
          },

          {
            opcode: 'tanh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tanh [Tanh]',
            arguments: 
            {
             Tanh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            colour: '#4CBF5F'
          },

          {
            opcode: 'negNumber',
            blockType: Scratch.BlockType.REPORTER,
            text: '- [NUMneg]',
            arguments: {NUMneg: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
            colour: '#4CBF5F'
          },

          {
            opcode: 'pownumber',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NUM1pow] ^ [NUM2pow]',
            arguments: {NUM1pow: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}, NUM2pow: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
            colour: '#4CBF5F'
          },
          {
            opcode: 'sqrt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sqrt [Sqrt]',
            arguments:
            {
             Sqrt: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'cbrt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cbrt [Cbrt]',
            arguments:
            {
             Cbrt: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'fixnumber',
            blockType: Scratch.BlockType.REPORTER,
            text: 'fix [NUMfix]',
            arguments: {NUMfix: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5}},
            colour: '#4CBF5F'
          },
          {
            opcode: 'floordiv',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NUM1fd] // [NUM2fd]',
            arguments: {NUM1fd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}, NUM2fd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5}},
            colour: '#4CBF5F'
          },

          {
            opcode: 'lists',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set List C [Name] = [Value]',
            arguments: 
            {
             Name: {type: Scratch.ArgumentType.STRING, defaultValue: 'list'},
             Value: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
            }
          },

          {
            opcode: 'True',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'true',
            arguments: {},
            colour: '#4CBF5F'
          },

          {
            opcode: 'False',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'false',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'ioDevices helpers'
          },
          {
            opcode: 'lastkey',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last key pressed',
            arguments: {},
          },
          {
            opcode: 'mousex',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mouse x',
            arguments: {},
          },
          {
            opcode: 'mousey',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mouse y',
            arguments: {},
          },
          {
            opcode: 'mouseisdown',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'mouse down?',
            arguments: {},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'text helpers'
          },
          {
            opcode: 'Join',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [word1] to [word2]',
            arguments: 
            {
              word1: {type: Scratch.ArgumentType.STRING, defaultValue: 'hello'},
              word2: {type: Scratch.ArgumentType.STRING, defaultValue: 'world'},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'jmp',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'new line',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'labels'
          },
          {
            opcode: 'label',
            blockType: Scratch.BlockType.COMMAND,
            text: '// [textlabel]',
            arguments: {textlabel: {type: Scratch.ArgumentType.STRING, defaultValue: 'text'}}
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'vars'
          },
          // --- Core variables & aliases ---
          { opcode: 'set_var_c', blockType: Scratch.BlockType.COMMAND, text: 'Set var C [NAME] = [VALUE]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'var' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'var_c', blockType: Scratch.BlockType.REPORTER, text: 'Var C [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'var' } } },

           {
            blockType: Scratch.BlockType.LABEL,
            text: 'logic'
          },
          {
            opcode: 'equalto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1e] = [NUM2e]',
            arguments: 
            {
              NUM1e: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2e: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            },
            colour: '#4CBF5F'
          },

           {
            opcode: 'majorto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1ma] > [NUM2ma]',
            arguments: 
            {
              NUM1ma: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2ma: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            },
            colour: '#4CBF5F'
          },

           {
            opcode: 'minorto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1mi] < [NUM2mi]',
            arguments: 
            {
              NUM1mi: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2mi: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            },
            colour: '#4CBF5F'
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'values'
          },
          {
            opcode: 'nothingstring',
            blockType: Scratch.BlockType.REPORTER,
            text: 'nil',
            arguments: {},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'branchs'
          },
          {
            opcode: 'branch',
            blockType: Scratch.BlockType.LOOP,
            text: '[menubranch] branch',
            arguments: {menubranch: {type: Scratch.ArgumentType.STRING, menu: 'branchmenu', defaultValue: "true"}},
            isTerminal: true,
          },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'old vars'
          },
          // legacy names (retrocompatibility)
          { opcode: 'setVarC', blockType: Scratch.BlockType.COMMAND, text: 'Set var C [NAME] = [VALUE]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'nombre' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'valor' } } },
          { opcode: 'getVarC', blockType: Scratch.BlockType.REPORTER, text: 'Var C [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'nombre' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'computer logic'
          },
          {
            opcode: 'and',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1a] and [VAL2a]',
            arguments: 
            {
              VAL1a: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2a: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'or',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1o] or [VAL2o]',
            arguments: 
            {
              VAL1o: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2o: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
           {
            opcode: 'xor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1x] xor [VAL2x]',
            arguments: 
            {
              VAL1x: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2x: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
            {
            opcode: 'xnor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1xn] xnor [VAL2xn]',
            arguments: 
            {
              VAL1xn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2xn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
           {
            opcode: 'nor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1no] nor [VAL2no]',
            arguments: 
            {
              VAL1no: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2no: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'not',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'not [VALn]',
            arguments: 
            {
              VALn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'math constants'
          },
          {
            opcode: 'pi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'π',
            arguments: {},
            colour: '#4CBF5F'
          },
           {
            opcode: 'euler',
            blockType: Scratch.BlockType.REPORTER,
            text: 'e',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            opcode: 'phi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'φ',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'modifiers helper'
          },
          {
            opcode: 'tostring',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'string [text1s]',
            arguments: {text1s: {type: Scratch.ArgumentType.STRING, defaultValue: 'Hello world!'}}
          },
          {
            opcode: 'tonumber',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'number [text1n]',
            arguments: {text1n: {type: Scratch.ArgumentType.STRING, defaultValue: '10'}}
          },
          {
            opcode: 'toboolean',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'boolean [text1b]',
            arguments: {text1b: {type: Scratch.ArgumentType.STRING, defaultValue: 'true'}}
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'maps'
          },
          {
            opcode: 'createmap',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create map [NAMEmap]',
            arguments: {NAMEmap: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
            colour: '#EE7D16'
          },
          {
            opcode: 'createitem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create item to [mapname] with value [Valueitem]',
            arguments: {mapname: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, Valueitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             colour: '#EE7D16'
          },
          {
            opcode: 'deleteitem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete item to [mapnamed] with idx [Valueitemd]',
            arguments: {mapnamed: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, Valueitemd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}},
             colour: '#EE7D16'
          },
          {
            opcode: 'lengthmap',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'length of map [maplist]',
            arguments: {maplist: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
             colour: '#EE7D16'
          },
          {
            opcode: 'itemofmap',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'item [idxitem] of map [mapitem]',
            arguments: {mapitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, idxitem: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}},
             colour: '#EE7D16'
          },
          {
            opcode: 'idx2item4map',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'idx of item [idxmapitem] of map [mapidx]',
            arguments: {mapidx: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, idxmapitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             colour: '#EE7D16'
          },
          {
            opcode: 'itemexists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'item [existsitem] exists of map [mapdef]?',
            arguments: {mapdef: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, existsitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             colour: '#EE7D16'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Enum on apps'
          },
          {
            opcode: 'arequire',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'require: save [textreq] to [required]',
            arguments: {textreq: {type: Scratch.ArgumentType.STRING, defaultValue: 'express'}, required: {type: Scratch.ArgumentType.STACK, defaultValue: ''}}
          },
          {
             opcode: 'torequire',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'require: see [textreq1]',
            arguments: {textreq1: {type: Scratch.ArgumentType.STRING, defaultValue: 'express'}}
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'key and value helpers'
          },
          // --- Key/Value helpers ---
          { opcode: 'get_key_value', blockType: Scratch.BlockType.REPORTER, text: 'Get key [KEY] value [VALUE]', arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'key' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'value' } } },
          { opcode: 'string_value', blockType: Scratch.BlockType.REPORTER, text: 'String [VALUE]', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'text' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'classes and anonymous'
          },
          // --- Classes / anonymous ---
          { opcode: 'class_block', blockType: Scratch.BlockType.COMMAND, text: 'Class [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyClass' } } },
          { opcode: 'anonymous_class', blockType: Scratch.BlockType.LOOP, text: 'Anonymous class' },
          { opcode: 'anonymous_class_extends', blockType: Scratch.BlockType.LOOP, text: 'Anonymous class extends [BASE]', arguments: { BASE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Object' } } },
          { opcode: 'get_value_of_class', blockType: Scratch.BlockType.REPORTER, text: 'get value of class [CLASSNAME]', arguments: { CLASSNAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyClass' } } },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'OOP'
          },
          {
            opcode: 'new_class',
            blockType: Scratch.BlockType.COMMAND,
            text: 'def class [nameclass]',
            arguments: {nameclass: {type: Scratch.ArgumentType.STRING, defaultValue: 'Build'}},
          },
          {
            opcode: 'Methods',
            blockType: Scratch.BlockType.LOOP,
            text: 'method. name [NAME] args [ARGS]',
            arguments: {NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, ARGS: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}}
          },
          {
            opcode: 'argmethod',
            blockType: Scratch.BlockType.REPORTER,
            text: 'method args. class [NAME], method: [NAME1]',
            arguments: {NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'Build'}, NAME1: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
          },

           {
            blockType: Scratch.BlockType.LABEL,
            text: 'builders'
          },
          // --- Builders: arrays, objects, xml, sets, functions, lambdas ---
          {
            opcode: 'tothis',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'this [buildername]',
            arguments: {buildername: {type: Scratch.ArgumentType.STRING, defaultValue: 'result'}},
            disableMonitor: true,
          },
          { opcode: 'set_builder', blockType: Scratch.BlockType.LOOP, text: 'set builder' },
          { opcode: 'blank_set', blockType: Scratch.BlockType.REPORTER, text: 'blank set' },
          { opcode: 'array_builder', blockType: Scratch.BlockType.LOOP, text: 'Array builder' },
          { opcode: 'object_builder', blockType: Scratch.BlockType.LOOP, text: 'Object builder' },
          { opcode: 'xml_builder', blockType: Scratch.BlockType.LOOP, text: 'XML builder' },
          { opcode: 'function_builder', blockType: Scratch.BlockType.LOOP, text: 'function builder [NAME] then', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'fn' } } },
          { opcode: 'create_lambda', blockType: Scratch.BlockType.LOOP, text: 'create lambda [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'lambda1' } } },
          { opcode: 'sets_builder', blockType: Scratch.BlockType.LOOP, text: 'Sets builder' },
          { opcode: 'array_builder_alt', blockType: Scratch.BlockType.LOOP, text: 'Array builder alt' /** bro, then this block its named "Array bulider" bruh*/},
          { opcode: 'append_to_builder', blockType: Scratch.BlockType.COMMAND, text: 'append [VALUE] to builder', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'item' } } },
          { opcode: 'end_builder', blockType: Scratch.BlockType.COMMAND, text: 'end builder save as [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'result' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'set helpers'
          },
          // --- Set helpers ---
          { opcode: 'set_has', blockType: Scratch.BlockType.REPORTER, text: 'set [SETNAME] has [VALUE]?', arguments: { SETNAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'mySet' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'item' } } },
          { opcode: 'set_delete', blockType: Scratch.BlockType.COMMAND, text: 'delete [VALUE] from set [SETNAME]', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'item' }, SETNAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'mySet' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'I/O'
          },
          // --- Parse / Serialize / Formats ---
          { opcode: 'parse_in_data', blockType: Scratch.BlockType.REPORTER, text: 'parse [TYPE] in data [DATAREF]', arguments: { TYPE: { type: Scratch.ArgumentType.STRING, menu: 'parseTypes', defaultValue: 'JSON' }, DATAREF: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'save_data', blockType: Scratch.BlockType.COMMAND, text: 'save data [FORMAT]', arguments: { FORMAT: { type: Scratch.ArgumentType.STRING, menu: 'formats', defaultValue: 'JSON' } } },
          { opcode: 'get_saved_data', blockType: Scratch.BlockType.REPORTER, text: 'get saved data' },
          { opcode: 'load_data', blockType: Scratch.BlockType.COMMAND, text: 'load data [DATA]', arguments: { DATA: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'clear_data', blockType: Scratch.BlockType.COMMAND, text: 'clear saved data' },
          { opcode: 'csv_block', blockType: Scratch.BlockType.REPORTER, text: 'CSV [DATA]', arguments: { DATA: { type: Scratch.ArgumentType.STRING, defaultValue: 'data' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'types'
          },
          // --- Typeof / Symbol / New object / Create symbol ---
          { opcode: 'typeof_block', blockType: Scratch.BlockType.REPORTER, text: 'typeof [TYPE]', arguments: { TYPE: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyClass' } } },
          { opcode: 'create_symbol', blockType: Scratch.BlockType.REPORTER, text: 'create a symbol' },
          { opcode: 'new_object', blockType: Scratch.BlockType.REPORTER, text: 'New object' },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'calls, functions, returns'
          },
          // --- Functions / Calls / Construct / Return / Call function ---
          { opcode: 'call_function', blockType: Scratch.BlockType.COMMAND, text: 'Call function [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'fn' } } },
          { opcode: 'construct_block', blockType: Scratch.BlockType.COMMAND, text: 'Construct [TYPE] with [DATA]', arguments: { TYPE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Object' }, DATA: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'return_block', blockType: Scratch.BlockType.COMMAND, text: 'return [VALUE]', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'JSON utils'
          },
          // --- Merge / Clone / Remove / Count ---
          { opcode: 'merge_objects', blockType: Scratch.BlockType.REPORTER, text: 'merge [A] with [B]', arguments: { A: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' }, B: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          {
            opcode: 'getkey',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get key [key] in JSON [metadata]',
            arguments: 
            {
             key: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'},
             metadata: {type: Scratch.ArgumentType.STRING, defaultValue: '{"foo": "bar"}'}
            }
          },
          { opcode: 'clone_object', blockType: Scratch.BlockType.REPORTER, text: 'clone [OBJ]', arguments: { OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'remove_key', blockType: Scratch.BlockType.COMMAND, text: 'remove key [KEY] from [OBJ]', arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'k' }, OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'count_keys', blockType: Scratch.BlockType.REPORTER, text: 'count keys in [OBJ]', arguments: { OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          {
            opcode: 'getidxlist',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get element [idxlist] to [listarray]',
            arguments: {idxlist: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, listarray: {type: Scratch.ArgumentType.STRING, defaultValue: '[1, 2, 3]'}},
          },
          {
            opcode: 'json_keys',
            blockType: Scratch.BlockType.REPORTER,
            text: 'keys [Inputkeys]',
            arguments: {Inputkeys: {type: Scratch.ArgumentType.STACK, defaultValue: '["1","2"]'}}
          },
          {
            opcode: 'json_values',
            blockType: Scratch.BlockType.REPORTER,
            text: 'values [Inputvalues]',
            arguments: {Inputvalues: {type: Scratch.ArgumentType.STACK, defaultValue: '["1","2"]'}}
          },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'buffers'
          },
          // --- Buffers & Buffer type menu ---
          { opcode: 'buffer_type', blockType: Scratch.BlockType.REPORTER, text: 'buffer type [BUFFER]', arguments: { BUFFER: { type: Scratch.ArgumentType.STRING, menu: 'bufferTypes', defaultValue: '32B' } } },
          { opcode: 'allocate_buffer', blockType: Scratch.BlockType.REPORTER, text: 'allocate buffer of [BYTES] bytes', arguments: { BYTES: { type: Scratch.ArgumentType.NUMBER, defaultValue: 64 } } },
          { opcode: 'read_buffer', blockType: Scratch.BlockType.REPORTER, text: 'read buffer [ID] at [POS]', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'buf' }, POS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } },
          { opcode: 'write_buffer', blockType: Scratch.BlockType.COMMAND, text: 'write buffer [ID] at [POS] value [VAL]', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'buf' }, POS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'I/O and buffers'
          },
          // --- Save into with buffer (composed) ---
          { opcode: 'save_into_with_buffer', blockType: Scratch.BlockType.COMMAND, text: 'save into [FORMAT] with buffer type [BUFFERCHOICE]', arguments: { FORMAT: { type: Scratch.ArgumentType.STRING, menu: 'formats', defaultValue: 'JSON' }, BUFFERCHOICE: { type: Scratch.ArgumentType.STRING, menu: 'bufferTypes', defaultValue: '32B' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'compress'
          },
          // --- Compression ---
          { opcode: 'compress_builder', blockType: Scratch.BlockType.COMMAND, text: 'Compress builder to [MODE]', arguments: { MODE: { type: Scratch.ArgumentType.STRING, menu: 'compressModes', defaultValue: 'raw' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'customs'
          },
          // --- Custom Blocks / Hat / Call ---
          { opcode: 'custom_block_hat', blockType: Scratch.BlockType.HAT, text: 'custom block [NAME] json [JSONTEXT]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'custom' }, JSONTEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'call_custom_block', blockType: Scratch.BlockType.COMMAND, text: 'call custom [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'custom' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'control flow'
          },
          // --- Control flow & args ---
          { opcode: 'while_loop', blockType: Scratch.BlockType.LOOP, text: 'while [COND] do', arguments: { COND: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: true } } },
          {
            opcode: 'ifthen',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: 'if [conditional] then',
            arguments: 
            {
              conditional: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true}
            },
            branchCount: 1
          },
          {
            opcode: 'loopforever',
            blockType: Scratch.BlockType.LOOP,
            text: 'forever',
            arguments: {},
            isTerminal: true,
          },
          // ... dentro de getInfo()

{
    opcode: 'repeatXTimes', // El nombre interno de la función
    blockType: Scratch.BlockType.LOOP, // ¡Esto le da la forma de C!
    text: 'repeat [TIMES] times',
    arguments: {
        TIMES: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 10
        }
    },
    // El código interno del bloque 'C' se ejecutará en la función 'repeatXTimes'
},
// ...
          {
          opcode: 'wait',
          text: 'wait [TIME] seconds',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            TIME: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        
        {
          opcode: 'switcacase',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'switch [whenswitch]',
          arguments: {whenswitch: {type: Scratch.ArgumentType.STACK, defaultValue: ''}},
        },

        {
          opcode: 'casein',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'case [inputtext]',
          arguments: {inputtext: {type: Scratch.ArgumentType.STRING, defaultValue: ''}},
        },

        {
          opcode: 'trytodo',
          blockType: Scratch.BlockType.CONDITIONAL,
          branchCount: 2,
          text: 'try to do',
          arguments: {},
        },
        {
          opcode: 'reterror',
          blockType: Scratch.BlockType.REPORTER,
          text: 'error',
          arguments: {},
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: 'events'
        },

        {
          opcode: 'whenboolean',
          blockType: Scratch.BlockType.HAT,
          text: 'when [InputBoolean] is true',
          isEdgeActivated: true,
          arguments: {InputBoolean: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: ''}},
        },

        {
          opcode: 'alwayshat',
          blockType: Scratch.BlockType.HAT,
          text: 'always',
          arguments: {},
        },

           {
            blockType: Scratch.BlockType.LABEL,
            text: 'URL'
          },
          {
            opcode: 'fetcha',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'fetch [url]',
            arguments: 
            {
              url: {type: Scratch.ArgumentType.STRING, defaultValue: 'https://extensions.turbowarp.org/hello.txt'},
            }
          },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'targets'
          },
          {
            opcode: 'XYpos',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set x: [X] y: [Y]',
            arguments: 
            {
              X: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
              Y: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            }
          },
          {
            opcode: 'degrees',
            blockType: Scratch.BlockType.COMMAND,
            text: 'rotate [DIR] degrees',
            arguments: {
             DIR: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90}
            }
          },
           {
            opcode: 'angle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set angle [ANGL] degrees',
            arguments: {
             ANGL: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },
          {
            opcode: 'movesteps',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move [STEPS] steps',
            arguments: 
            {
              STEPS: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}
            }
          },
          {
            opcode: 'posX',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'position x',
            arguments: {}
          },
           {
            opcode: 'posY',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'position y',
            arguments: {}
          },
          {
            opcode: 'Direction',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'angle',
            arguments: {}
          },
          {
            opcode: 'viewsize',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'size',
            arguments: {}
          },
          {
            opcode: 'setsize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set size to [SIZE] %',
            arguments: {SIZE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100}},
          },
          {
            opcode: 'changesize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change size to [SIZEc]',
            arguments: {SIZEc: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
          },
          {
            opcode: 'showsprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show',
            arguments: {},
          },
          {
            opcode: 'hidesprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide',
            arguments: {},
          },
          {
            opcode: 'say',
            blockType: Scratch.BlockType.COMMAND,
            text: 'say [texttosay]',
            arguments: {texttosay: {type: Scratch.ArgumentType.STRING, defaultValue: 'hello'}},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'console helpers'
          },
          {
            opcode: 'print',
            blockType: Scratch.BlockType.COMMAND,
            text: 'print [inputprint]',
            arguments: {inputprint: {type: Scratch.ArgumentType.STRING, defaultValue: ''}},
          },
          {
            opcode: 'console',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'console',
            arguments: {},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'control debug'
          },
          { opcode: 'break_block', blockType: Scratch.BlockType.COMMAND, text: 'break', isTerminal: true },
          { opcode: 'continue_block', blockType: Scratch.BlockType.COMMAND, text: 'continue' },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'args'
          },
          { opcode: 'args_reporter', blockType: Scratch.BlockType.REPORTER, text: 'args [ARGS]', arguments: { ARGS: { type: Scratch.ArgumentType.STRING, defaultValue: 'args' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'misc'
          },
          // --- Misc ---
          { opcode: 'inspect_block', blockType: Scratch.BlockType.REPORTER, text: 'inspect [OBJ]', arguments: { OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '__last' } } },
          { opcode: 'log_block', blockType: Scratch.BlockType.COMMAND, text: 'log [MSG]', arguments: { MSG: { type: Scratch.ArgumentType.STRING, defaultValue: 'msg' } } },
          { opcode: 'memory_usage', blockType: Scratch.BlockType.REPORTER, text: 'memory usage' },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'CBA styles ✨'
          },
          {
            opcode: 'lerpcolor',
            blockType: Scratch.BlockType.REPORTER,
            text: 'color mix [Color1] to [Color2] amount [AmountColor]',
            arguments: 
            {
             Color1: {type: Scratch.ArgumentType.COLOR, defaultValue: '#FF0000'},
             Color2: {type: Scratch.ArgumentType.COLOR, defaultValue: '#0000FF'},
             AmountColor: {type: Scratch.ArgumentType.NUMBER, defaultValue: '50'},
            }
          },

          {
            opcode: 'hexcolor',
            blockType: Scratch.BlockType.REPORTER,
            text: 'convert color [CH] to hex',
            arguments: {CH: {type: Scratch.ArgumentType.COLOR, defaultValue: '#FFFF00'}}
          },

          {
    opcode: 'isLighter',
    blockType: Scratch.BlockType.BOOLEAN, // ¡Es booleano!
    text: '[COLOR1] is lighter than [COLOR2]?',
    arguments: {
        COLOR1: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: '#FF0000' // Rojo
        },
        COLOR2: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: '#000000' // Negro
        }
    }
},

          {
            opcode: 'vectorangle',
            blockType: Scratch.BlockType.REPORTER,
            text: 'angle of [XA] and [YA]',
            arguments: 
            {
              XA: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10},
              YA: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10},
            }
          },

          {
            opcode: 'vectorsum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector add [VECTOR1] + [VECTOR2]',
            arguments: 
            {
              VECTOR1: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
            opcode: 'vectormul',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector multiply [VECTOR1m] * [VECTOR2m]',
            arguments: 
            {
              VECTOR1m: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2m: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
            opcode: 'vectorsub',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector subtract [VECTOR1s] - [VECTOR2s]',
            arguments: 
            {
              VECTOR1s: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2s: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
            opcode: 'vectordiv',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector divide [VECTOR1d] / [VECTOR2d]',
            arguments: 
            {
              VECTOR1d: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2d: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
           opcode: 'vectorToArray',
           blockType: Scratch.BlockType.REPORTER,
           text: 'to array vector [VECTOR]',
           arguments: {
           VECTOR: { 
            type: Scratch.ArgumentType.STRING, 
            defaultValue: '{"x":0, "y":0}' 
           }
           }
           }
        ],
        menus: {
          formats: { acceptReporters: true, items: ['JSON', 'XML', 'CSV', 'TXT', 'BIN'] },
          parseTypes: { acceptReporters: true, items: ['Object', 'XML', 'Map', 'CSV', 'JSON', 'TXT', 'BIN'] },
          bufferTypes: { acceptReporters: true, items: ['64B', '32B', '16B', '8B'] },
          compressModes: { acceptReporters: true, items: ['raw', 'gzip', 'none'] },
          editModes: { acceptReporters: true, items: ['add', 'delete', 'item', 'map', 'json edit', 'txt', 'modelcreator'] },
          trigmenu: { acceptReporters: true, items: ['sin', 'cos','tan','sinh','cosh']},
          branchmenu: {acceptReporters: true, items: ['true', 'false']}
        }
      };
    } // end getInfo

    _parseColor(color) {
            if (typeof color === 'number') {
                const hex = Math.round(color).toString(16).padStart(6, '0');
                color = `#${hex}`;
            }

            const hex = String(color).startsWith('#') ? String(color).substring(1) : String(color);
            
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            return [r, g, b];
        }

       _tryParse(jsonString) {
            if (typeof jsonString === 'object' && jsonString !== null) return jsonString; // Ya es un objeto, devuélvelo
            try {
                return JSON.parse(jsonString);
            } catch (e) {
                return jsonString; // Devuelve el string si no es un JSON válido
            }
        }

    // ----------------- Utilities -----------------
    _tryParseValue(v) {
      if (typeof v !== 'string') return v;
      const s = v.trim();
      if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
        try { return JSON.parse(s); } catch (e) { /* ignore */ }
      }
      if (!isNaN(Number(s))) return Number(s);
      return s;
    }

    _deepClone(v) {
      try { return JSON.parse(JSON.stringify(v)); } catch (e) { return v; }
    }

    _genId(pref) {
      return pref + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    }

    _topBuilder() {
      return this.STORAGE.builderStack.length ? this.STORAGE.builderStack[this.STORAGE.builderStack.length - 1] : null;
    }

    _convertData(data, format) {
      try {
        switch ((format || 'JSON').toString()) {
          case 'JSON': return JSON.stringify(data, null, 2);
          case 'XML': {
            let xml = '<data>\n';
            for (const k in data) xml += '  <' + k + '>' + JSON.stringify(data[k]) + '</' + k + '>\n';
            xml += '</data>';
            return xml;
          }
          case 'CSV': {
            let csv = 'key,value\n';
            for (const k in data) csv += k + ',"' + JSON.stringify(data[k]) + '"\n';
            return csv;
          }
          case 'TXT': return Object.entries(data).map(p => p[0] + ': ' + JSON.stringify(p[1])).join('\n');
          case 'BIN': {
            const s = JSON.stringify(data);
            return Array.from(s).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          }
          default: return JSON.stringify(data);
        }
      } catch (e) { return String(data); }
    }

    // ----------------- Core implementations -----------------

    // Variables
    set_var_c(args) {
      this.STORAGE.vars[args.NAME] = this._tryParseValue(args.VALUE);
    }
    setVarC(args) { this.set_var_c(args); }

    var_c(args) {
      const v = this.STORAGE.vars[args.NAME];
      if (typeof v === 'undefined') return '';
      return (typeof v === 'object') ? JSON.stringify(v) : String(v);
    }
    getVarC(args) { return this.var_c(args); }

    // Key/value helpers
    get_key_value(args) {
      const o = {};
      o[args.KEY] = args.VALUE;
      return JSON.stringify(o);
    }

    string_value(args) {
      return String(args.VALUE);
    }

    // Classes
    class_block(args) {
      if (!this.STORAGE.vars[args.NAME]) this.STORAGE.vars[args.NAME] = { _type: 'class', createdAt: Date.now() };
    }

    anonymous_class(util) {
      util.startBranch(1, false);
    }

    anonymous_class_extends(args, util) {
      const name = 'Anonymous_' + Math.floor(Math.random() * 10000);
      this.STORAGE.vars[name] = { _type: 'anonymous', extends: args.BASE, data: {} };
      this.STORAGE.builderStack.push({ type: 'anon', name: name });
      util.startBranch(1, false);
    }

    get_value_of_class(args) {
      return JSON.stringify(this.STORAGE.vars[args.CLASSNAME] || null);
    }

    // Builders
    set_builder(args, util) {
      const id = this._genId('builder');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'builder', id: id });
      util.startBranch(1, false);
    }

    blank_set() {
      return JSON.stringify({});
    }

    array_builder(args, util) {
      const id = this._genId('array');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'array', id: id });
      util.startBranch(1, false);
    }

    object_builder(args, util) {
      const id = this._genId('object');
      this.STORAGE.builders[id] = {};
      this.STORAGE.builderStack.push({ type: 'object', id: id });
      util.startBranch(1, false);
    }

    xml_builder(args, util) {
      const id = this._genId('xml');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'xml', id: id });
      util.startBranch(1, false);
    }

    function_builder(args, util) {
      const id = this._genId('function');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'function', id: id, name: args.NAME });
      util.startBranch(1, false);
    }

    create_lambda(args, util) {
      const id = this._genId('lambda');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'lambda', id: id, name: args.NAME });
      util.startBranch(1, false);
    }

    sets_builder(args, util) {
      const id = this._genId('set');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'set', id: id });
      util.startBranch(1, false);
    }

    array_builder_alt(args, util) {
      const id = this._genId('array_alt');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'array_alt', id: id });
      util.startBranch(1, false);
    }

    append_to_builder(args) {
      const top = this._topBuilder();
      if (!top) {
        const id = this._genId('builder');
        this.STORAGE.builders[id] = [];
        this.STORAGE.builderStack.push({ type: 'builder', id: id });
      }
      const cur = this._topBuilder();
      if (!cur) return;
      const id = cur.id;
      if (cur.type === 'set') {
        const v = this._tryParseValue(args.VALUE);
        const arr = this.STORAGE.builders[id];
        const key = (typeof v === 'object') ? JSON.stringify(v) : String(v);
        const exists = arr.some(x => (typeof x === 'object' ? JSON.stringify(x) : String(x)) === key);
        if (!exists) arr.push(v);
        return;
      }
      if (cur.type === 'array' || cur.type === 'builder' || cur.type === 'lambda' || cur.type === 'function' || cur.type === 'xml' || cur.type === 'array_alt') {
        this.STORAGE.builders[id].push(this._tryParseValue(args.VALUE));
        return;
      }
      if (cur.type === 'object') {
        const parsed = this._tryParseValue(args.VALUE);
        if (typeof parsed === 'object' && !Array.isArray(parsed)) {
          Object.assign(this.STORAGE.builders[id], parsed);
        } else {
          const m = String(args.VALUE).match(/^\s*([^:=]+)\s*[:=]\s*(.*)$/);
          if (m) {
            this.STORAGE.builders[id][m[1].trim()] = this._tryParseValue(m[2].trim());
          } else {
            this.STORAGE.builders[id][Object.keys(this.STORAGE.builders[id]).length] = this._tryParseValue(args.VALUE);
          }
        }
        return;
      }
    }

    end_builder(args) {
      const top = this.STORAGE.builderStack.pop();
      if (!top) return;
      const id = top.id;
      const content = this.STORAGE.builders[id];
      const name = args.NAME || top.name || ('value_' + id);
      if (top.type === 'lambda') {
        this.STORAGE.lambdas[top.name || name] = Array.isArray(content) ? content.slice() : [String(content)];
      } else if (top.type === 'function') {
        this.STORAGE.functions[top.name || name] = Array.isArray(content) ? content.slice() : [String(content)];
      } else if (top.type === 'set') {
        this.STORAGE.vars[name] = Array.isArray(content) ? content.slice() : [];
      } else {
        this.STORAGE.vars[name] = this._deepClone(content);
      }
      delete this.STORAGE.builders[id];
    }

    // --- Set helpers ---
    set_has(args) {
      const s = this.STORAGE.vars[args.SETNAME];
      if (!Array.isArray(s)) return false;
      const val = this._tryParseValue(args.VALUE);
      const key = (typeof val === 'object') ? JSON.stringify(val) : String(val);
      return s.some(x => (typeof x === 'object' ? JSON.stringify(x) : String(x)) === key);
    }

    set_delete(args) {
      const name = args.SETNAME;
      const val = this._tryParseValue(args.VALUE);
      const s = this.STORAGE.vars[name];
      if (!Array.isArray(s)) return;
      const key = (typeof val === 'object') ? JSON.stringify(val) : String(val);
      for (let i = 0; i < s.length; i++) {
        const k = (typeof s[i] === 'object') ? JSON.stringify(s[i]) : String(s[i]);
        if (k === key) { s.splice(i, 1); break; }
      }
    }

    // --- Compression ---
    compress_builder(args) {
      const mode = (args.MODE || args.MODE || '').toString().toLowerCase() || (args.system || 'rap');
      const top = this._topBuilder();
      if (!top) return;
      const id = top.id;
      const content = this.STORAGE.builders[id];
      if (typeof content === 'undefined') return;
      if (mode === 'raw') {
        try {
          const s = JSON.stringify(content);
          const min = s.replace(/\s+/g, ' ');
          this.STORAGE.builders[id] = min.replace(/(.)\1{4,}/g, function (m, ch) { return ch + 'x' + m.length; });
        } catch (e) { this.STORAGE.builders[id] = String(content); }
      } else if (mode === 'gzip') {
        this.STORAGE.builders[id] = 'GZIP:' + String(JSON.stringify(content)).slice(0, 128);
      } else {
        // none
      }
    }

    // --- Parse / Save / Convert ---
    parse_in_data(args) {
      const type = (args.TYPE || 'JSON').toString();
      const dataRef = args.DATAREF;
      const target = (this.STORAGE.vars.hasOwnProperty(dataRef) ? this.STORAGE.vars[dataRef] : dataRef);
      try {
        if (type === 'Object') {
          if (typeof target === 'string') return JSON.parse(target);
          return target;
        } else if (type === 'JSON') {
          if (typeof target === 'string') return JSON.stringify(JSON.parse(target), null, 2);
          return JSON.stringify(target, null, 2);
        } else if (type === 'XML') {
          if (typeof target === 'object') {
            let xml = '<data>';
            for (const k in target) xml += '<' + k + '>' + String(target[k]) + '</' + k + '>';
            xml += '</data>';
            return xml;
          }
          return '<data>' + String(target) + '</data>';
        } else if (type === 'CSV') {
          if (typeof target === 'object') {
            const rows = [];
            for (const k in target) rows.push([k, JSON.stringify(target[k])].join(','));
            return rows.join('\n');
          }
          return String(target);
        } else if (type === 'TXT') {
          if (typeof target === 'object') {
            return Object.entries(target).map(function (p) { return p[0] + ': ' + JSON.stringify(p[1]); }).join('\n');
          }
          return String(target);
        } else if (type === 'BIN') {
          const s = (typeof target === 'string') ? target : JSON.stringify(target);
          return Array.from(s).map(function (c) { return c.charCodeAt(0).toString(2).padStart(8, '0'); }).join(' ');
        } else if (type === 'Map') {
          if (typeof target === 'object') return JSON.stringify(Object.entries(target));
          return JSON.stringify(target);
        } else {
          return target;
        }
      } catch (e) {
        return 'parse error';
      }
    }

    save_data(args) {
      const fmt = (args.FORMAT || 'JSON').toString().toUpperCase();
      const payload = this._convertData(this.STORAGE.vars, fmt);
      this.STORAGE.savedData = payload;
      this.STORAGE.logs.push('saved:' + fmt);
    }

    get_saved_data() {
      return this.STORAGE.savedData === null ? '{}' : this.STORAGE.savedData;
    }

    load_data(args) {
      try {
        const data = args.DATA;
        const parsed = (typeof data === 'string' && (data.trim().startsWith('{') || data.trim().startsWith('['))) ? JSON.parse(data) : data;
        if (typeof parsed === 'object') {
          this.STORAGE.vars = this._deepClone(parsed);
        } else {
          // try parse for simple key=value lines
          const map = {};
          String(data).split(/\n/).forEach(function (line) {
            const m = String(line).match(/^\s*([^=]+)=(.*)$/);
            if (m) map[m[1].trim()] = m[2].trim();
          });
          this.STORAGE.vars = map;
        }
        this.STORAGE.logs.push('loaded');
      } catch (e) {
        this.STORAGE.logs.push('load error');
      }
    }

    clear_data() {
      this.STORAGE.savedData = null;
      this.STORAGE.logs.push('cleared savedData');
    }

    csv_block(args) {
      try {
        const d = this._tryParseValue(args.DATA);
        if (Array.isArray(d)) return d.join(',');
        if (typeof d === 'object') return Object.keys(d).map(k => `${k},${JSON.stringify(d[k])}`).join('\n');
        return String(d);
      } catch (e) { return String(args.DATA); }
    }

    // --- Type / Symbol / New object ---
    typeof_block(args) {
      const t = args.TYPE;
      if (this.STORAGE.vars[t]) return 'object';
      if (this.STORAGE.customBlocks[t]) return 'custom';
      return typeof t;
    }

    create_symbol() {
      const s = 'sym_' + (Math.random().toString(36).slice(2, 10));
      this.STORAGE.symbols[s] = true;
      return s;
    }

    new_object() { return JSON.stringify({}); }

    // --- Functions / Calls / Construct / Return ---
    call_function(args) {
      const name = args.NAME;
      if (this.STORAGE.functions[name]) {
        this.STORAGE.logs.push('call_function ' + name);
      } else {
        this.STORAGE.logs.push('call_function not found ' + name);
      }
    }

    construct_block(args) {
      try {
        const type = args.TYPE || 'Object';
        const data = (typeof args.DATA === 'string') ? JSON.parse(args.DATA || '{}') : args.DATA;
        return JSON.stringify({ type: type, data: data });
      } catch (e) { return JSON.stringify({ type: args.TYPE, data: args.DATA }); }
    }

    return_block(args) {
      this.STORAGE.__last_return__ = args.VALUE;
    }

    // --- Merge / Clone / Remove / Count ---
    merge_objects(args) {
      try {
        const A = this._tryParseValue(args.A) || {};
        const B = this._tryParseValue(args.B) || {};
        return JSON.stringify(Object.assign({}, A, B));
      } catch (e) { return '{}'; }
    }

    clone_object(args) { return JSON.stringify(this._deepClone(this._tryParseValue(args.OBJ))); }

    remove_key(args) {
      const name = args.OBJ;
      if (this.STORAGE.vars[name] && typeof this.STORAGE.vars[name] === 'object') {
        delete this.STORAGE.vars[name][args.KEY];
      }
    }

    count_keys(args) {
      const obj = this._tryParseValue(args.OBJ);
      if (!obj || typeof obj !== 'object') return 0;
      return Object.keys(obj).length;
    }

    // --- Buffers ---
    buffer_type(args) { return String(args.BUFFER || '32B'); }

    allocate_buffer(args) {
      const bytes = Math.max(1, Math.floor(Number(args.BYTES) || 64));
      const id = 'buf_' + this._genId('buf');
      try {
        this.STORAGE.buffers[id] = new Uint8Array(bytes);
      } catch (e) {
        // environment may not support typed arrays in some VMs; fallback to array
        this.STORAGE.buffers[id] = Array(bytes).fill(0);
      }
      return id;
    }

    read_buffer(args) {
      const id = args.ID;
      const pos = Math.max(0, Math.floor(Number(args.POS) || 0));
      const buf = this.STORAGE.buffers[id];
      if (!buf) return 'undefined';
      if (pos >= buf.length) return 'oob';
      return String(buf[pos]);
    }

    write_buffer(args) {
      const id = args.ID;
      const pos = Math.max(0, Math.floor(Number(args.POS) || 0));
      const val = Math.max(0, Math.min(255, Math.floor(Number(args.VAL) || 0)));
      const buf = this.STORAGE.buffers[id];
      if (!buf) return;
      if (pos < buf.length) {
        try { buf[pos] = val; } catch (e) { /* ignore */ }
      }
    }

    save_into_with_buffer(args) {
      const fmt = (args.FORMAT || 'BIN').toString().toUpperCase();
      const buffer = args.BUFFERCHOICE || '32B';
      const payload = this._convertData(this.STORAGE.vars, fmt);
      this.STORAGE.savedData = '---[FORMAT:' + fmt + ']---\n' + payload + '\n---[BUFFER:' + buffer + ']---';
      this.STORAGE.logs.push('saved_into_buffer');
    }

    // --- Custom blocks ---
    custom_block_hat(args) {
      try {
        const name = String(args.NAME);
        const j = JSON.parse(String(args.JSONTEXT || '{}'));
        this.STORAGE.customBlocks[name] = j;
        this.STORAGE.logs.push('custom registered ' + name);
      } catch (e) { this.STORAGE.logs.push('custom parse error'); }
    }

    call_custom_block(args) {
      const name = args.NAME;
      if (!this.STORAGE.customBlocks[name]) { this.STORAGE.logs.push('call_custom not found ' + name); return; }
      this.STORAGE.logs.push('call_custom ' + name);
    }

    // --- Control flow ---
    while_loop(args, util) {

      const condicion = Scratch.Cast.toBoolean(args.COND);

      if (condicion) {

        util.startBranch(1, true);
        return 1;
      } else {

        util.startBranch(1, false);
        return 0;
      }
    }

    break_block(args, util) { 
      console.log("breaked");
    }

    continue_block() { throw new Error('__serializeext_continue__'); }

    args_reporter(args) {
      try { return this._tryParseValue(args.ARGS); } catch (e) { return args.ARGS; }
    }

    // --- Inspect / log / memory usage ---
    inspect_block(args) {
      const id = args.OBJ;
      const v = this.STORAGE.vars.hasOwnProperty(id) ? this.STORAGE.vars[id] : (this.STORAGE.buffers[id] ? Array.from(this.STORAGE.buffers[id]) : undefined);
      this.STORAGE.vars['__last_inspect__'] = v;
      if (typeof v === 'undefined') return 'undefined';
      return (typeof v === 'object') ? JSON.stringify(v).slice(0, 256) : String(v);
    }

    log_block(args) { this.STORAGE.logs.push(String(args.MSG)); }

    memory_usage() {
      try { return new TextEncoder().encode(JSON.stringify(this.STORAGE.vars)).length; } catch (e) { return 0; }
    }

    basearray(args) {
      const jsonstring = args.array

     const arrayObj = JSON.parse(jsonstring);
            
            // 2. Verificar que el resultado sea un Array.
            if (!Array.isArray(arrayObj)) {
                 return `Error: that block is not array.`;
            }

            return arrayObj.join(', ');

    }

    selecttrig(args) {
     const funciontrigonometrica = args.Menutrig;
     const grados = args.NUM;
     const radianes = grados * (Math.PI / 180);
     const result = 0;

     switch(funciontrigonometrica) {
      case 'sin':
        result = Math.sin(radianes)
        break;
      case 'cos':
        result = Math.cos(radianes)
        break;
      case 'tan':
        result = Math.tan(radianes)
        break;
      case 'sinh':
        result = Math.sinh(radianes)
        break;
      case 'cosh':
        result = Math.cosh(radianes)
        break;
     }
     return result;
    }

    timer() {
      const ahora = new Date();

      const horas = ahora.getHours();
      const minutos = ahora.getMinutes();
      const segundos = ahora.getSeconds();

// 3. Función auxiliar para añadir un cero inicial si es menor que 10 (ej: 05)
        const formato2Digitos = (numero) => {
            return numero.toString().padStart(2, '0');
        };

        // 4. Formatear y devolver el string
        const horaFormateada = `${formato2Digitos(horas)}:${formato2Digitos(minutos)}:${formato2Digitos(segundos)}`;

        return horaFormateada;
    }

    sin(args) {
     const grados = args.Sin;
     const radianes = grados * (Math.PI / 180);

     const result = Math.sin(radianes);

     return parseFloat(result.toFixed(15));
    }

    tan(args) {
     const grados = args.Tan;
     const radianes = grados * (Math.PI / 180);
     const result = Math.tan(radianes);

     return parseFloat(result.toFixed(15));
    }

    sinh(args) {
     const grados = args.Sinh;
     const radianes = grados * (Math.PI / 180);
     const result = Math.sinh(radianes);

     return parseFloat(result.toFixed(15));
    }

     cosh(args) {
     const grados = args.Cosh;
     const radianes = grados * (Math.PI / 180);
     const result = Math.cosh(radianes);

     return parseFloat(result.toFixed(15));
    }

    tanh(args) {
     const grados = args.Tanh;
     const radianes = grados * (Math.PI / 180);
     const result = Math.tanh(radianes);

     return parseFloat(result.toFixed(15));
    }

    cos(args) {
     const grados = args.Cos;
     const radianes = grados * (Math.PI / 180);
     const result = Math.cos(radianes);

     return parseFloat(result.toFixed(15));
    }

    add(args) {
      return Number(args.NUM1) + Number(args.NUM2);
    }

    subtract(args) {
      return Number(args.NUM1s) - Number(args.NUM2s);
    }

    multiply(args) {
      return Number(args.NUM1m) * Number(args.NUM2m);
    }

    divide(args) {
      return Number(args.NUM1d) / Number(args.NUM2d);
    }

    lists(args) {
    this.STORAGE.vars[args.Name] = this._tryParseValue(args.Value);
    }

    True() {
      return true;
    }

    False() {
      return false;
    }

    equalto(args) {
      const number1 = args.NUM1e;
      const number2 = args.NUM2e;

      return number1 === number2;
    }

    majorto(args) {
      const number1 = args.NUM1ma;
      const number2 = args.NUM2ma;

      return number1 > number2;
    }

     minorto(args) {
      const number1 = args.NUM1mi;
      const number2 = args.NUM2mi;

      return number1 < number2;
    }

    ifthen(args, util) {
      const conditionalarg = args.conditional;

      if (conditionalarg) {

       util.startBranch(1, true);
       return 1;
      } else {
        
       util.startBranch(1, false);
       return 0;
      }
    }

    sqrt(args) {
      return Math.sqrt(args.Sqrt);
    }

    loopforever(args, util) {
     return 1;
    }

    Join(args) {
     return String(args.word1) + String(args.word2);
    }

    fetcha(args) {
     return fetch(args.url)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        return 'Uh oh! Something went wrong.';
      });

    }

    and(args) {
      return Scratch.Cast.toBoolean(args.VAL1a) && Scratch.Cast.toBoolean(args.VAL2a);
    }

    or(args) {
      return Scratch.Cast.toBoolean(args.VAL1o) || Scratch.Cast.toBoolean(args.VAL2o);
    }
    not(args) {
      return !Scratch.Cast.toBoolean(args.VALn);
    }
    
    XYpos(args, util) {
      const target = util.target;

      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);

      target.setXY(x, y);
    }
    
    wait (args) {
    return new Promise((resolve, reject) => {
      const timeInMilliseconds = args.TIME * 1000;
      setTimeout(() => {
        resolve();
      }, timeInMilliseconds);
    });
  }

  degrees(args, util) {
      const degrees = Number(args.DIR);
      const target = util.target;

      // Usamos el método setDirection del target
      const newDirection = target.direction + degrees;
      target.setDirection(newDirection);
  }

  pi() {
   return Math.PI;
  }

  euler() {
   return Math.E;
  }

  phi() {
    return (1 + Math.sqrt(5)) / 2;
  }

  module(args) {
    return Number(args.NUM1mo) % Number(args.NUM2mo);
  }

  lerpcolor(args) {
    const rgb1 = this._parseColor(args.Color1);
            const rgb2 = this._parseColor(args.Color2);
            
            // Tasa de mezcla (0 a 1)
            const t = Scratch.Cast.toNumber(args.AmountColor) / 100;
            const amount = Math.max(0, Math.min(1, t));

            // Función de interpolación lineal (Lerp) para un componente
            const lerp = (a, b, t) => Math.round(a + (b - a) * t);

            const r = lerp(rgb1[0], rgb2[0], amount);
            const g = lerp(rgb1[1], rgb2[1], amount);
            const b = lerp(rgb1[2], rgb2[2], amount);

            // Convierte los componentes RGB al formato HEX
            const toHex = c => c.toString(16).padStart(2, '0').toUpperCase();

            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  getkey(args) {
    const obj = this._tryParse(args.metadata);
            // Verifica que sea un objeto antes de intentar acceder a la clave
            if (typeof obj === 'object' && obj !== null) {
                return obj[Scratch.Cast.toString(args.key)];
            }
            return '';
  }

  vectorangle(args) {
    const x = Scratch.Cast.toNumber(args.XA);
    const y = Scratch.Cast.toNumber(args.YA);
    return Math.atan2(y, x) * 180 / Math.PI;
  }

  hexcolor(args) {
    const rgb = this._parseColor(args.CH);

    const r = rgb[0]
    const g = rgb[1]
    const b = rgb[2]
    const toHex = c => c.toString(16).padStart(2, '0').toUpperCase();
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  isLighter(args) {
    
    // --- Lógica para obtener la Luminosidad (L) del color ---
    const getLightness = (colorHex) => {
        
        let hex = String(colorHex);
        
        // 1. Convertir Hex a RGB (Mismo algoritmo de hexToRgb)
        // Normalizar a 6 dígitos si es necesario (ej. #F00 -> #FF0000)
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        const r255 = result ? parseInt(result[1], 16) : 0;
        const g255 = result ? parseInt(result[2], 16) : 0;
        const b255 = result ? parseInt(result[3], 16) : 0;

        // 2. Normalizar RGB a 0-1 (Necesario para la fórmula HSL)
        let r = r255 / 255;
        let g = g255 / 255;
        let b = b255 / 255;
        
        // 3. Convertir RGB (0-1) a HSL (Mismo algoritmo de rgbToHsl)
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        
        // El componente L (Lightness)
        let l = (max + min) / 2;

        // Retornamos el valor L, escalado de 0 a 100
        return l * 100; 
    };

    // --- Ejecutar y Comparar ---
    const lightness1 = getLightness(args.COLOR1);
    const lightness2 = getLightness(args.COLOR2);

    // Comparar las luminosidades
    return lightness1 > lightness2;
}

  nothingstring() {
    return null;
  }

  movesteps(args, util) {
      const steps = Number(args.STEPS);
      const target = util.target; // 'target' es el sprite que ejecuta el bloque

      // El movimiento se calcula usando trigonometría básica
      // (90 - dirección) porque en Scratch 0° es "arriba"
      const radians = (90 - target.direction) * Math.PI / 180;
      const newX = target.x + steps * Math.cos(radians);
      const newY = target.y + steps * Math.sin(radians);

      // Usamos el método setXY del target para moverlo
      target.setXY(newX, newY);
  }

  vectorsum(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1);
        v2 = JSON.parse(args.VECTOR2);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1;
        v2 = args.VECTOR2;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 + x2, y: y1 + y2 };
  }

   vectormul(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1m);
        v2 = JSON.parse(args.VECTOR2m);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1m;
        v2 = args.VECTOR2m;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 * x2, y: y1 * y2 };
  }

  vectorsub(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1s);
        v2 = JSON.parse(args.VECTOR2s);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1s;
        v2 = args.VECTOR2s;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 - x2, y: y1 - y2 };
  }

  vectordiv(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1d);
        v2 = JSON.parse(args.VECTOR2d);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1d;
        v2 = args.VECTOR2d;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 / x2, y: y1 / y2 };
  }

  vectorToArray(args) {
    let vec;
    try {
        vec = JSON.parse(args.VECTOR);
    } catch (e) {
        vec = args.VECTOR;
    }
    
    const x = vec && vec.x ? Number(vec.x) : 0;
    const y = vec && vec.y ? Number(vec.y) : 0;
    
    // Formatea el vector como una cadena legible (X, Y)
    return `[${x}, ${y}]`;
  }

  tothis(args) {
     const v = this.STORAGE.vars[args.buildername];
      if (typeof v === 'undefined') return '';
      return (typeof v === 'object') ? JSON.stringify(v) : String(v);
  }

  floordiv(args) {
   return Math.floor(args.NUM1fd / args.NUM2fd);
  }

  posX(args, util) {
    const target = util.target;
    return String(target.x);
  }

  posY(args, util) {
    const target = util.target;
    return String(target.y);
  }
  
  tostring(args) {
    return String(args.text1s);
  }

  tonumber(args) {
    return Number(args.text1n);
  }

  toboolean(args) {
    return Boolean(args.text1b);
  }

  jmp() {
    return "\n";
  }
  label() {
    return;
  }

  repeatXTimes(args, util) {
    // 1. Obtener la información de estado del bucle desde el hilo de Scratch
    const frame = util.stackFrame;
    const limit = Number(args.TIMES);
    if (typeof frame.counter === 'undefined') {
        frame.counter = 0;
    }
    if (frame.counter < limit) {
        frame.counter++; 
        return 1; 

    } else {
        delete frame.counter;
        return; 
    }
}

  fixnumber(args) {
    return Math.floor(args.NUMfix);
  }

  branch(args) {
    if (args.menubranch == "true") {
      return 1;
    }

    if (args.menubranch == "false") {
      return 0;
    }
  }

  xor(args) {
    return args.VAL1x !== args.VAL2x;
  }

  nor(args) {
    return !(args.VAL1no || args.VAL2no);
  }

   xnor(args) {
    return !((args.VAL1xn || args.VAL2xn) && !(args.VAL1xn && args.VAL2xn));
  }

  negNumber(args) {
    return args.NUMneg * -1
  }

  pownumber(args) {
    return Math.pow(args.NUM1pow, args.NUM2pow);
  }
  
  setsize(args, util) {
    const newSize = args.SIZE;

    util.target.setSize(newSize);
  }

  lastkey(args, util) {
    return util.runtime.ioDevices.keyboard.lastKeyPressed || '';
  }

  showsprite(args, util) {
    const target = util.target

    target.setVisible(true);
  }

  hidesprite(args, util) {
    const target = util.target

    target.setVisible(false);
  }

  angle(args, util) {
    const target = util.target;

    target.setDirection(args.ANGL);
  }

  Direction(args, util) {
    const target = util.target

    return target.direction;
  }

  changesize(args, util) {
    const target = util.target;
    
    const sizeChange = Number(args.SIZEc) || 0;
    
    const newSize = target.size + sizeChange;
    
        target.setSize(newSize);
  }

  viewsize(args, util) {
     const target = util.target;

     return Math.floor(target.size);
  }

  whenboolean(args) {
     return args.InputBoolean;
  }

  setReturnValue(args) {
    // Establece el valor que el reportero debe devolver más tarde
    this._returnValue = args.VALUEr; 
}

myReporterFunc(args, util) {
    const result = this._returnValue;

    if (result !== 0) {
        this._returnValue = 0; 
        return result; 
    }
    
    // Si no hay interrupción, devuelve un valor que NO sea 0.
    // Una cadena vacía es más clara si el valor esperado es texto.
    return ''; // ⬅️ Devuelve cadena vacía (o "ERROR") si el comando no ha actuado.
}
  
   print(args) {
    this._console = this._console + args.inputprint + '\n'
   }

   console() {
    return this._console;
   }

   switcacase(args) {
    this._STACKvalue = args.whenswitch;
    return 1;
   }

   casein(args) {
    const caseresult = this._STACKvalue;

    if (caseresult === args.inputtext) {
      return 1;
    } else {
      return 0;
    }
   }

   say(args, util) {
    const text = String(args.texttosay);

    util.runtime.emit('SAY', util.target, 'say', text);
   }

   alwayshat() {
    return true;
   }

   cbrt(args) {
    return Math.cbrt(args.Cbrt);
   }

   getidxlist(args) {
    let listData = args.listarray;
        let index = Number(args.idxlist);
        
        // Intenta convertir la entrada a un Array si es una cadena JSON
        let array;
        try { array = JSON.parse(listData); } catch (e) { array = []; }

        if (!Array.isArray(array)) { return ''; } // Si no es un Array, no puede funcionar

        // Se usa índice 0-basado de JavaScript
        if (index >= 0 && index < array.length) {
            return array[index];
        }
        return '';
   }

   trytodo(args, util) {
    const frame = util.stackFrame;
    const errorSignal = 'TRY_CATCH_ERROR_SIGNAL'; // Mensaje único para detectar el error

    // Asegurarse de que el objeto STORAGE y logs existen, si no, fallar silenciosamente.
    if (!this.STORAGE || !Array.isArray(this.STORAGE.logs)) {
        // Si no hay logs o STORAGE, solo ejecutamos la Rama 1 y terminamos.
        util.startBranch(1, true); 
        return; 
    }

    // --- PASO 1: INTENTAR (TRY) ---
    if (!frame.triedBranch) {
        
        // 1.1 Limpiar o marcar la posición del log antes de la ejecución.
        // Usaremos la longitud actual de los logs como punto de partida.
        frame.logStartIndex = this.STORAGE.logs.length; 

        // 1.2 Marcar el estado: Ya vamos a intentar la Rama 1.
        frame.triedBranch = true; 
        
        // 1.3 Iniciar la Rama 1 (%1).
        util.startBranch(1, true); 
        
        // 1.4 Devolver el control a la VM.
    }
    
    // --- PASO 2: VERIFICAR Y CAPTURAR (CATCH) ---
    
    let errorOccurred = false;

    // 2.1 Verificar si el mensaje de error fue escrito en el log durante la Rama 1.
    // Buscamos el mensaje único de señalización desde el punto donde empezamos la rama.
    for (let i = frame.logStartIndex; i < this.STORAGE.logs.length; i++) {
        if (this.STORAGE.logs[i] === errorSignal) {
            errorOccurred = true;
            // Opcional: Eliminar la señal de error del log una vez capturado.
            this.STORAGE.logs.splice(i, 1); 
            break;
        }
    }

    if (errorOccurred) {
        // 2.2 Hubo un error, ejecutar la Rama 2 (%2, el "Catch").
        util.startBranch(2, true);

        // 2.3 Devolver el control para que la VM ejecute la Rama 2.
        return util.context.requestThread(thread);
    } 
    
    // 3. Si no hubo error, el bloque termina.
    return;

   }

   new_class(args) {
    const classNAME = args.nameclass;
    const defclass = {
      methods: {},
      properties: {},
    };

    this._currentBuildingClass = classNAME;

    this.STORAGE.classes[classNAME] = defclass;
   }

   Methods(args, codeBody) {
    const methodName = args.NAME;
    const methodArgs = args.ARGS ? args.ARGS.split(',').map(a => a.trim()) : [];

    // ¡CRUCIAL! Se asegura de que se haya ejecutado el comando 'define class' antes
    if (!this._currentBuildingClass) {
        this.STORAGE.logs.push('TypeError: method is not precise as expected');
        return;
    }

    const className = this._currentBuildingClass;
    
    // 1. Guardar la definición del método en la clase actualmente activa.
    this.STORAGE.classes[className].methods[methodName] = {
        argsmethod: methodArgs,
        body: codeBody // El código del método se guarda aquí para ejecución futura
    };
    
    // Opcionalmente, puedes mover el "limpiar el estado" al final de todos los métodos
    // o introducir un bloque 'end class' para mayor claridad.
    
    this.STORAGE.logs.push(`Method ${className}.${methodName} created.`);
   }

   argmethod(args) {
    return this.STORAGE.classes[args.NAME].methods[args.NAME1].argsmethod;
   }

   createmap(args) {
    const Namemap = args.NAMEmap;
    const definitionmap = {
      items: [],
    }

    this.STORAGE.listmaps[Namemap] = definitionmap;
   }

   createitem(args) {
    const Namemaps = args.mapname;
    const Nameitem = args.Valueitem;

    this.STORAGE.listmaps[Namemaps].items.push(String(Nameitem));
   }

   lengthmap(args) {
    return this.STORAGE.listmaps[args.maplist].items.length;
   }

   itemofmap(args) {
    return this.STORAGE.listmaps[args.mapitem].items[Number(args.idxitem)];
   }

   idx2item4map(args) {
    const items2idx = this.STORAGE.listmaps[args.mapidx].items;

    if (items2idx.indexOf(args.idxmapitem) !== -1 ) {
      return items2idx.indexOf(args.idxmapitem);
    } else {
      return 'TypeError: [i] undefined item in the map'
    }
   }

   itemexists(args) {
    const itemscheck = this.STORAGE.listmaps[args.mapdef].items;

    return itemscheck.includes(args.existsitem);
   }

   deleteitem(args) {
    const Namemapsd = args.mapnamed;
    const Nameitemd = args.Valueitemd;

    this.STORAGE.listmaps[Namemapsd].items.splice(Number(Nameitemd));
   }

   reterror() {
    return '► TypeError CBA';
   }

   mousex(args, util) {
    const mousex = util.runtime.ioDevices.mouse;

    return mousex._scratchX;
   }

   mousey(args, util) {
    const mousey = util.runtime.ioDevices.mouse;

    return mousey._scratchY;
   }

   mouseisdown(args, util) {
    const mousedown = util.runtime.ioDevices.mouse;

    return mousedown._isDown;
   }

   json_keys(args) {
    const arrays = Array(args.Inputkeys);
    const iterator = arrays.keys()

    return iterator;
   }

   json_values(args) {
    const arrays = Array(args.Inputvalues);
    const iterator = arrays.values()

    return iterator;
   }

   arequire(args) {
    this.STORAGE.appEnum[args.textreq] = this._tryParseValue(args.required);
    return "ƒ <saved>";
   }

   torequire(args) {
    return this.STORAGE.appEnum[args.textreq1];
   }
  } // end class
  Scratch.extensions.register(new CBA());
})(Scratch);
