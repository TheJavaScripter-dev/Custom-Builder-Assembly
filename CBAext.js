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
        customBlocks: {},    // user-defined custom blocks metadata
        symbols: {},         // created symbols
        savedData: null,     // last saved payload (string)
        logs: []
      };
    }

    getInfo() {
      return {
        id: 'custombuilderassembly',
        name: 'Custom Builder Assembly',
        color1: '#276edb',
        blockIconURI: 'data:image/png;base64,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',
        blocks: [
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
            text: 'SE15 Math, sin [Sin]',
            arguments: 
            {
             Sin: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },

          {
            opcode: 'tan',
            blockType: Scratch.BlockType.REPORTER,
            text: 'SE15 Math, tan [Tan]',
            arguments: 
            {
             Tan: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },

          {
            opcode: 'cos',
            blockType: Scratch.BlockType.REPORTER,
            text: 'SE15 Math, cos [Cos]',
            arguments: 
            {
             Cos: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },

          {opcode: 'add', blockType: Scratch.BlockType.REPORTER, text: 'add [NUM1] + [NUM2]', arguments: {NUM1: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} } },

          {opcode: 'subtract', blockType: Scratch.BlockType.REPORTER, text: 'subtract [NUM1s] - [NUM2s]', arguments: {NUM1s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} } },

          {opcode: 'multiply', blockType: Scratch.BlockType.REPORTER, text: 'multiply [NUM1m] * [NUM2m]', arguments: {NUM1m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} } },

          {opcode: 'divide', blockType: Scratch.BlockType.REPORTER, text: 'divide [NUM1d] / [NUM2d]', arguments: {NUM1d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} } },
        
          {opcode: 'module', blockType: Scratch.BlockType.REPORTER, text: 'module [NUM1mo] % [NUM2mo]', arguments: {NUM1mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}},
          {
            opcode: 'sinh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'SE15 Math, sinh [Sinh]',
            arguments: 
            {
             Sinh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },

          {
            opcode: 'cosh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'SE15 Math, cosh [Cosh]',
            arguments: 
            {
             Cosh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },

          {
            opcode: 'tanh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'SE15 Math, tanh [Tanh]',
            arguments: 
            {
             Tanh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },

          {
            opcode: 'sqrt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'SE15 Math, sqrt [Sqrt]',
            arguments:
            {
             Sqrt: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            }
          },

          {
            opcode: 'Eval',
            blockType: Scratch.BlockType.COMMAND,
            text: 'codeJS [code]',
            arguments: 
            {
             code: {type: Scratch.ArgumentType.STRING, defaultValue: 'console.log("hello")'},
            }
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
            text: 'true',
            arguments: {}
          },

          {
            opcode: 'False',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'false',
            arguments: {}
          },

          {
            opcode: 'Join',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [word1] to [word2]',
            arguments: 
            {
              word1: {type: Scratch.ArgumentType.STRING, defaultValue: 'hello'},
              word2: {type: Scratch.ArgumentType.STRING, defaultValue: 'world'},
            }
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
            }
          },

           {
            opcode: 'majorto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1ma] > [NUM2ma]',
            arguments: 
            {
              NUM1ma: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2ma: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            }
          },

           {
            opcode: 'minorto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1mi] < [NUM2mi]',
            arguments: 
            {
              NUM1mi: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2mi: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            }
          },

          {
            opcode: 'nothingstring',
            blockType: Scratch.BlockType.REPORTER,
            text: 'nil',
            arguments: {},
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
            }
          },
          {
            opcode: 'or',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1o] or [VAL2o]',
            arguments: 
            {
              VAL1o: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2o: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            }
          },
          {
            opcode: 'not',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'not [VALn]',
            arguments: 
            {
              VALn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'math constants'
          },
          {
            opcode: 'pi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'π',
            arguments: {}
          },
           {
            opcode: 'euler',
            blockType: Scratch.BlockType.REPORTER,
            text: 'e',
            arguments: {}
          },
          {
            opcode: 'phi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'φ',
            arguments: {}
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
          { opcode: 'while_loop', blockType: Scratch.BlockType.LOOP, text: 'while [COND]', arguments: { COND: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: true } } },
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
          },
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
          opcode: 'trys',
          blockType: Scratch.BlockType.CONDITIONAL,
          branchCount: 2,
          text: 'try [data] catch [data1]',
          arguments: 
          {
            data: {type: Scratch.ArgumentType.STACK},
            data1: {type: Scratch.ArgumentType.STACK},
          }
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
            opcode: 'movesteps',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move [STEPS] steps',
            arguments: 
            {
              STEPS: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'control debug'
          },
          { opcode: 'break_block', blockType: Scratch.BlockType.COMMAND, text: 'break' },
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
          trigmenu: { acceptReporters: true, items: ['sin', 'cos','tan','sinh','cosh']}
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

    break_block() { throw new Error('__serializeext_break__'); }

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

    Eval(args) {
      const codigo = args.code;
 
      eval(codigo);
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

  async trys(args, util) {
    const thread = util.thread;
            const frame = thread.stackFrames[util.stackFrame.index];

            // Las pilas se acceden directamente por su índice de rama:
            const TRY_BRANCH = args.data; // Pila TRY (rama 1)
            const CATCH_BRANCH = args.data1; // Pila CATCH (rama 2)

            // Paso 0: Inicialización del estado
            if (typeof frame.state === 'undefined') {
                frame.state = 'TRYING'; 
            }

            // --- Manejo de la Ejecución ---

            if (frame.state === 'TRYING') {
                try {
                    // Ejecutamos la pila TRY (rama 1).
                    await util.runtime.fireSteppers(TRY_BRANCH, thread);
                    
                    // No hubo error, pasamos al estado final.
                    frame.state = 'FINISHED';

                } catch (error) {
                    // ¡Error capturado!
                    frame.state = 'CATCHING';
                }

            } else if (frame.state === 'CATCHING') {
                // Ejecutamos la pila CATCH (rama 2).
                await util.runtime.fireSteppers(CATCH_BRANCH, thread);
                
                // La pila CATCH ha terminado.
                frame.state = 'FINISHED';
            }

            // Paso 3: Bloqueo/Cesión de Control
            if (frame.state !== 'FINISHED') {
                return 1;
            }
            
            return;
  }
  phi() {
    return 1.6180339;
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

  movesteps(args) {
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
  } // end class
  Scratch.extensions.register(new CBA());
})(Scratch);
