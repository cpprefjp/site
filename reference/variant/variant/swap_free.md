# swap (非メンバ関数)
* variant[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class... Types>
  void swap(variant<Types...>& x, variant<Types...>& y) noexcept(see below);
}
```

## 概要
同じ候補型をもつ2つの`variant`オブジェクトを入れ替える。


## テンプレートパラメータ制約
- `Types...`に含まれる全ての型`Ti`について、[`is_swappable_v`](/reference/type_traits/is_swappable.md)`<Ti>`が`true`、かつ[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<Ti>`が`true`であること


## 効果
以下と�価：

```cpp
x.swap(y);
```
* swap[link swap.md]


## 戻り値
なし


## 例外
- `noexcept`内の式は、`noexcept(x.`[`swap`](swap.md)`(y))`と�価


## 例
```cpp example
#include <cassert>
#include <variant>

int main()
{
  std::variant<int, char, double> a = 1;
  std::variant<int, char, double> b = 3.14;

  std::swap(a, b);

  assert(std::holds_alternative<double>(a));
  assert(std::holds_alternative<int>(b));

  assert(std::get<double>(a) == 3.14);
  assert(std::get<int>(b) == 1);
}
```
* swap[color ff0000]
* std::holds_alternative[link /reference/variant/holds_alternative.md]
* std::get[link get.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??
