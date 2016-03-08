#可変引数テンプレート
* cpp11[meta cpp]

##概要


##仕様
- `template <class... Args>`や`void f(Args... args)`での、`Args`および`args`は、複数のパラメータをまとめた状態となっている。このまとまった状態のパラメータを「パラメータパック (parameter pack)」という
    - テンプレートパラメータのパラメータパックを「テンプレートパラメータパック (template parameter pack)」、関数のパラメータとしてのパラメータパックを「関数パラメータパック (function parameter pack)」という
- パラメータパックは複数のパラメータがまとめられた状態となっているため、そのままでは個々のパラメータを取り出せない。それらを取り出すには、パラメータパックを展開する必要がある。パラメータパックの展開には、パラメータパック名に続いて「`...`」を記述する。例：

    ```cpp
template <class... Args>
void f(Args... args)
{
  g(args...); // パラメータパックargsを...で展開して、
              // 関数g()にそれらのパラメータを転送する
}
```

- パラメータパックの宣言、および展開に使用する「`...`」は、「省略記号 (ellipsis, エリプシス)」という
- パラメータパックには、ゼロ個以上のパラメータが含まれる

    ```cpp
template <class... Args>
struct X {};

int main()
{
  X<int, char, double> a; // OK
  X<> b;                  // OK
}
```

    ```cpp
template <class... Args>
struct X {};

// パラメータパックが0要素だった場合の特殊化
template <>
struct X<> {};
```

- パラメータパックの宣言をする際、パラメータパックはパラメータリストの最後になければならない

    ```cpp
// OK
template <class Head, class... Tail>
struct X {};

// コンパイルエラー！パラメータパックは最後に置かなければならない
template <class... Init, class Last>
struct Y {};
```

- `sizeof...(identifier)`演算子にパラメータパックを指定することで、パラメータパックに含まれるパラメータの要素数を取得できる：

    ```cpp
#include <cstddef>

template <class... Args>
void f(Args... args)
{
  constexpr std::size_t template_parameter_pack_size = sizeof...(Args);
  constexpr std::size_t function_parameter_pack_size = sizeof...(args);
  
  static_assert(template_parameter_pack_size == 3, "");
  static_assert(function_parameter_pack_size == 3, "");
}

int main()
{
  f(1, 'a', "hello");
}
```
* std::size_t[link /reference/cstddef/size_t.md]
* constexpr[link constexpr.md]
* static_assert[link static_assert.md]


###パラメータパックの宣言ができる場所
パラメータパックの宣言は、以下の場所でできる：

- 関数のパラメータ

    ```cpp
template <class... Args>
void f(Args... args); // ここ

f(1, 'a', "hello");
```

    ```cpp
#include <tuple>

template <class... ResultTypes>
void f(ResultTypes(*...funcs)(int, char))
{
  // t is std::tuple<int, float>{1, 1.23f}
  auto t = std::make_tuple(funcs(3, 'a')...);
}

int a(int, char) { return 1; }
float b(int, char) { return 1.23f; }

int main()
{
  f(a, b);
}
```
* std::tuple[link /reference/tuple/tuple.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]

- テンプレートパラメータ

    ```cpp
template <class... Args>
struct X {};

X<int, char, double> x;
```

    ```cpp
template <int... Args>
struct Y {};

Y<3, 1, 4, 5, 2, 6> y;
```

- テンプレートテンプレートパラメータ

    ```cpp
template <template <class...> class Container>
struct ContainerHolder {
  Container<int> cont;
};

ContainerHolder<std::vector> v;
ContainerHolder<std::list> ls;
```
* std::vector[link /reference/vector.md]
* std::list[link /reference/list.md]


###パラメータパックの展開ができる場所
パラメータパックの展開は、以下の場所でできる：

- 関数の引数

    ```cpp
f(args...);
f(args)...;
```

- テンプレートの引数

    ```cpp
std::tuple<Args...> t;
```
* std::tuple[link /reference/tuple/tuple.md]

- 初期化子

    ```cpp
int ar[] = { args... };

struct Person {
  int id;
  std::string name;
  int age;
};
Person person = { args... };
```
* std::string[link /reference/string/basic_string.md]

- 継承時の基本クラスリストの指定

    ```cpp
template <class... Bases>
class Derived : Bases...;
```

- コンストラクタのメンバ初期化子

    ```cpp
template <class... Bases>
class Derived : Bases... {
    Derived(Bases... bases)
        : Bases(bases)... {}
};
```

- 動的例外仕様

    ```cpp
template <class... ExceptionList>
void f() throw(ExceptionList...);
```

(執筆中)


##参照
- [N1483 Typesafe Variable-length Function and Template Argument Lists](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1483.pdf)
- [N1603 Variadic Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1603.pdf)
- [N1704 Variadic Templates: Exploring the Design Space](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1704.pdf)
- [N2080 Variadic Templates (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2080.pdf)
- [N2152 Proposed Wording for Variadic Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2152.pdf)
- [N2191 Proposed Wording for Variadic Templates (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2191.pdf)
- [N2242 Proposed Wording for Variadic Templates (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2242.pdf)
- [N2488 Extending Variadic Template Template Parameters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2488.pdf)
- [N2555 Extending Variadic Template Template Parameters (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2555.pdf)

