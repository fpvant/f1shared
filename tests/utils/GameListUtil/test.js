gameDetails = require('./gameDetails.json')
seq = require('./seq.json')

let SequenceMapping;
const textSearchGameDetails = (gameDetails, opt={}) => {
  const seq = opt.seqResult;
  if (typeof SequenceMapping==='undefined') {
    SequenceMapping = {}
    opt.seqResult.forEach(item => {
      if (item.type==='Category') {
        let obj = {};
        item.subProviders.forEach(_ => {
          obj[_.name] = _.code;
        });
        SequenceMapping[item.code] = obj;
      }
    });
  }
  const keyword = opt.keyword;
  let ret = gameDetails;
  if (typeof keyword==='string' && keyword) {
    let kw4ProviderCase1 = keyword;
    let kw4ProviderCase2 = '';
    if (opt.GAME_TYPE) {
      for (let k of Object.keys(SequenceMapping[opt.GAME_TYPE])) {
        if (k===kw4ProviderCase1) {
          kw4ProviderCase2 = SequenceMapping[opt.GAME_TYPE][k];
        }
      }
    }
    const keywordLower = keyword.toLowerCase();
    const keywordUpper = keyword.toUpperCase();
    ret = ret.filter(v => {
      return v.gameName.toLowerCase() === keywordLower
        || v.provider.toLowerCase() === keywordLower
        || (opt.GAME_TYPE && v.provider.toLowerCase() === SequenceMapping[opt.GAME_TYPE][keywordUpper]?.toLowerCase())
    });
  }
  return ret;
};

test1 = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'TG'})
test1b = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'Tg'})
test1c = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'tg'})
test1d = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'tG'})
test2 = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'PP 老虎机'})
test2b = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'Pp 老虎机'})
test2c = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'pP 老虎机'})
test2d = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'pp 老虎机'})
console.log(SequenceMapping['Slot']['PP 老虎机'])
console.log(JSON.stringify(test1)===JSON.stringify(test2))
console.log(JSON.stringify(test1)===JSON.stringify(test1b))
console.log(JSON.stringify(test1)===JSON.stringify(test1c))
console.log(JSON.stringify(test1)===JSON.stringify(test1d))
console.log(JSON.stringify(test2)===JSON.stringify(test2b))
console.log(JSON.stringify(test2)===JSON.stringify(test2c))
console.log(JSON.stringify(test2)===JSON.stringify(test2d))

test3 = textSearchGameDetails(gameDetails.result.gameDetails, {GAME_TYPE:'Slot', seqResult:seq.result, keyword:'小丑珠宝现金'})
console.log(test3)
