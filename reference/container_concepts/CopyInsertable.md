# CopyInsertable
* container_concepts[meta header]

## 概要
CopyInsertableは、任意のコンテナ`X`に対して、その要素型オブジェクトをコピー挿入可能かを表す要件である。


## 要件
以下の式が可能であること：

```cpp
allocator_traits<A>::construct(m, p, v)
```
* allocator_traits[link /reference/memory/allocator_traits.md]
* construct[link /reference/memory/allocator_traits/construct.md]

- 型`A`は、任意のコンテナ`X`に使用するメモリアロケータ型
- `m`は、型`A`のメモリアロケータオブジェクト
- `p`は、コンテナ`X`の要素型を指すポインタ型オブジェクト
- `v`は、挿入する要素。コンテナ`X`の要素型`T`のオブジェクトである

