# operator==
* optional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  constexpr bool operator==(const optional<T>& x, const optional<U>& y); // (1) C++17

  template <class T>
  constexpr bool operator==(const optional<T>& x, nullopt_t) noexcept;   // (2) C++17

  template <class T, class U>
  constexpr bool operator==(const optional<T>& x, const U& y);           // (3) C++17

  template <class T, class U>
  constexpr bool operator==(const T& x, const optional<U>& y);           // (4) C++17

  // (2) により、以下のオーバーロードが使用可能になる (C++20)
  template <class T>
  constexpr bool operator==(nullopt_t, const optional<T>& y) noexcept;   // (5) C++17
}
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
`optional`オブジェクトの等値比較を行う。


## 要件
- (1), (3), (4) : 型`T`が`==`で比較可能であること


## 戻り値
- (1) : `x`と`y`がどちらも有効値を持っていれば、有効値同士を等値比較した結果を返す。`x`と`y`がどちらも有効値を持っていなければ`true`を返す。`x`と`y`のうち、どちらかが有効値を持ち、どちらかが持たない場合は`false`を返す
- (2) : `x`が有効値を持っていなければ`true`、そうでなければ`false`を返す
- (3) : `x`が有効値を持っていれば、`y`と等値比較した結果を返す。そうでなければ`false`を返す
- (4) : `y`が有効値を持っていれば、`x`と等値比較した結果を返す。そうでなければ`false`を返す
- (5) : `y`が有効値を持っていなければ`true`、そうでなければ`false`を返す


## 備考
- (2) : この演算子により、以下の演算子が使用可能になる (C++20)：
    - `bool operator==(const nullopt_t&, const optional<T>&) noexcept;`
    - `bool operator!=(const optional<T>&, const nullopt_t&) noexcept;`
    - `bool operator!=(const nullopt_t&, const optional<T>&) noexcept;`


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

    assert(a == c);
    assert(!(a == b));
    assert(!(a == none));
    assert(!(none == a));
  }

  // optionalオブジェクトとnulloptの比較
  {
    std::optional<int> p = 3;
    std::optional<int> none;

    assert(!(p == std::nullopt));
    assert(none == std::nullopt);

    assert(!(std::nullopt == p));
    assert(std::nullopt == none);
  }

  // optionalオブジェクトと有効値の比較
  {
    std::optional<int> p = 3;
    std::optional<int> none;

    assert(p == 3);
    assert(3 == p);

    assert(!(none == 3));
    assert(!(3 == none));
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
