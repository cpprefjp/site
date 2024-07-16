# operator!=
* optional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  constexpr bool operator!=(const optional<T>& x, const optional<U>& y); // (1) C++17

  template <class T, class U>
  constexpr bool operator!=(const optional<T>& x, const U& y);           // (2) C++17
  template <class T, class U>
  constexpr bool operator!=(const U& x, const optional<T>& y);           // (3) C++17

  // operator==により、以下のオーバーロードが使用可能になる (C++20)
  template <class T>
  constexpr bool operator!=(const optional<T>& x, nullopt_t y) noexcept; // (4) C++17
  template <class T>
  constexpr bool operator!=(nullopt_t x, const optional<T>& y) noexcept; // (5) C++17
}
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
`optional`オブジェクトの非等値比較を行う。


## 要件
- (1), (2), (3) : 型`T`が`!=`で比較可能であること


## 戻り値
`!(x == y)`


## 例
```cpp example
#include <cassert>
#include <optional>

int main()
{
  // optionalオブジェクト同士の比較
  {
    std::optional<int> a = 3;
    std::optional<int> b = 1;
    std::optional<int> c = 3;
    std::optional<int> none;

    assert(a != b);
    assert(!(a != c));
    assert(a != none);
    assert(none != a);
  }

  // optionalオブジェクトとnulloptの比較
  {
    std::optional<int> p = 3;
    std::optional<int> none;

    assert(p != std::nullopt);
    assert(!(none != std::nullopt));

    assert(std::nullopt != p);
    assert(!(std::nullopt != none));
  }

  // optionalオブジェクトと有効値の比較
  {
    std::optional<int> p = 3;
    std::optional<int> none;

    assert(p != 1);
    assert(!(3 != p));

    assert(none != 1);
    assert(1 != none);
  }
}
```
* std::nullopt[link /reference/optional/nullopt_t.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2934. `optional<const T>` doesn't compare with `T`](https://wg21.cmeerw.net/lwg/issue2934)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
