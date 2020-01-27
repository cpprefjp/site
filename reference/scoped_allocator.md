# scoped_allocator
* scoped_allocator[meta header]
* cpp11[meta cpp]

`<scoped_allocator>`ヘッダでは、`vector<string>`のような、要素とコンテナで両方にメモリ確保が必要になった場合、コンテナと要素で同じア�ケータからメモリ確保する戦略をとるためのア�ケータアダプタを提供する。

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|-------------------------------------|-------|
| [`scoped_allocator_adaptor`](scoped_allocator/scoped_allocator_adaptor.md) | 入れ�になったオブジェクトに同じア�ケータを使用するためのアダプタ(class template) | C++11 |


## バージョン
### 言語
- C++11

