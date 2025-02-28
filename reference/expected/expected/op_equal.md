# operator==
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
template<class T2, class E2> requires (!is_void_v<T2>)
friend constexpr bool operator==(const expected& x, const expected<T2, E2>& y); // (1)

template<class T2>
friend constexpr bool operator==(const expected& x, const T2& v); // (2)
// (2)により、下記オーバーロードが使用可能になる
template<class T2>
friend constexpr bool operator==(const T2& v, const expected& x); // (3)

template<class E2>
friend constexpr bool operator==(const expected& x, const unexpected<E2>& e); // (4)
// (4)により、下記オーバーロードが使用可能になる
template<class E2>
friend constexpr bool operator==(const unexpected<E2>& e, const expected& x); // (5)
```
* is_void_v[link /reference/type_traits/is_void.md]
* unexpected[link ../unexpected.md]

## 概要
- (1) : `expected`オブジェクト同士の等値比較を行う。
- (2), (3) : `expected`オブジェクトと正常値の等値比較を行う。
- (4), (5) : `expected`オブジェクトとエラー値の等値比較を行う。


## テンプレートパラメータ制約
- (1) : 式[`*x`](op_deref.md) `==` [`*y`](op_deref.md)および式`x.`[`error()`](error.md) `== y.`[`error()`](error.md)が適格であり、各式の結果を`bool`へ変換可能であること。
- (2), (3) : 式[`*x`](op_deref.md) `== v`が適格であり、その結果を`bool`へ変換可能であること。
- (4), (5) : 式`x.`[`error()`](error.md) `== e.`[`error()`](../unexpected/error.md)が適格であり、その結果を`bool`へ変換可能であること。


## 戻り値
- (1) : 次の値を返す
    - `x.`[`has_value()`](has_value.md)と`y.`[`has_value()`](has_value.md)が異なるとき、`false`
    - `x.`[`has_value()`](has_value.md) `== true`のとき、[`*x`](op_deref.md) `==` [`*y`](op_deref.md)
    - `x.`[`error()`](error.md) `== y.`[`error()`](error.md)
- (2), (3) : `x.`[`has_value()`](has_value.md) `&& static_cast<bool>(`[`*x`](op_deref.md) `== v)`
- (4), (5) : `!x.`[`has_value()`](has_value.md) `&& static_cast<bool>(x.`[`error()`](error.md) `== e.`[`error()`](../unexpected/error.md)`)`


## 例
```cpp example
#include <cassert>
#include <expected>

int main()
{
  std::expected<long, long>   x1 = 1;
  std::expected<short, short> y1 = 1;
  std::expected<long, long>   x2 = std::unexpected{1};
  std::expected<short, short> y2 = std::unexpected{1};

  // (1)
  assert(x1 == y1);
  assert(x2 == y2);
  assert(not (x1 == y2));
  assert(not (x2 == y1));

  // (2), (3)
  assert(x1 == 1);
  assert(1 == x1);

  // (4), (5)
  assert(x2 == std::unexpected{1});
  assert(std::unexpected{1} == x2);
}
```
* ==[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P3379R0 Constrain `std::expected` equality operators](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3379r0.html)
    - C++26で「適格要件」を「テンプレートパラメータ制約」に変更
