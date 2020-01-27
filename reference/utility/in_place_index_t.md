# in_place_index_t
* utility[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template<std::size_t I>
  struct in_place_index_t {
    explicit in_place_index_t() = default;
  };

  template<size_t I>
  inline constexpr in_place_index_t<I> in_place_index{};
}
```

## 概要
`in_place_index_t`クラスは、標準ライブラリの特定機能のコンストラクタに渡すことができる、曖昧性の解消タグである。曖昧性については、例を参照。


## 備考
デフォルトコンストラクタに`explicit`が付いているのは、`in_place_index_t<T> x = {};`のように`=`付きの波カッコ初期化を禁�するためである。ユーザーは通常、`in_place_index_t<T>`型の定数として事前定義されている`in_place_index<T>`を使用すればよいので、問題にはならない。


## 例
```cpp example
#include <iostream>
#include <variant>

int main()
{
  // std::variant<int, int> x { 1 }; // どちらの int か曖昧

  std::variant<int, int> x {
    std::in_place_index<0>,
    1
  }; // テンプレート引数の最初の int に 1 を格納して構築

  std::visit([](auto&& arg){std::cout << arg;}, x);
}
```
* std::in_place_index[color ff0000]
* std::variant[link /reference/variant/variant.md]
* std::visit[link /reference/variant/visit.md]

### 出力
```
1
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0032R1 Homogeneous interface for `variant`, `any` and `optional` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r1.pdf)
- [P0032R2 Homogeneous interface for `variant`, `any` and `optional` (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r2.pdf)
- [P0032R3 Homogeneous interface for `variant`, `any` and `optional` (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r3.pdf)
- [P0504R0 Revisiting in-place tag types for `any`/`optional`/`variant`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0504r0.html)
