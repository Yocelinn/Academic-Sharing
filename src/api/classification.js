import { post, get } from './api.js';

export function search(url, page, size, order_field, order_direction, user_id, query, strategy, aggregations){
    let data={};
    data.page=page;
    data.size=size;
    data.order_field=order_field;
    data.order_direction=order_direction;
    data.user_id=user_id;
    data.query=query;
    data.strategy=strategy;
    data.aggregations=aggregations;
    return post("/search/"+url, data);
}