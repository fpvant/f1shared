let SequenceMapping; // key is Sportsbook Slot...etc, value is {[providerName]:providerCode, ...}

export const textSearchGameDetails = (gameDetails, opt={}) => {
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