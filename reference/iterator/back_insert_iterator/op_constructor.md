# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* back_insert_iterator[meta class]
* function[meta id-type]

```cpp
explicit back_insert_iterator(Container& x);           // C++03
explicit constexpr back_insert_iterator(Container& x); // C++20
```

## 概要
`back_insert_iterator`オブジェクトを構築する。


## 効果

`x`へのポインタをメンバ変数`container`に保持する。

- C++11まで : `x`へのポインタは、`&x`で取得する
- C++14以降 : `x`へのポインタは、[`std::addressof`](/reference/memory/addressof.md)`(x)`で取得する


## 参照
- [LWG Issue 2324. Insert iterator constructors should use `addressof()`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2324)
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2325R3 Views should not be required to be default constructible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2325r3.html)
