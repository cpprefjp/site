# is_nothrow_invocable_r
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class R, class F, class... ArgsTypes>
  struct is_nothrow_invocable_r;

  template <class R, class F, class... ArgsTypes>
  inline constexpr bool is_nothrow_invocable_r_v 
    = std::is_nothrow_invocable_r<R, F, ArgsTypes...>::value;
}
```

## 概要
型`F`が、与えられた型の引数`ArgsTypes...`で関数呼び出し可能であり、その戻り値型が`R`に変換可能かつ、その際に例外を投げないかどうかを調べる。


## 要件
型`R, F`および`ArgsTypes...`パラメータパックの全ての型が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`F`に対して引数`ArgsTypes...`による[*INVOKE*](/reference/concepts/Invoke.md)コンセプトに従った呼び出しが可能であり、その結果となる戻り値の型が`R`に変換可能かつ、その呼び出し及び変換に際していかなる例外も投げない場合[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例

```cpp example
#include <type_traits>
#include <iostream>

auto f(int) noexcept -> double {
  return 0.0;
}

auto g(double) -> double {
  return 0.0;
}

struct from_int {
  int n;

  operator int() noexcept {
    return n;
  }

  operator double() {
    return static_cast<double>(n);
  }
};

auto h(int n) noexcept -> from_int {
  return from_int{n};
}

int main()
{
  std::cout << std::boolalpha;

  //f(int) noexcept -> double
  std::cout << std::is_nothrow_invocable_r<double, decltype(f), int>::value << std::endl;

  //f(int) noexcept -> double （戻り値型変換不可）
  std::cout << std::is_nothrow_invocable_r<char*, decltype(f), int>::value << std::endl;

  //g(double) -> double （noexceptなし）
  std::cout << std::is_nothrow_invocable_r<double, decltype(g), double>::value << std::endl;

  //h(int) noexcept -> from_int::operator int() noexcept -> int
  std::cout << std::is_nothrow_invocable_r<int, decltype(h), int>::value << std::endl;

  //h(int) noexcept -> from_int::operator double() -> double （doubleへの変換演算�にnoexceptなし）
  std::cout << std::is_nothrow_invocable_r<double, decltype(h), int>::value << std::endl;
}
```
* std::is_nothrow_invocable_r[color ff0000]

### 出力
```
true
false
false
true
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 3

## 参照
- [C++1z 関数が呼び出し可能かを判定する型特性 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/05/13/183857)
- [Resolving GB 55, US 84, US 85, US 86](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0604r0.html)
