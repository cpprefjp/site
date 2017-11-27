# operator==
* optional[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class U>
  constexpr bool operator==(const optional<T>& x, const optional<U>& y); // (1)

  template <class T>
  constexpr bool operator==(const optional<T>& x, nullopt_t) noexcept;   // (2)
  template <class T>
  constexpr bool operator==(nullopt_t, const optional<T>& y) noexcept;   // (3)

  template <class T, class U>
  constexpr bool operator==(const optional<T>& x, const U& y);           // (4)
  template <class T, class U>
  constexpr bool operator==(const U& x, const optional<T>& y);           // (5)
}
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
`optional`オブジェクトの等値比較を行う。


## 要件
- (1), (4), (5) : 型`T`が`==`で比較可能であること


## 戻り値
- (1) : `x`と`y`がどちらも有効値を持っていれば、有効値同士を等値比較した結果を返す。`x`と`y`がどちらも有効値を持っていなければ`true`を返す。`x`と`y`のうち、どちらかが有効値を持ち、どちらかが持たない場合は`false`を返す
- (2) : `x`が有効値を持っていなければ`true`、そうでなければ`false`を返す
- (3) : `y`が有効値を持っていなければ`true`、そうでなければ`false`を返す
- (4) : `x`が有効値を持っていれば、`y`と等値比較した結果を返す。そうでなければ`false`を返す
- (5) : `y`が有効値を持っていれば、`x`と等値比較した結果を返す。そうでなければ`false`を返す


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
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2934. `optional<const T>` doesn't compare with `T`](https://wg21.cmeerw.net/lwg/issue2934)
