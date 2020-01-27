# 論理反転関数オブジェクト
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
namespace std {
  template <typename Pred>
  struct unary_negate {
    explicit unary_negate(const Pred& pred);           // C++98
    explicit constexpr unary_negate(const Pred& pred); // C++14
    bool operator()(const typename Pred::argument_type& x) const;           // C++98
    constexpr bool operator()(const typename Pred::argument_type& x) const; // C++14
    using argument_type = typename Pred::argument_type;
    using result_type   = bool;
  };

  template <typename Pred>
  unary_negate<Pred> not1(const Pred& pred);           // C++98

  template <typename Pred>
  constexpr unary_negate<Pred> not1(const Pred& pred); // C++14

  template <typename Pred>
  struct binary_negate {
    explicit binary_negate(const Pred& pred);           // C++98
    explicit constexpr binary_negate(const Pred& pred); // C++14
    bool operator()(
             const typename Pred::first_argument_type& x,
             const typename Pred::second_argument_type& y) const; // C++98
    constexpr bool operator()(
             const typename Pred::first_argument_type& x,
             const typename Pred::second_argument_type& y) const; // C++14

    using first_argument_type  = typename Pred::first_argument_type;
    using second_argument_type = typename Pred::second_argument_type;
    using result_type          = bool;
  };

  template <typename Pred>
  binary_negate<Pred> not2(const Pred& pred); // C++98

  template <typename Pred>
  constexpr binary_negate<Pred> not2(const Pred& pred); // C++14
}
```

これらの機能は、C++17から非推奨となり、C++20で削除された。代わりに[`std::not_fn()`](not_fn.md)関数を使用すること。


## 概要
述語関数オブジェクトの結果を反転する関数オブジェクトアダプタ。`unary_negate` は1引数述語用、`binary_negate` は2引数述語用。


テンプレート引数 `Pred` に対する要求

- `unary_negate`の場合
	- 型`Pred`に`argument_type`というメンバ型が�在すること
	- 型`Pred`への`const`参照`pred`に対して、式 `(bool)pred(x)` が有効であること。ただし `x` は `argument_type` への `const` 参照。
- `binary_negate`の場合
	- 型`Pred`に`first_argument_type`、`second_argument_type`というメンバ型が�在すること
	- 型`Pred`への`const`参照`pred`に対して、式 `(bool)pred(x, y)` が有効であること。ただし `x` と `y` は、それぞれ `first_argument_type` と `second_argument_type` への `const` 参照。


## メンバ関数

| 名前 | 説明 |
|-----------------------------------|------------------------------------|
| `unary_negate<Pred>::operator()`  | `!pred(x)` と�価 |
| `binary_negate<Pred>::operator()` | `!pred(x, y)` と�価 |


## メンバ型

| 名前 | 説明 |
|------------------------|-------------------------------------------------------------------------|
| `argument_type`        | (`unary_negate`のみ) `typename Pred::argument_type` と�価 |
| `first_argument_type`  | (`binary_negate`のみ) `typename Pred::first_argument_type` と�価 |
| `second_argument_type` | (`binary_negate`のみ) `typename Pred::second_argument_type` と�価 |
| `result_type`          | `bool` |


## 非メンバ関数

| 名前 | 説明 |
|--------------------------|--------------------------------------------|
| `not1(const Pred& pred)` | `unary_negate<Pred>(pred)` を構築して返す  |
| `not2(const Pred& pred)` | `binary_negate<Pred>(pred)` を構築して返す |


## 例
```cpp example
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::boolalpha << std::not2(std::less<int>())(3, 5) << std::endl;
}
```
* std::not2[color ff0000]
* std::less[link less.md]

### 出力
```
false
```

## 参照
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
