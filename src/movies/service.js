const DataAccess = require('./data-access');
const ServiceSupport = require("./supports/service.support");
const DomainConstant = require("./supports/domain.constant");
const ErrorConstant = require('./supports/error.constant');
const CustomException = require('./supports/custom.exception');
const KMSSupport = require("./supports/kms.support");

module.exports = {
    async listFriends(payload){
        let result = await DataAccess.listFriends(payload);
        let resultFinal = [];
        if(result.length > 0){
            resultFinal = await Promise.all(
                result.map(async (item)=> {
                    const hashFriend = item["type#mobile_sk"].split("#")[2];
                    let dataStories = await DataAccess.getStories({ hash2: hashFriend, country: payload.country });
                    
                    ServiceSupport.sortElementsArray(dataStories, `datetimeCreation`);

                    dataStories.map((storie)=> {
                        storie.uuid = storie["type#mobile_sk"].split("#")[2];
                        delete storie["type#mobile_sk"];

                        if(storie.views.find((stview)=> stview.hash === payload.hash)) storie.viewed = true;
                        else storie.viewed = false;

                        delete storie.views;
                    })
                    item.stories = dataStories;
                    item.hash2 = hashFriend;
                    delete item["type#mobile_sk"];
                    return item;
                })
            );
        } else {
            resultFinal = result
        }
        return ServiceSupport.createResponse(DomainConstant.DATABASE.QUERY, resultFinal);
    }
};