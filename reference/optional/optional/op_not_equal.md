# operator!=
* optional[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class T, class U>
  constexpr bool operator!=(const optional<T>& x, const optional<U>& y); // (1)

  template <class T>
  constexpr bool operator!=(const optional<T>& x, nullopt_t y) noexcept; // (2)
  template <class T>
  constexpr bool operator!=(nullopt_t x, const optional<T>& y) noexcept; // (3)

  template <class T, class U>
  constexpr bool operator!=(const optional<T>& x, const U& y);           // (4)
  template <class T, class U>
  constexpr bool operator!=(const U& x, const optional<T>& y);           // (5)
}
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
`optional`オブジェクトの非等値比較を行う。


## 要件
- (1), (4), (5) : 型`T`が`!=`で比較可能であること


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
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2934. `optional<const T>` doesn't compare with `T`](https://wg21.cmeerw.net/lwg/issue2934)
