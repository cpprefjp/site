# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* insert_iterator[meta class]
* function[meta id-type]

```cpp
insert_iterator() = default;                                              // (1) C++20

insert_iterator(Container& x, typename Container::iterator i);            // (2) C++03
constexpr insert_iterator(Container& x, ranges::iterator_t<Container> i); // (2) C++20
```
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要
`insert_iterator`オブジェクトを構築する。


## 効果

- (1) : メンバ変数`container`を`nullptr`で、挿入位置を示すイテレータ`i`を[`ranges::iterator_t`](/reference/ranges/iterator_t.md)`<Container>()`で初期化する。
- (2) : コンテナ`x`へのポインタをメンバ変数`container`に保持し、挿入位置を示すイテレータ`i`をメンバ変数`iter`に保持する。
    - C++11まで : `x`へのポインタは、`&x`で取得する
    - C++14以降 : `x`へのポインタは、[`std::addressof`](/reference/memory/addressof.md)`(x)`で取得する


## 参照
- [LWG Issue 2324. Insert iterator constructors should use `addressof()`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2324)
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
