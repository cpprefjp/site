# add_pointer
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct add_pointer {
    using type = …;
  };

  template <class T>
  using add_pointer_t = typename add_pointer<T>::type; // C++14
}
```

## 概要
型にポインタを追加する。


## 効果
- 型`T`が参照可能な型（オブジェクト型・参照型、およびCV修飾・参照修飾のない関数型）もしくは（CV修飾されていてもよい）`void`である場合、`add_pointer`は型[`remove_reference`](remove_reference.md)`<T>::type*`をメンバ型`type`として定義する。
- そうでない場合（CV修飾・参照修飾された関数型）は、型`T`をそのままメンバ型`type`として定義する。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_same<std::add_pointer<int>::type, int*>::value, "transform int to int*");
static_assert(std::is_same<std::add_pointer<int&>::type, int*>::value, "transform int& to int*");
static_assert(std::is_same<std::add_pointer<int*>::type, int**>::value, "transform int* to int**");
static_assert(std::is_same<std::add_pointer<int*&>::type, int**>::value, "transform int*& to int**");

int main() {}
```
* std::add_pointer[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- `add_pointer_t`は2013から


## 参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [LWG Issue 2101. Some transformation types can produce impossible types](https://cplusplus.github.io/LWG/issue2101)
    - C++17で、CV修飾・参照修飾された関数型に対して不適格な型を生成しないよう規定が整理された
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。CV修飾・参照修飾された関数型に対して`void(&)() const`のような型システムに存在しない型を作ろうとする元の規定は実装不可能であり、処理系は当初から型`T`をそのまま返していたため
