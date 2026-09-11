# 空オブジェクトに対する最適化を支援する属性[[no_unique_address]] [P0840R2]

* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

C++20では、空オブジェクトに対する最適化を支援する属性`[[no_unique_address]]`が追加された。

`[[no_unique_address]]`属性は、非静的メンバ変数に対して指定し、そのメンバがユニークなアドレスを持つ必要がないことを表明する。処理系は、そのようなメンバを別のメンバや基底クラスのサブオブジェクトと同じアドレスに配置することで、クラスを小さくすることができる。

```cpp
class Empty{};
class A
{
  [[no_unique_address]] Empty e; // eはユニークなアドレスを持つ必要がない (cと同じアドレスになる可能性がある)
  char c;
};
```

## 仕様

基底クラスのサブオブジェクトおよび`[[no_unique_address]]`属性の付いたメンバは、潜在的に重なるサブオブジェクト(potentially-overlapping subobject)であり、同じアドレスに配置される可能性がある。

* `[[no_unique_address]]`属性の付いた同じ型または同じ型のサブオブジェクトを持つ非静的メンバ変数が複数ある場合、それらに共通するサブオブジェクトは互いに異なるアドレスに配置される。

* 潜在的に重なるサブオブジェクトは、ほかのサブオブジェクトの末尾のパディングに配置される可能性もある。そのため、空でない型のメンバに指定した場合でも、クラス全体のサイズが小さくなることがある。

* `[[no_unique_address]]`属性は最適化を許可するものであり、実際にサブオブジェクトが重なるかどうかは処理系のABIに依存する。


## 用途
`[[no_unique_address]]`属性には、おもに以下の用途がある。

- 状態を持たないクラスのオブジェクトをメンバとして保持する
    - アロケータ、削除子、比較関数、ハッシュ関数、関数オブジェクトなど、空になりやすい型を、継承を使わずにサイズ0で保持できる
    - テンプレート引数によって空になったりならなかったりする型でも、特殊化を用意することなく、どちらの場合でも最適なレイアウトが得られる
- 継承できない型のオブジェクトを保持する
    - `final`が指定されたクラスや`union`は基底クラスにできないため、EBOを適用できない。`[[no_unique_address]]`属性であれば適用できる
- 型の異なる複数の空のメンバをまとめる
    - 型が異なる空のメンバは、すべて同じアドレスに配置できる
- メンバ型の末尾のパディングを再利用する
    - [`std::optional`](/reference/optional/optional.md)のように値とフラグ (タグ) を併せて保持する型で、値の型が持つ末尾のパディングにフラグを収められる場合がある
- 標準ライブラリでも、[`std::ranges::in_out_result`](/reference/algorithm/ranges_in_out_result.md)などのRangeアルゴリズムの戻り値型や、[`std::ranges::elements_of`](/reference/ranges/elements_of.md)のメンバに指定されている


## 例
### 基本的な使い方
```cpp example
#include <iostream>

class Empty {};

struct A
{
  Empty e;
  char c;
};

struct B
{
  [[no_unique_address]] Empty e;
  char c;
};

bool is_same_addr(void* x, void* y){
    return x == y;
}

int main()
{
  std::cout << sizeof(A) << std::endl;
  std::cout << sizeof(B) << std::endl;
  A a;
  B b;
  std::cout << std::boolalpha;
  std::cout << is_same_addr(&a.e, &a.c) << std::endl;
  std::cout << is_same_addr(&b.e, &b.c) << std::endl;
  return 0;
}
```

#### 出力例
```
2
1
false
true
```

### 状態を持たないクラスのオブジェクトをメンバとして保持する
アロケータや削除子のような、状態を持たない (空になりやすい) 型を、継承を使わずにメンバとして保持できる。

```cpp example
#include <iostream>
#include <memory>

template <class T, class Deleter = std::default_delete<T>>
class my_unique_ptr {
  T* ptr_;
  [[no_unique_address]] Deleter deleter_;

public:
  explicit my_unique_ptr(T* ptr) : ptr_(ptr), deleter_() {}
  ~my_unique_ptr() { deleter_(ptr_); }
};

int main()
{
  std::cout << std::boolalpha;

  // 削除子が空であるため、ポインタひとつ分のサイズに収まる
  std::cout << (sizeof(my_unique_ptr<int>) == sizeof(int*)) << std::endl;
}
```
* std::default_delete[link /reference/memory/default_delete.md]

#### 出力例
```
true
```

テンプレート引数によって空になったりならなかったりする型でも、特殊化を用意することなく、どちらの場合でも最適なレイアウトが得られる。

