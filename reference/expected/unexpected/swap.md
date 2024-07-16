# swap
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* unexpected[meta class]
* cpp23[meta cpp]

```cpp
constexpr void swap(unexpected& other)
  noexcept(is_nothrow_swappable_v<E>);
```
* is_nothrow_swappable_v[link /reference/type_traits/is_nothrow_swappable.md]


## 概要
他の`unexpected`オブジェクトとデータを入れ替える。


## テンプレートパラメータ制約
[`is_swappable_v`](/reference/type_traits/is_swappable.md)`<E> == true`


## 効果
動作説明用の`E`型メンバ変数`unex`として、次と等価 :

```cpp
using std::swap;
swap(unex, rhs.unex);
```
* std::swap[link /reference/utility/swap.md]


## 戻り値
なし


## 例
```cpp example
#include <cassert>
#include <expected>

int main()
{
  std::unexpected<int> x{1};
  std::unexpected<int> y{2};
  assert(x.error() == 1 && y.error() == 2);

  x.swap(y);
  assert(x.error() == 2 && y.error() == 1);
}
```
* swap[color ff0000]
* error()[link error.md]
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
