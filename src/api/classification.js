import { post, get } from './api.js';

export function search(url, page, size, order_field, order_direction, query, strategy, aggregations){
    let data={};
    data.page=page;
    data.size=size;
    data.order_field=order_field;
    data.order_direction=order_direction;
    // data.user_id=user_id;
    data.query=query;
    data.strategy=strategy;
    data.aggregations=aggregations;
    // console.log(data)
    return post("/search/"+url, data);
}

export function searchForAggregations(url, page, size, order_field, order_direction, query, strategy,aggregations){
    let data={};
    data.page=page;
    data.size=size;
    data.order_field=order_field;
    data.order_direction=order_direction;
    // data.user_id=user_id;
    data.query=query;
    data.strategy=strategy;
    data.aggregations=aggregations;
    return post("/search/"+url+"/aggregations",data)
}