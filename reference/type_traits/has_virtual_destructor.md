# has_virtual_destructor
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct has_virtual_destructor;

  template <class T>
  inline constexpr bool has_virtual_destructor_v
    = has_virtual_destructor<T>::value;          // C++17
}
```

## 概要
型`T`が仮想デストラクタを持っているか調べる


## 要件
型`T`が非共用体のクラスである場合、その型は完全型でなければならない。


## 効果
`has_virtual_destructor`は、型`T`が仮想デストラクタを持っていれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

## 例

### 例1
```cpp example
#include <type_traits>

struct A {
  ~A() = default;
};

struct B {
  virtual ~B() = default;
};

static_assert(std::has_virtual_destructor<A>::value == false, "A hasn't virtual destructor");
static_assert(std::has_virtual_destructor<B>::value == true,  "B has virtual destructor");

static_assert(std::is_same<std::has_virtual_destructor<A>::type, std::false_type>::value, "B hasn't virtual destructor");
static_assert(std::is_same<std::has_virtual_destructor<B>::type, std::true_type>::value, "B has virtual destructor");

static_assert(std::has_virtual_destructor<int>::value == false, "int hasn't virtual destructor");
static_assert(std::has_virtual_destructor<int[]>::value == false, "array hasn't virtual destructor");
static_assert(std::has_virtual_destructor<void>::value == false, "void hasn't virtual destructor");

int main() {}
```
* std::has_virtual_destructor[color ff0000]

### 出力
```
```

### 例2
```cpp example
#include <type_traits>
#include <cstddef>
#include <iostream>
#include <memory>

struct nonvirtual_base {
  ~nonvirtual_base() { std::cout << "  nonvirtual_base::~nonvirtual_base()" << std::endl; }
};

struct virtual_base {
  virtual ~virtual_base() { std::cout << "  virtual_base::~virtual_base()" << std::endl; }
};

template<typename Base>
struct unsafe_derived : Base {  // 任意の型を基底クラスに取れてしまう
  ~unsafe_derived() { std::cout << "  unsafe_derived::~unsafe_derived()" << std::endl; }
};

template<typename Base, typename std::enable_if<std::has_virtual_destructor<Base>::value, std::nullptr_t>::type = nullptr>
struct safe_derived : Base {  // 仮想デストラクタを持つクラスでないと基底クラスに取れない
  ~safe_derived() { std::cout << "  safe_derived::~safe_derived()" << std::endl; }
};

int main() {
  {
    std::cout << "unsafe_derived<virtual_base> :" << std::endl;
    std::unique_ptr<virtual_base> p{new unsafe_derived<virtual_base>};
    // virtual_baseは仮想デストラクタを持つので ~unsafe_derived() と ~virtual_base() が呼ばれる
  }
  std::cout << "---" << std::endl;
  {
    std::cout << "unsafe_derived<nonvirtual_base> :" << std::endl;
    std::unique_ptr<nonvirtual_base> p{new unsafe_derived<nonvirtual_base>};
    // nonvirtual_baseは仮想デストラクタを持たないので ~nonvirtual_base() しか呼ばれない
    //   (unsafe_derived のメンバのデストラクトが行われなくなるのでリソースリークを起こす)
  }
  std::cout << "---" << std::endl;
  {
    std::cout << "safe_derived<virtual_base> :" << std::endl;
    std::unique_ptr<virtual_base> p{new safe_derived<virtual_base>};
    // virtual_baseは仮想デストラクタを持つので ~safe_derived() と ~virtual_base() が呼ばれる
  }
  std::cout << "---" << std::endl;
  {
    std::cout << "safe_derived<nonvirtual_base> :" << std::endl;
    // std::unique_ptr<nonvirtual_base> p{new safe_derived<nonvirtual_base>};
    // nonvirtual_baseは仮想デストラクタを持たないので safe_derived のテンプレートパラメータに指定できないため，コメントアウトを外すとコンパイルエラーになる
    //   (std::has_virtual_destructor を用いることでリソースリークが起こるようなコードをコンパイルできなくすることができる)
  }
  std::cout << "---" << std::endl;
}
```
* std::has_virtual_destructor[color ff0000]

### 出力
```
unsafe_derived<virtual_base> :
  unsafe_derived::~unsafe_derived()
  virtual_base::~virtual_base()
---
unsafe_derived<nonvirtual_base> :
  nonvirtual_base::~nonvirtual_base()
---
safe_derived<virtual_base> :
  safe_derived::~safe_derived()
  virtual_base::~virtual_base()
---
safe_derived<nonvirtual_base> :
---
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [LWG Issue 2015. Incorrect pre-conditions for some type traits](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2015)
    - C++11では要件が「型`T`は完全型であるか、`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。」だったが、これは間違いであるため、C++14で「型`T`が非共用体のクラスである場合、その型は完全型でなければならない。」に変更された。
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
