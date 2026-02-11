# operator=
* functional[meta header]
* std[meta namespace]
* function_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr function_ref& operator=(const function_ref&) noexcept = default; // (1)

template<class T> function_ref& operator=(T) = delete; // (2)
```

## 概要
コピー代入演算子。


## テンプレートパラメータ制約
- (2) : 以下の制約をみたすとき、代入演算子はdelete宣言される
    - `T`が`function_ref`と同一型ではなく、かつ
    - [`is_pointer_v`](/reference/type_traits/is_pointer.md)`<T>`が`false`であり、かつ
    - `T`が[`constant_arg_t`](/reference/utility/constant_arg_t.md)の特殊化でないこと


## 効果
- (1) : コピー代入。


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x)
{ return x; }

int twice(int x)
{ return x * 2; }

int main()
{
  std::function_ref<int(int)> f = ident;
  std::function_ref<int(int)> g = twice;

  // コピー代入
  f = g;

  std::cout << f(1) << std::endl;
}
```

### 出力
```
2
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0792R14 `function_ref`: a type-erased callable reference](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0792r14.html)
- [P3774R1 Rename `std::nontype`, and make it broadly useful](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3774r1.html)
