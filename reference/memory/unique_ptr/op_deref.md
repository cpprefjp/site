# operator*
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
typename add_lvalue_reference<T>::type operator*() const; // (1) C++11
constexpr add_lvalue_reference_t<T> operator*() const;    // (1) C++23
```
* add_lvalue_reference[link /reference/type_traits/add_lvalue_reference.md]
* add_lvalue_reference_t[link /reference/type_traits/add_lvalue_reference.md]

## 概要
ポインタを間接参照する。


## テンプレートパラメータ制約
- C++26 : `*`[`declval`](/reference/utility/declval.md)`<pointer>()`が適格な式であること。
    - これにより、`unique_ptr<void>`のように間接参照できない型に対してこの演算子はオーバーロード解決から除外され、SFINAEフレンドリに振る舞う（テンプレートやコンセプトの制約チェックでハードエラーにならず、単に制約を満たさないものとして扱われる）。
- C++26 : `T`が配列型である場合、または[`add_lvalue_reference_t`](/reference/type_traits/add_lvalue_reference.md)`<T>`が有効な型でない場合、プログラムは不適格となる。


## 要件

```cpp
get() != nullptr
```
* get()[link get.md]


## 戻り値
`*`[`get()`](get.md)


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  int& r = *p;
  std::cout << r << std::endl;
}
```

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
- [LWG Issue 4148. `unique_ptr::operator*` should not allow dangling references](https://cplusplus.github.io/LWG/issue4148)
    - C++26で、`T`が配列型、または`add_lvalue_reference_t<T>`が有効な型でない場合にこの演算子の実体化が不適格となることが明確化された
- [LWG Issue 4324. `unique_ptr<void>::operator*` is not SFINAE-friendly](https://cplusplus.github.io/LWG/issue4324)
    - C++26で、`*declval<pointer>()`が適格であるという制約が追加され、`unique_ptr<void>`などに対してこの演算子がSFINAEフレンドリに振る舞うようになった。LWG 2762で追加された条件付き`noexcept`により、`shared_ptr<void>::operator*`とは異なり制約チェックの失敗ではなくハードエラーになりうる問題を解決するもの（GCC・Clangは執筆時点で未対応で、`unique_ptr<void>`に対しても`operator*`が利用できる）
