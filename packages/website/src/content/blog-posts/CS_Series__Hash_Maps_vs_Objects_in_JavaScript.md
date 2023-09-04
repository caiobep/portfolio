---
id: "a90467dd-f6af-48d1-809b-17ce4e19e4e7"
date: "2022-05-31T00:05:00.000Z"
title: "CS Series:  Hash Maps vs Objects in JavaScript"
summary: "\"Hash Maps vs Objects in JavaScript\" - exploring data structures, performance, and best practices in modern JS development."
readTime: undefined
tagIds: ["a2b35422-71da-40d7-8a17-c8eb1055ffd9","ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"a2b35422-71da-40d7-8a17-c8eb1055ffd9","name":"JavaScript","icon":""},{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
# Map


Although people historically use `Object` for almost every data structure on JavaScript(because there were no alternatives in the beginning) there are many built-in interesting Data Structures in almost every JavaScript engine today [(see Standard built-in objects)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).


Today we're going to talk about `map`


A Map object iterates its elements in insertion order, allowing you to use a `for...of` loop with it's `[key, value]` for each insertion


## Object vs. Maps


Object is similar to Map, both let ou set keys to values, retrieve those values, delete keys and detect whether something is stored at a key. For this reason (and because there were no built-in alternatives)


## Map vs Object Resource Consumption Comparison


```javascript
const createObject = () => {
    let b: any = {}
    b["afdb7f50-64e1-4256-9977-4106df62f5c5"] = 'bom_dia'
    b["e3a0368e-afb5-4da5-8ebd-e5186b512365"] = 'bom_dia'
    b["1dd67499-9afe-4498-8e11-12b6bd101995"] = 'bom_dia'
    b["e6acc32f-a912-4ac3-9d35-ed314b8d78f4"] = 'bom_dia'
    b["1738cfbd-973c-459d-8cd3-a33572c3c3ed"] = 'bom_dia'
    b["62142618-ce87-479c-8016-bf7bc40694a7"] = 'bom_dia'
    b["9db87d37-c096-42d3-ae8d-ffc9b1f9378e"] = 'bom_dia'
    b["109fdbf6-9ee5-4722-b0ae-3fcc744390fe"] = 'bom_dia'
    b["76295235-f514-4573-8324-05b77a63c045"] = 'bom_dia'
    b["9ecb2d64-af6d-401e-8e89-119ab4b81eb0"] = 'bom_dia'
    b["bef94ae0-cc8a-48c4-bedb-1a8043c6676f"] = 'bom_dia'
    b["867fc53d-7a90-4d5d-a95a-5b4bfd53fd6b"] = 'bom_dia'
    b["8f623d6c-5818-4393-8028-c54ed5395dba"] = 'bom_dia'
    b["4323ff1c-c03c-4fbc-bbd7-390ebfd7fbb4"] = 'bom_dia'
    b["ad9c984e-c30b-42f0-85d1-aae72edd0aab"] = 'bom_dia'
    b["96ebf8c6-3bd1-48ea-a790-dc6af827e277"] = 'bom_dia'
    b["b486ae57-cd7a-41ce-a88d-96f6eb95402e"] = 'bom_dia'
    b["fa0151cd-63fe-4b45-a317-cbab64b65c88"] = 'bom_dia'
    b["653bc331-90e7-4299-8377-98c56ca2df30"] = 'bom_dia'
    b["c041833e-7f7a-446c-b2a0-e9425859bee0"] = 'bom_dia'
    b["5e2c9821-3fa3-4123-96f9-2ebd07aef366"] = 'bom_dia'
    b["2dae987b-be3c-4942-8f9f-dc294480add4"] = 'bom_dia'
    b["7334567e-ecb9-4845-96a3-1409ac1657e0"] = 'bom_dia'
    b["63b8657b-8c8c-421d-920f-b1fe7771a7f1"] = 'bom_dia'
    b["c28f045b-eb67-48b6-8393-fcad03c51eff"] = 'bom_dia'
    b["0c0029e1-f28c-4678-bebd-e6986caa4677"] = 'bom_dia'
    b["f0f55d71-58a8-41d0-aa4d-6475900f6b45"] = 'bom_dia'
    b["56e57882-8a67-4b80-90ec-54d89f582680"] = 'bom_dia'
    b["36d1f630-b42a-48d8-8f8d-938831266996"] = 'bom_dia'
    b["5f53f30d-a0db-4a45-a57a-ab4a8626a0bd"] = 'bom_dia'
    b["b79b71f2-0204-42a9-9de1-9570ef0c72b9"] = 'bom_dia'
    b["d66182af-2749-4cf2-9a8a-949ef2673314"] = 'bom_dia'
    b["90acfb63-e5e0-42ad-8345-bc397db89ed5"] = 'bom_dia'
    b["2eaa8f29-e290-449c-ab46-aa980788ea2d"] = 'bom_dia'
    b["9c6c60d2-086e-4977-8a1c-80a1f89c88d2"] = 'bom_dia'
    b["f005431d-52a7-414d-bcfa-38dbd4d0d810"] = 'bom_dia'
    b["aa362a24-fe57-45d6-9b95-e5d86c2e9775"] = 'bom_dia'
    b["de7997bf-66d4-4323-8019-1423340a57c4"] = 'bom_dia'
    b["5887d156-f607-405e-af7a-1ddd0b3dbca8"] = 'bom_dia'
    b["19f148d7-e0fd-4571-b2b2-c59d1415f0ba"] = 'bom_dia'
    b["e708cd40-fffd-4ea2-94ac-1bc2abb66326"] = 'bom_dia'
    b["9d9d1e02-4bab-4b43-b919-4adc571b8044"] = 'bom_dia'
    b["daea3dd9-353f-4a35-93bd-9a6c8fbcc55f"] = 'bom_dia'
    b["fce852e8-4fa5-4d04-b943-074a63d4a2a0"] = 'bom_dia'
    b["f41e673f-834b-4326-9c7e-31b62c271d46"] = 'bom_dia'
}

const createMap = () => {
   const b = new Map()
    b.set("1a9eff25-c62f-47a9-b3b2-58d68b11d738", 'bom dia')
    b.set("94c0e078-afd8-4d57-b89e-9befa1aa5b35", 'bom dia')
    b.set("e3d2a32a-b7df-498e-b44c-85fff5878264", 'bom dia')
    b.set("5b92a128-c1f1-44a4-8cc3-73479eff13d8", 'bom dia')
    b.set("7921fd22-15cf-427d-88f2-7a38d110dc52", 'bom dia')
    b.set("b7f982eb-a155-4e71-bda8-1a377a4cde61", 'bom dia')
    b.set("4491ff15-ea6a-4efd-b72d-670cbdee327b", 'bom dia')
    b.set("d6f26af8-eea6-4e30-a1bb-d5d167e5dd16", 'bom dia')
    b.set("f12bd1bd-8b71-4c9e-a23f-611d7942be28", 'bom dia')
    b.set("45838753-49ae-445b-aa73-e1ef532e85ba", 'bom dia')
    b.set("9a6fe22f-4e02-4091-8255-70e8b7b6f683", 'bom dia')
    b.set("d8c21d8e-e54f-4f6a-b432-fe7751478570", 'bom dia')
    b.set("5c5341bf-26e3-4032-a402-18610244b593", 'bom dia')
    b.set("01350860-b868-41b1-86ed-bdaf1d9c330e", 'bom dia')
    b.set("a819c08b-7d3f-4e06-976c-b0d0d880214e", 'bom dia')
    b.set("6eeb8927-650e-41db-b508-c87637bba42a", 'bom dia')
    b.set("53767005-95e5-479c-9122-593fcc20670d", 'bom dia')
    b.set("4cf5b9b7-778c-49b7-8373-e824462d7b3c", 'bom dia')
    b.set("aff3ab37-d034-4ee0-b1a1-9ea46e06f7de", 'bom dia')
    b.set("46e0341f-329e-4b0a-ac9a-86a3c7e8b1f1", 'bom dia')
    b.set("55466eb5-5eef-4f36-b6d8-a605ffa1daa5", 'bom dia')
    b.set("6c825dfb-a0b0-4836-96dc-c8ba5abed755", 'bom dia')
    b.set("69e9a7a1-c116-421c-b748-58eea039b228", 'bom dia')
    b.set("537f8435-f9ec-4ec6-b2e9-4f8547fde13b", 'bom dia')
    b.set("c7031808-b13b-4e83-81ff-5e0e00270e14", 'bom dia')
    b.set("5711b8a5-59aa-4652-955d-e311148e49dc", 'bom dia')
    b.set("1e54a8b6-1ecf-44e5-9064-ceea60156e92", 'bom dia')
    b.set("78f6b6a6-5ed3-4de0-a88e-8460695baac9", 'bom dia')
    b.set("2adad631-728e-4497-8775-6d6710d999f8", 'bom dia')
    b.set("9a2124bb-11dc-4a76-92c1-bfe407bf1663", 'bom dia')
    b.set("befdbdba-4b23-4cf3-9f55-b2e97bdc038c", 'bom dia')
    b.set("ba6777bb-8658-4e0e-861f-3fd58ec78595", 'bom dia')
    b.set("2bdc9b5e-2bc7-49aa-a1f6-27a96ea15a81", 'bom dia')
    b.set("a4f7da4a-3bf5-47a1-b310-72ecbbe741e5", 'bom dia')
    b.set("2249eac6-5777-4b82-a9b6-3d3fd7865f94", 'bom dia')
    b.set("05209734-8747-4b7d-8867-99cecd4152b4", 'bom dia')
    b.set("3f8e6091-5b82-4410-9aff-c4eb6a359b10", 'bom dia')
    b.set("e90a0fdf-878d-4fe6-b107-fde26fe19a3d", 'bom dia')
    b.set("baa5a0bf-ee2f-40ec-b6f0-aa5fd5e7a3ae", 'bom dia')
    b.set("1347c7e8-9094-4c70-9a58-444eb085142a", 'bom dia')
    b.set("e9b4ef85-c23d-432d-8f25-d316f2c6c650", 'bom dia')
    b.set("25eab9fb-22be-4f45-b4b7-0e28be08326c", 'bom dia')
    b.set("6fa095e9-a7e6-4227-9c62-7a2e074fad89", 'bom dia')
    b.set("b3976d1b-1a4f-47b9-a7b7-137f2a4cf164", 'bom dia')
    b.set("23ffb008-ae12-47d9-b073-c8f148c56013", 'bom dia')
}

createObject()  // ~0.140ms
createMap() // ~2.391ms
```


 It seems that `createMap` is a little bit more expensive to run.

