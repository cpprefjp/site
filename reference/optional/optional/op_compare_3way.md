# operator<=>
* optional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, three_way_comparable_with<T> U>
  constexpr compare_three_way_result_t<T,U>
    operator<=>(const optional<T>& x, const optional<U>& y); // (1) C++20

  template <class T>
  constexpr strong_ordering
    operator<=>(const optional<T>& x, nullopt_t) noexcept;   // (2) C++20

  template <class T, three_way_comparable_with<T> U>
  constexpr compare_three_way_result_t<T,U>
    operator<=>(const optional<T>& x, const U& v);           // (3) C++20
}
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
`optional`オブジェクトの三方比較を行う。

- (1) : `optional<T>`と`optional<U>`の三方比較
- (2) : `optional<T>`と無効値[`nullopt_t`](/reference/optional/nullopt_t.md)の三方比較
- (3) : `optional<T>`と有効値`U`の三方比較


## 戻り値
- (1) :
    - `x && y`が`true`である場合`*x <=> *y`を返し、そうでなければ`bool(x) <=> bool(y)`を返す

- (2) :
    ```cpp
    return bool(x) <=> false;
    ```

- (3) : 以下と等価
    ```cpp
    return bool(x) ? *x <=> v : strong_ordering::less;
    ```


## 備考
- (2) : この演算子により、以下の演算子が使用可能になる (C++20)：
    - `bool operator<(const optional<T>&, const nullopt_t&) noexcept;`
    - `bool operator<(const nullopt_t&, const optional<T>&) noexcept;`
    - `bool operator<=(const optional<T>&, const nullopt_t&) noexcept;`
    - `bool operator<=(const nullopt_t&, const optional<T>&) noexcept;`
    - `bool operator>(const optional<T>&, const nullopt_t&) noexcept;`
    - `bool operator>(const nullopt_t&, const optional<T>&) noexcept;`
    - `bool operator>=(const optional<T>&, const nullopt_t&) noexcept;`
    - `bool operator>=(const nullopt_t&, const optional<T>&) noexcept;`


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

    assert((a <=> c) == 0);
    assert((a <=> b) != 0);
    assert((a <=> none) != 0);
    assert((none <=> a) != 0);
  }

  // optionalオブジェクトとnulloptの比較
  {
    std::optional<int> p = 3;
    std::optional<int> none;

    assert((p <=> std::nullopt) != 0);
    assert((none <=> std::nullopt) == 0);

    assert((std::nullopt <=> p) != 0);
    assert((std::nullopt <=> none) == 0);
  }

  // optionalオブジェクトと有効値の比較
  {
    std::optional<int> p = 3;
    std::optional<int> none;

    assert((p <=> 3) == 0);
    assert((3 <=> p) == 0);

    assert((none <=> 3) != 0);
    assert((3 <=> none) != 0);
  }
}
```
* std::nullopt[link /reference/optional/nullopt_t.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
