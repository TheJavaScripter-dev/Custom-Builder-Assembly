(function (Scratch) {
  'use strict';
  const iconblockscriptmajor = 'data:image/png;base64,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';
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

  class TA {
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
        OOP: {},
      };

      this._returnValue = '';
      this._console = '';
      this._STACKvalue = '';
      this._STACKOUT = '';
      this._Stackbreak = false;
    }

    getInfo() {
      return {
        id: 'turboassembly',
        name: 'Turbo Assembly',
        color1: '#ff3433',
        blockIconURI: 'data:image/png;base64,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',
         blocks: [

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'scripts'
          },

          {
            opcode: 'ifiniciated',
            blockType: Scratch.BlockType.HAT,
            text: `
            #𝚜𝚌𝚛𝚒𝚙𝚝 [IMAGE]
            source:
            `,
            arguments: {
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: iconblockscriptmajor,
              },
            },
            color1: "#1060F0"
          },

          {
            opcode: 'thisscript',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'me',
            arguments: {},
          },
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'functions and OOP'
          },
          
          {
            opcode: 'classfunc',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: 'class [NAME]',
            arguments: {
              NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}
            },
          },

          {
            opcode: 'lambfunction',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: 'anonymous function',
            arguments: {},
          },

          {
            opcode: 'methodFunc',
            blockType: Scratch.BlockType.COMMAND,
            text: 'method FUNC: [FUNC] NAME: [NAME]',
            arguments: {
              FUNC: {type: Scratch.ArgumentType.STACK, defaultValue: ''},
              NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}
            }
          },

          {
            opcode: 'callmethod',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'call method NAME: [NAME]',
            arguments: {
              NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}
            }
          },

          {
            opcode: 'instancenew',
            blockType: Scratch.BlockType.COMMAND,
            text: 'new inst [NAME] value [VALUE]',
            arguments: {
             NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'},
             VALUE: {type: Scratch.ArgumentType.STRING, defaultValue: 'baz'}
            }
          },

          {
            opcode: 'callinst',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'call inst [NAME]',
            arguments: {
              NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}
            }
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
  color1: "#8F508F"
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

            color1f: '#4CBF5F'
          },

          {
            opcode: 'tan',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tan [Tan]',
            arguments: 
            {
             Tan: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            color1f: '#4CBF5F'
          },

          {
            opcode: 'cos',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cos [Cos]',
            arguments: 
            {
             Cos: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            color1f: '#4CBF5F'
          },

          {opcode: 'add', blockType: Scratch.BlockType.REPORTER, text: '[NUM1] + [NUM2]', arguments: {NUM1: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, color1f: '#4CBF5F'},

          {opcode: 'subtract', blockType: Scratch.BlockType.REPORTER, text: '[NUM1s] - [NUM2s]', arguments: {NUM1s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, color1f: '#4CBF5F'},

          {opcode: 'multiply', blockType: Scratch.BlockType.REPORTER, text: '[NUM1m] * [NUM2m]', arguments: {NUM1m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, color1f: '#4CBF5F'},

          {opcode: 'divide', blockType: Scratch.BlockType.REPORTER, text: '[NUM1d] / [NUM2d]', arguments: {NUM1d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, color1f: '#4CBF5F'},
        
          {opcode: 'module', blockType: Scratch.BlockType.REPORTER, text: '[NUM1mo] % [NUM2mo]', arguments: {NUM1mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}, color1f: '#4CBF5F'},
          {
            opcode: 'sinh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sinh [Sinh]',
            arguments: 
            {
             Sinh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            color1f: '#4CBF5F'
          },

          {
            opcode: 'cosh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cosh [Cosh]',
            arguments: 
            {
             Cosh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            color1f: '#4CBF5F'
          },

          {
            opcode: 'tanh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tanh [Tanh]',
            arguments: 
            {
             Tanh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            color1f: '#4CBF5F'
          },

          {
            opcode: 'negNumber',
            blockType: Scratch.BlockType.REPORTER,
            text: '- [NUMneg]',
            arguments: {NUMneg: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
            color1f: '#4CBF5F'
          },

          {
            opcode: 'pownumber',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NUM1pow] ^ [NUM2pow]',
            arguments: {NUM1pow: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}, NUM2pow: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
            color1f: '#4CBF5F'
          },
          {
            opcode: 'sqrt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sqrt [Sqrt]',
            arguments:
            {
             Sqrt: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            },
            color1f: '#4CBF5F'
          },
          {
            opcode: 'cbrt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cbrt [Cbrt]',
            arguments:
            {
             Cbrt: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            },
            color1f: '#4CBF5F'
          },
          {
            opcode: 'fixnumber',
            blockType: Scratch.BlockType.REPORTER,
            text: 'fix [NUMfix]',
            arguments: {NUMfix: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5}},
            color1f: '#4CBF5F'
          },
          {
            opcode: 'floordiv',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NUM1fd] // [NUM2fd]',
            arguments: {NUM1fd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}, NUM2fd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5}},
            color1f: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Matrix Utils'
          },
          {
            opcode: 'mulmatrix',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mul matrix [Mat1] x [Mat2]',
            arguments: {
              Mat1: {type: Scratch.ArgumentType.STRING, defaultValue: '[[1,2],[3,4]]'},
              Mat2: {type: Scratch.ArgumentType.STRING, defaultValue: '[[3,4],[2,1]]'}
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'variables as lists'
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
            blockType: Scratch.BlockType.LABEL,
            text: 'literal booleans'
          },
          {
            opcode: 'True',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'true',
            arguments: {},
            color1f: '#4CBF5F'
          },

          {
            opcode: 'False',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'false',
            arguments: {},
            color1f: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'ioDevices helpers'
          },
          {
            opcode: 'keyisdown',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'key [KEY] is pressed',
            arguments: {
              KEY: {type: Scratch.ArgumentType.STRING, defaultValue: 'enter'}
            }
          },
          {
            opcode: 'spriteclicked',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'sprite clicked?',
            arguments: {},
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
            color1f: '#4CBF5F'
          },
          {
            opcode: 'jmp',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'new line',
            arguments: {},
            color1f: '#4CBF5F'
          },
          {
            opcode: 'lengthtext',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'length of text [TEXT]',
            arguments: {
              TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo bar'}
            },
            color1f: "#4CBF5F"
          },
          {
            opcode: 'choftext',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'letter [NUMBER] of text [TEXT]',
            arguments: {
              NUMBER: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
              TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo bar'}
            },
            color1f: "#4CBF5F"
          },
          {
            opcode: 'graphchar',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'graphical characters',
            arguments: {},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'labels'
          },
          {
            opcode: 'label',
            blockType: Scratch.BlockType.COMMAND,
            text: '// [textlabel]',
            arguments: {textlabel: {type: Scratch.ArgumentType.STRING, defaultValue: 'text'}},
            color1: "#999990"
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'vars'
          },
          // --- Core variables & aliases ---
          { opcode: 'set_var_c', blockType: Scratch.BlockType.COMMAND, text: 'int [NAME] = [VALUE]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'var' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } }, color1f: "#FFAF00" },
          { opcode: 'var_c', blockType: Scratch.BlockType.REPORTER, text: 'var [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'var' } }, color1f: "#FFAF00" },

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
            color1f: '#4CBF5F'
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
            color1f: '#4CBF5F'
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
            color1f: '#4CBF5F'
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
          { opcode: 'setVarC', blockType: Scratch.BlockType.COMMAND, text: 'int [NAME] = [VALUE]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'nombre' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'valor' } }, color1f: "#FFAF00" },
          { opcode: 'getVarC', blockType: Scratch.BlockType.REPORTER, text: 'var [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'nombre' } }, color1f: "#FFAF00" },
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
            color1f: '#4CBF5F'
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
            color1f: '#4CBF5F'
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
            color1f: '#4CBF5F'
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
            color1f: '#4CBF5F'
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
            color1f: '#4CBF5F'
          },
          {
            opcode: 'not',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'not [VALn]',
            arguments: 
            {
              VALn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            color1f: '#4CBF5F'
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
            color1f: '#4CBF5F'
          },
           {
            opcode: 'euler',
            blockType: Scratch.BlockType.REPORTER,
            text: 'e',
            arguments: {},
            color1f: '#4CBF5F'
          },
          {
            opcode: 'phi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'φ',
            arguments: {},
            color1f: '#4CBF5F'
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
            color1f: '#FF3D16'
          },
          {
            opcode: 'createitem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create item to [mapname] with value [Valueitem]',
            arguments: {mapname: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, Valueitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             color1f: '#FF3D16'
          },
          {
            opcode: 'replaceitem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'replace item on map [maptoreitem] in idx item [idxitemre] to text [textnewre]',
            arguments: {maptoreitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'},
             idxitemre: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            textnewre: {type: Scratch.ArgumentType.STRING, defaultValue: 'baz'}},
            color1f: "#FF3D16"
          },
          {
            opcode: 'deleteitem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete item to [mapnamed] with idx [Valueitemd]',
            arguments: {mapnamed: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, Valueitemd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}},
             color1f: '#FF3D16'
          },
          {
            opcode: 'clearmap',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear map [name2clearmap]',
            arguments: {name2clearmap: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
            color1f: "#FF3D16"
          },
          {
            opcode: 'lengthmap',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'length of map [maplist]',
            arguments: {maplist: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
             color1f: '#FF3D16'
          },
          {
            opcode: 'itemofmap',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'item [idxitem] of map [mapitem]',
            arguments: {mapitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, idxitem: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}},
             color1f: '#FF3D16'
          },
          {
            opcode: 'idx2item4map',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'idx of item [idxmapitem] of map [mapidx]',
            arguments: {mapidx: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, idxmapitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             color1f: '#FF3D16'
          },
          {
            opcode: 'itemexists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'item [existsitem] exists of map [mapdef]?',
            arguments: {mapdef: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, existsitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             color1f: '#FF3D16'
          },
          {
            opcode: 'setmap2array',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set map [arraymap] to array [setarray]',
            arguments: {
              arraymap: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'},
              setarray: {type: Scratch.ArgumentType.STRING, defaultValue: '[1, 2, 3]'}
            },
            color1f: "#FF3D16"
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
            text: 'OOP, fixed, more blocks later'
          },
          {
            opcode: 'new_class',
            blockType: Scratch.BlockType.COMMAND,
            text: 'def class [nameclass]',
            arguments: {nameclass: {type: Scratch.ArgumentType.STRING, defaultValue: 'Build'}},
          },
          {
            opcode: 'Methods',
            blockType: Scratch.BlockType.COMMAND,
            text: 'method. name [NAME]',
            arguments: {NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}}
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
          { opcode: 'while_loop', blockType: Scratch.BlockType.LOOP, text: 'while [COND] do', arguments: { COND: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: true } }, color1f: "#6060FF" },
          {
            opcode: 'ifthen',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: 'if [conditional] then',
            arguments: 
            {
              conditional: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true}
            },
            branchCount: 1,

            color1f: "#6060FF"
          },
          {
            opcode: 'loopforever',
            blockType: Scratch.BlockType.LOOP,
            text: 'forever',
            arguments: {},
            isTerminal: true,

            color1f: "#6060FF"
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

    color1f: "#6060FF"
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
          },

          color1f: "#6060FF"
        },
        
        {
          opcode: 'switcacase',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'switch [whenswitch]',
          arguments: {whenswitch: {type: Scratch.ArgumentType.STACK, defaultValue: ''}},
          color1f: "#6060FF"
        },

        {
          opcode: 'casein',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'case [inputtext]',
          arguments: {inputtext: {type: Scratch.ArgumentType.STRING, defaultValue: ''}},
          color1f: "#6060FF"
        },

        {
          opcode: 'adefault',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'default',
          arguments: {},
          color1f: "#6060FF"
        },

        {
          opcode: 'break_case',
          blockType: Scratch.BlockType.COMMAND,
          text: 'break',
          isTerminal: true,
          color1f: "#6060FF"
        },

        {
          opcode: 'trytodo',
          blockType: Scratch.BlockType.CONDITIONAL,
          branchCount: 2,
          text: 'try to do',
          arguments: {},
          color1f: "#6060FF"
        },
        {
          opcode: 'reterror',
          blockType: Scratch.BlockType.REPORTER,
          text: 'error',
          arguments: {},
          color1f: "#6060FF"
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
            opcode: 'Xpos',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set x: [Xp]',
            arguments: {Xp: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}
          },
          {
            opcode: 'Ypos',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set y: [Yp]',
            arguments: {Yp: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}
          },
          {
            opcode: 'degrees',
            blockType: Scratch.BlockType.COMMAND,
            text: 'rotate [DIR] degrees',
            arguments: {
             DIR: {type: Scratch.ArgumentType.NUMBER, defaultValue: 15}
            }
          },
           {
            opcode: 'angle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set angle [ANGL] degrees',
            arguments: {
             ANGL: {type: Scratch.ArgumentType.ANGLE, defaultValue: 90},
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
            opcode: 'scostume',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set costume [COSTUMEr]',
            arguments: {COSTUMEr: {type: Scratch.ArgumentType.COSTUME}},
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
            text: 'TA styles ✨'
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
           },

           {
        opcode: 'renderText',
        blockType: Scratch.BlockType.COMMAND,
        text: 'show text [TEXT] in x: [X] y: [Y]',
        arguments: {
            TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello TurboWarp!'
            },
            X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
            },
            Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
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
    
    if (result !== null) {
        this._returnValue = 0; 
        return result; 
    }
    // Si no hay interrupción, devuelve un valor que NO sea 0.
    // Una cadena vacía es más clara si el valor esperado es texto.
    return 'not a function'; // ⬅️ Devuelve cadena vacía (o "ERROR") si el comando no ha actuado.
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
      this._STACKOUT = 'TRUE';
      return 1;
    } else {
      this._STACKOUT = 'FALSE';
      return 0;
    };

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

   Methods(args) {
    const newmethod = args.NAME;

    const propsmethod = 
    {
      argsmethod: {},
      objects: {},
    };

    this.STORAGE.classes[this._currentBuildingClass].methods[newmethod] = propsmethod;
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
    return '► TypeError TA';
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

   Xpos(args, util) {
    const target = util.target;

    target.setXY(args.Xp, target.y);
   }

    Ypos(args, util) {
    const target = util.target;

    target.setXY(target.x, args.Yp);
   }
   
   scostume(args, util) {
    const target = util.target;

    let costume = args.COSTUMEr;

    target.setCostume(costume);
   }

   adefault() {
    const out = this._STACKOUT;

    if (out == 'FALSE') {
      return 1;
    } else {
      return 0;
    }
   }

   renderText(args) {
    // 1. Crear o encontrar el elemento de texto específico (por ejemplo, usando un ID)
    let textElement = document.getElementById('my-turbowarp-text');
    if (!textElement) {
        textElement = document.createElement('div');
        textElement.id = 'my-turbowarp-text';
        // Aplicar estilos básicos
        textElement.style.position = 'absolute'; // Necesario para posicionamiento
        textElement.style.color = 'black';
        textElement.style.whiteSpace = 'nowrap';
        textElement.style.fontFamily = 'sans-serif';
        textElement.style.fontSize = '24px';
        textElement.style.pointerEvents = 'none'; // Para que no interfiera con clics del stage

        // Añadirlo al DOM (Generalmente al contenedor principal del stage)
        // Esto varía, pero un buen lugar es dentro de un contenedor que ya esté
        // sobre el canvas de Scratch, que puede que tengas que identificar
        // o crear en la inicialización.
        // Ejemplo: document.querySelector('.stage-container').appendChild(textElement);
    }

    // 2. Aplicar el contenido y la posición
    textElement.textContent = args.TEXT;

    // Convertir coordenadas Scratch (-240 a 240, -180 a 180) a coordenadas de píxeles del stage
    const stageWidth = 480; // Ancho estándar del stage
    const stageHeight = 360; // Alto estándar del stage
    const pixelX = (args.X / stageWidth * stageWidth) + (stageWidth / 2); 
    const pixelY = (args.Y * -1) + (stageHeight / 2); // 'Y' está invertida y se centra

    textElement.style.left = `${pixelX}px`;
    textElement.style.top = `${pixelY}px`;

    // **Nota sobre this.STORAGE:** Puedes usar this.STORAGE para guardar 
    // una referencia al elemento si tienes varios textos:
    // this.STORAGE.savedData['textElementRef'] = textElement;
}

  break_case() {
    this._Stackbreak = true;
  }

  replaceitem(args) {
    this.STORAGE.listmaps[args.maptoreitem].items[Number(args.idxitemre)] = args.textnewre;
  }

  clearmap(args) {
    this.STORAGE.listmaps[args.name2clearmap].items = []
  }

  setmap2array(args) {
    const realarray = JSON.parse(args.setarray);

    this.STORAGE.listmaps[args.arraymap].items = realarray;
  }

  lengthtext(args) {
    const text = String(args.TEXT);

    return text.length;
  }

  choftext(args) {
    const text = String(args.TEXT);

    const number = Number(args.NUMBER);

    return text.charAt(number);
  }

  mulmatrix(args) {
    const Matrix1 = JSON.parse(args.Mat1);
    const Matrix2 = JSON.parse(args.Mat2);

    if (!Matrix1 || Matrix1.length === 0 || !Matrix2 || Matrix2.length === 0) {
     console.log("Matrix not contains data")
    };

    const Rows1 = Matrix1.length;
    const Cols1 = Matrix1[0].length;

    const Rows2 = Matrix2.length;
    const Cols2 = Matrix2[0].length;

    if (Cols1 !== Rows2) {
      console.log("these matrix is not meant to combine")
    };

    const C = new Array(Rows1).fill(0).map(() => new Array(Cols2).fill(0));

    // Bucle para iterar sobre las filas de A (i)
    for (let i = 0; i < Rows1; i++) {
        // Bucle para iterar sobre las columnas de B (j)
        for (let j = 0; j < Cols2; j++) {
            // Bucle para iterar sobre los elementos comunes (k)
            for (let k = 0; k < Cols1; k++) { // O rowsB, ya que son iguales
                C[i][j] += Matrix1[i][k] * Matrix2[k][j];
            }
        }
    }

    return C;
  }

  ifiniciated() {
    return true;
  }

  thisscript(args, util) {
    const target = util.target;
    return target;
  }

  graphchar() {
    return '◢◣◤◥▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿';
  }

  spriteclicked(args, util) {
    return (
      util.ioQuery("mouse", "getIsDown") && util.target.isTouchingObject("_mouse_")
    );
  }

  keyisdown(args, util) {
    return util.ioQuery("keyboard", "getKeyIsDown", [args.KEY]);
  }

  lambfunction(args, util) {
    return true;
  }

  classfunc(args) {
    const Name = args.NAME;
    const contentclass = {
      methods: {},
      properties: {},
    };

    this.currentclass = Name;
    this.STORAGE.OOP[Name] = contentclass;
    return true;
  }

  methodFunc(args) {
    const Name = args.NAME;
    const content = {
      function: args.FUNC
    };

    this.STORAGE.OOP[this.currentclass].methods[Name] = content;
  }

  callmethod(args) {
    return this.STORAGE.OOP[this.currentclass].methods[args.NAME].function;
  }

  instancenew(args) {
    this.STORAGE.OOP[this.currentclass].properties[args.NAME] = args.VALUE;
  }

  callinst(args) {
    return this.STORAGE.OOP[this.currentclass].properties[args.NAME];
  }
  } // end class
  Scratch.extensions.register(new TA());
})(Scratch);
