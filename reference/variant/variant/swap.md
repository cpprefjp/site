# swap
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void swap(variant& rhs) noexcept(see below);
```

## 概要
他の`variant`オブジェクトとデータを入れ替える。


## テンプレートパラメータ制約
- `Types...`に含まれる全ての型`Ti`について、[`is_swappable_v`](/reference/type_traits/is_swappable.md)`<Ti>`が`true`、かつ[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<Ti>`が`true`であること


## 効果
- [`valueless_by_exception()`](valueless_by_exception.md) `&& rhs.`[`valueless_by_exception()`](valueless_by_exception.md)が`true`である場合、なにもしない (どちらも空)
- [`index()`](index.md) `== rhs.`[`index()`](index.md)である場合、そのインデックス値を`I`として、`swap(`[`get`](get.md)`<I>(*this),` [`get`](get.md)`<I>(rhs))`を呼び出す
- いずれにも当てはまらない場合、`rhs`と`*this`の状態を入れ替える


## 戻り値
なし


## 例外
- [`index()`](index.md) `== rhs.`[`index()`](index.md)である場合、そのインデックスの型を`Ti`として、`Ti`型同士の`swap`操作が任意の例外を送出する可能性がある。そうでない場合、`*this`が保持する型を`Ti`、`rhs`が保持する型を`Tj`として、`Ti`と`Tj`のムーブコンストラクタが任意の例外を送出する可能性がある
- `swap(`[`get`](get.md)`<I>(*this),` [`get`](get.md)`<I>(rhs))`の呼び出し�に例外が発生した場合、`*this`と`rhs`は、`Ti`型の`swap`操作がもつ例外安全性が保証する状態となる
- それ以外の状態での`*this`と`rhs`の入れ替え�に例外が発生した場合、`*this`と`rhs`の状態は、`variant`のムーブコンストラクタの例外安全保証によって決まる
- `noexcept`内の式は、`Types...`の全ての型`Ti`について、[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Ti> &&` [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<Ti>`を論理積としたものと�価になる


## 例
```cpp example
#include <cassert>
#include <variant>

int main()
{
  std::variant<int, char, double> a = 1;
  std::variant<int, char, double> b = 3.14;

  a.swap(b);

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
