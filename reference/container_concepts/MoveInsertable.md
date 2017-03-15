# MoveInsertable
* container_concepts[meta header]
* std[meta namespace]

## 概要
MoveInsertableは、任意のコンテナ`X`に対して、その要素型の右辺値オブジェクトをムーブ挿入可能かを表す要件である。


## 要件
以下の式が可能であること：

```cpp
allocator_traits<A>::construct(m, p, rv)
```
* allocator_traits[link /reference/memory/allocator_traits.md]
* construct[link /reference/memory/allocator_traits/construct.md]

- 型`A`は、任意のコンテナ`X`に使用するメモリアロケータ型
- `m`は、型`A`のメモリアロケータオブジェクト
- `p`は、コンテナ`X`の要素型を指すポインタ型オブジェクト
- `rv`は、挿入する要素の右辺値。コンテナ`X`の要素型`T`の右辺値オブジェクトである

