#EmplaceInsertable
* container_concepts[meta header]
* std[meta namespace]

以下の式が可能であること：

```cpp
allocator_traits<A>::construct(m, p, args)
```
* allocator_traits[link /reference/memory/allocator_traits.md]
* construct[link /reference/memory/allocator_traits/construct.md]

- 型`A`は、任意のコンテナ`X`に使用するメモリアロケータ型
- `m`は、型`A`のメモリアロケータオブジェクト
- `p`は、コンテナ`X`の要素型を指すポインタ型オブジェクト
- `args`は、挿入する要素のコンストラクタ引数。コンテナ`X`の要素型`T`の、ゼロ個以上のコンストラクタ引数列である

