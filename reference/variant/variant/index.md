# index
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr std::size_t index() const noexcept;
```

## 概要
候補型の何番目の型が代入されているかを取得する。

`variant<int, float, char> v;`があったとして、`float`型が保持されている場合にこの関数は値`1`を返し、`char`型の場合は値`2`を返す。


## 戻り値
[`valueless_by_exception()`](valueless_by_exception.md) `== true`の場合、[`std::variant_npos`](/reference/variant/variant_npos.md)を返す。そうでなければ、候補型のうち現在代入されている型が何番目かを、ゼ�からはじまるインデックスとして返す。


## 例
```cpp example
#include <cassert>
#include <variant>

int main()
{
  // デフォルト構築時には0番目の型で初期化される
  std::variant<int, float, char> v{};
  assert(v.index() == 0);

  v = 3.14f;
  assert(v.index() == 1);

  v = 'a';
  assert(v.index() == 2);
}
```
* index()[color ff0000]

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