```cpp example
#include <iostream>
#include <memory>

// 状態を持つ簡易的なアロケータ
template <class T>
class arena_allocator {
  std::byte* buffer_;

public:
  using value_type = T;

  explicit arena_allocator(std::byte* buffer) : buffer_(buffer) {}

  T* allocate(std::size_t) { return reinterpret_cast<T*>(buffer_); }
  void deallocate(T*, std::size_t) {}
};

template <class T, class Allocator = std::allocator<T>>
class my_vector {
  T* ptr_ = nullptr;
  [[no_unique_address]] Allocator alloc_;

public:
  explicit my_vector(const Allocator& alloc = Allocator()) : alloc_(alloc) {}
};

int main()
{
  // std::allocatorは状態を持たないため、ポインタひとつ分のサイズに収まる
  std::cout << sizeof(my_vector<int>) << std::endl;

  // 状態を持つアロケータの場合は、そのぶんのサイズが必要になる
  std::cout << sizeof(my_vector<int, arena_allocator<int>>) << std::endl;
}
```
* std::byte[link /reference/cstddef/byte.md]

#### 出力例
```
8
16
```

### 継承できない型のオブジェクトを保持する
`final`が指定されたクラスは基底クラスにできないため、EBOを適用できない。`[[no_unique_address]]`属性であれば適用できる。

```cpp example
#include <iostream>

class Empty final {}; // finalなので、継承によるEBOは適用できない

struct A {
  Empty e;
  char c;
};

struct B {
  [[no_unique_address]] Empty e;
  char c;
};

int main()
{
  std::cout << sizeof(A) << std::endl;
  std::cout << sizeof(B) << std::endl;
}
```

#### 出力例
```
2
1
```

### 末尾のパディングを再利用する
メンバの型が末尾にパディングを持つ場合、そのパディングに後続のメンバを配置できる。値とフラグを併せて保持する[`optional`](/reference/optional/optional.md)のような型で、フラグのぶんだけサイズが大きくなることを避けられる。

```cpp example
#include <iostream>

struct Data {
  int id;
  char kind;

  // ユーザー定義のデストラクタにより、トリビアルにコピー可能ではなくなる
  ~Data() {}
};

struct A {
  Data data;
  bool has_value;
};

struct B {
  [[no_unique_address]] Data data;
  bool has_value;
};

int main()
{
  std::cout << sizeof(Data) << std::endl;
  std::cout << sizeof(A) << std::endl;

  // has_valueがDataの末尾のパディングに配置され、Dataと同じサイズになる
  std::cout << sizeof(B) << std::endl;
}
```

#### 出力例
```
8
12
8
```


## 備考
- `[[no_unique_address]]`属性は最適化を許可するものであり、実際にサブオブジェクトが重なるかどうかは処理系のABIに依存する。
- Itanium C++ ABIを採用するGCCとClangでは、メンバ型の末尾のパディングの再利用は、その型がトリビアルにコピー可能でない場合に行われる。
- Visual C++は、既存のABIとの互換性を維持するために、標準の`[[no_unique_address]]`属性を無視する。同等の効果を得るには、独自の`[[msvc::no_unique_address]]`属性を使用する。
- `[[no_unique_address]]`属性を指定したメンバは潜在的に重なるサブオブジェクトであるため、トリビアルにコピー可能な型であっても、そのメンバのバイト列を[`memcpy()`](/reference/cstring/memcpy.md)関数などでコピーして復元することは、規格上保証されない。末尾のパディングにほかのメンバが配置されている場合、そのメンバを破壊してしまう。


## この機能が必要になった背景・経緯

ジェネリックなコードでは、空の型がよく使われる。

* 例えば、非静的メンバ変数を持たない関数オブジェクトなど

しかし、空の型であっても、ユニークなアドレスを割り当てるために大きさが0にはならない。

```cpp example
#include <iostream>

class Empty {};

class A
{
  Empty e1;
  char c;
};

int main()
{
  std::cout << sizeof(Empty) << std::endl; // 1
  std::cout << sizeof(A) << std::endl;     // 2
  return 0;
}
```

一方で、空の型と別の型が派生クラスの関係にある場合は、空の型の大きさを0とする最適化が許されている。これをEmpty Base Optimization(EBO)という。

```cpp example
#include <iostream>

class Empty {};

class B: Empty
{
  char c;
};

int main()
{
  std::cout << sizeof(B) << std::endl; // 1
  return 0;
}
```

しかし、EBOを働かせるために派生クラスを作ると、基底クラスのメンバ名が派生クラスのスコープに漏れたり、コードが難解になったりする問題があった。

`[[no_unique_address]]`を使うことで、基底クラスのサブオブジェクトだけでなくメンバ変数のサイズも0にできるので、EBOのために設計を変える必要がなくなる。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 属性構文](/lang/cpp11/attributes.md)
- [`is_empty`](/reference/type_traits/is_empty.md)

## 参照
- [P0840R2 Language support for empty objects](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0840r2.html)
- [Microsoft-specific attributes - Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/attributes?view=msvc-170)
    - Visual C++独自の`[[msvc::no_unique_address]]`属性について
