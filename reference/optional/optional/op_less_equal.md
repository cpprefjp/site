# operator<=
* optional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  constexpr bool operator<=(const optional<T>& x, const optional<U>& y); // (1) C++17

  template <class T, class U>
  constexpr bool operator<=(const optional<T>& x, const U& y);           // (2) C++17
  template <class T, class U>
  constexpr bool operator<=(const U& x, const optional<T>& y);           // (3) C++17

  // operator<=>により、以下のオーバーロードが使用可能になる (C++20)
  template <class T>
  constexpr bool operator<=(const optional<T>& x, nullopt_t) noexcept;   // (4) C++17
  template <class T>
  constexpr bool operator<=(nullopt_t, const optional<T>& y) noexcept;   // (5) C++17
}
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
`optional`において、左辺が右辺以下かの判定を行う。


## 要件
- (1), (2), (3) : 型`T`と型`U`が`<=`演算子で比較可能であること


## 戻り値
- (1) : `x`と`y`がどちらも有効値を持っていれば、有効値同士を`<=`演算子で比較した結果を返す。`x`が有効値を持っていなければ`true`を返す。`y`が有効値を持っていなければ`false`を返す
- (2) : `return x.`[`has_value()`](has_value.md) `? x.`[`value()`](value.md) `<= v : true;`
- (3) : `return y.`[`has_value()`](has_value.md) `? x <= y.`[`value()`](value.md) `: false;`
- (4) : `!x.`[`has_value()`](has_value.md)を返す
- (5) : `true`を返す


## 例
```cpp example
#include <cassert>
#include <optional>

int main()
{
  // optionalオブジェクト同士の比較
  {
    std::optional<int> a = 1;
    std::optional<int> b = 3;
    std::optional<int> none;

    assert(a <= b);
    assert(!(a <= none));
    assert(none <= a);
  }

  // optionalオブジェクトとnulloptの比較
  {
    std::optional<int> p = 3;
    std::optional<int> none;

    assert(!(p <= std::nullopt));
    assert(none <= std::nullopt);

    assert(std::nullopt <= p);
    assert(std::nullopt <= none);
  }

  // optionalオブジェクトと有効値の比較
  {
    std::optional<int> p = 1;
    std::optional<int> none;

    assert(p <= 3);
    assert(0 <= p);

    assert(none <= 3);
    assert(!(3 <= none));
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
- [P0307R2 Making Optional Greater Equal Again](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0307r2.pdf)
- [LWG Issue 2934. `optional<const T>` doesn't compare with `T`](https://wg21.cmeerw.net/lwg/issue2934)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
