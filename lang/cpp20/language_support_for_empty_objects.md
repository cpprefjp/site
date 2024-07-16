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

* `[[no_unique_address]]`属性を指定しても、実際に空オブジェクトでない場合は効果がない。

## 例
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
  std::cout << sizeof(A) << '\n';
  std::cout << sizeof(B) << '\n';
  A a;
  B b;
  std::cout << std::boolalpha;
  std::cout << is_same_addr(&a.e, &a.c) << '\n';
  std::cout << is_same_addr(&b.e, &b.c) << '\n';
  return 0;
}
```

### 出力例
```
2
1
false
true
```

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
  std::cout << sizeof(Empty) << '\n'; // 1
  std::cout << sizeof(A) << '\n';     // 2
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
  std::cout << sizeof(B) << '\n'; // 1
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