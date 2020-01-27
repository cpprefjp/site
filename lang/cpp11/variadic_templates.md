# 可変引数テンプレート
* cpp11[meta cpp]

## 概要
「可変引数テンプレート (variadic templates)」は、任意の型とそのオブジェクトを任意の数だけ受け取る機能である。これによって、「最大でN個のパラメータを受け取る関数テンプレートやクラステンプレート」を実装する際に、N個のオーバー�ードをユーザーが用意する必要なく、ひとつの実装だけで済むようになる。

可変引数テンプレートとしてテンプレートパラメータを受け取る場合、テンプレートパラメータを宣言する`class`または`typename`とテンプレートパラメータの間に、省略記号 `...` を入力する：

```cpp
// 0個以上のテンプレートパラメータを受け取る
template <class... Args>
struct X;

// 0個以上の任意の型のパラメータを受け取る
template <class... Args>
void f(Args... args);
```

可変引数テンプレートで宣言したパラメータ(ここでは`Args`と`args`)は「パラメータパック (parameter pack)」と呼ばれ、複数の型またはオブジェクトがまとめられた状態となっている。

パラメータパックになっているパラメータは、「展開 (expansion)」して使用する必要がある。これは他の関数やクラステンプレートにパラメータパックを転送するような状況で必要となる。パラメータパックの展開には、パラメータパックの後ろに省略記号 `...` を入力する：

```cpp
template <class... Args>
struct X {
  // パラメータパックを ... で展開して、
  // std::tupleクラステンプレートの引数として渡す
  std::tuple<Args...> values;
};

void g(int, char, const std::string&) {}

template <class... Args>
void f(Args... args)
{
  // パラメータパックを ... で展開して、
  // 関数g()の引数として渡す
  g(args...);
}

f(3, 'a', "hello");
```
* std::tuple[link /reference/tuple/tuple.md]

パラメータパックを最初の要素から順番に処理していきたい場合には、「任意の型のパラメータをひとつと、任意の個数の任意の型のパラメータを受け取る」というような形式のパラメータリストとし、再帰によって処理をする：

```cpp example
#include <iostream>
#include <utility>

// パラメータパックが空になったら終了
void print() {}

// ひとつ以上のパラメータを受け取るようにし、
// 可変引数を先�とそれ以外に分割する
template <class Head, class... Tail>
void print(Head&& head, Tail&&... tail)
{
  std::cout << head << std::endl;

  // パラメータパックtailをさらにheadとtailに分割する
  print(std::forward<Tail>(tail)...);
}

int main()
{
  print(1, 'a', "hello");
}
```
* std::forward[link /reference/utility/forward.md]

出力：

```
1
a
hello
```


## 仕様
- `template <class... Args>`や`void f(Args... args)`での、`Args`および`args`は、複数のパラメータをまとめた状態となっている。このまとまった状態のパラメータを「パラメータパック (parameter pack)」という
    - テンプレートパラメータのパラメータパックを「テンプレートパラメータパック (template parameter pack)」、関数のパラメータとしてのパラメータパックを「関数パラメータパック (function parameter pack)」という
- パラメータパックは複数のパラメータがまとめられた状態となっているため、そのままでは個々のパラメータを取り出せない。それらを取り出すには、パラメータパックを「展開 (expansion)」する必要がある。パラメータパックの展開には、パラメータパック名に続いて「`...`」を記述する。例：

    ```cpp
    template <class... Args>
    void f(Args... args)
    {
      g(args...); // パラメータパックargsを...で展開して、
                  // 関数g()にそれらのパラメータを転送する
    }
    ```

- パラメータパックの宣言、および展開に使用する「`...`」は、「省略記号 (ellipsis, エリプシス)」という
- パラメータパックには、ゼ�個以上のパラメータが含まれる

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

    ```cpp
    template <class... Args>
    void f(Args... args) {}

    int main()
    {
      f(1, 3.14f, "hello"); // OK
      f();                  // OK
    }
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

- 関数パラメータパックは、型推論の補助として、パラメータパックの全ての型に対して共通の修飾を付加できる：

    ```cpp
    // パラメータパックArgsに含まれる全ての型のパラメータを、
    // const左辺値参照として受け取る
    template <class... Args>
    void f(const Args&... args) {}
    ```

- `sizeof...(identifier)`演算�にパラメータパックを指定することで、パラメータパックに含まれるパラメータの要素数を取得できる：

    ```cpp example
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
    * constexpr[link constexpr.md]
    * static_assert[link static_assert.md]


### パラメータパックの宣言ができる場所
パラメータパックの宣言は、以下の場所でできる：

- 関数のパラメータ

    ```cpp
    template <class... Args>
    void f(Args... args); // ここ

    f(1, 'a', "hello");
    ```

    ```cpp example
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


### パラメータパックの展開ができる場所
パラメータパックの展開は、以下の場所でできる：

- 関数の引数

    ```cpp
    f(args...);
    ```

- テンプレートの引数

    ```cpp
    std::tuple<Args...> t;
    ```
    * std::tuple[link /reference/tuple/tuple.md]

- 初期化�

    ```cpp
    int ar[] = { args... };

    struct Person {
      int id;
      std::string name;
      int age;
    };
    Person person = { args... };
    ```

- 継承時の基底クラスリストの指定

    ```cpp
    template <class... Bases>
    class Derived : Bases...;
    ```

- コンストラクタのメンバ初期化�

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

### パラメータパックの拡張
- パラメータパックは、`f(args...)`のように省略記号で展開するほかに、`f(g(args)...)`のようにパラメータパックの各要素に共通の処理を適用する式を書くこともできる。これをパラメータパックの「拡張 (extend)」という
    - この例の場合、`args`パラメータパックの各要素に関数`g()`を適用してパラメータパックの要素に対して値と型の変換を行った結果のパラメータパックを生成し、その結果となるパラメータパックを関数`f()`に渡している

    ```cpp example
    #include <iostream>
    #include <string>
    #include <sstream>

    template <class T>
    std::string to_std_string(const T& x)
    {
      std::stringstream ss;
      ss << x;

      std::string result;
      ss >> result;
      return result;
    }

    void print(std::string a, std::string b, std::string c)
    {
      std::cout << a << std::endl;
      std::cout << b << std::endl;
      std::cout << c << std::endl;
    }

    template <class... Args>
    void f(Args&&... args)
    {
      // パラメータパックの各要素を文�列に変換してから
      // print()関数に渡す
      print(to_std_string(args)...);
    }

    int main()
    {
      f(1, 'a', "hello");
    }
    ```
    * std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]

- 複数のパラメータパックに対して拡張を行う場合、それらのパラメータパックは同じ要素数でなければならない。そうでない場合、プ�グラムは不適格となる

    ```cpp example
    #include <utility>
    #include <tuple>
    #include <type_traits>

    // 2つの型リストを綴じ合わせる
    template <class... Args1>
    struct zip {
      template <class... Args2>
      struct with {
        using type = std::tuple<std::pair<Args1, Args2>...>;
      };
    };

    int main()
    {
      static_assert(std::is_same<
        zip<int, long, long long>::with<float, double, long double>::type,
        std::tuple<
          std::pair<int, float>,
          std::pair<long, double>,
          std::pair<long long, long double>
        >
      >::value, ""); // OK
    }
    ```
    * std::tuple[link /reference/tuple/tuple.md]
    * static_assert[link static_assert.md]


## この機能が必要になった背景・経緯
可変引数テンプレートがなかったころ、任意の数のパラメータを受け取ってほかの処理に転送するといった処理をするために、パラメータの数だけオーバー�ードを用意する必要があり、それによってコピー＆ペーストのコードができあがっていた。とくに関数テンプレートの場合、`const`左辺値参照と非`const`左辺値参照の全ての組み合わせをオーバー�ードとして定義する必要があったため、このコードは非常に膨大になり、コンパイル時間が増えるひとつの原因ともなっていた。

```cpp
template <class T1, class T2, class T3>
void f(T1& t1, T2& t2, T3& t3);

template <class T1, class T2, class T3>
void f(const T1& t1, T2& t2, T3& t3);

template <class T1, class T2, class T3>
void f(const T1& t1, const T2& t2, T3& t3);

template <class T1, class T2, class T3>
void f(const T1& t1, const T2& t2, const T3& t3);

…
```

この問題を解決するために、任意の数だけ任意の型のパラメータを受け取る機能が必要とされ、可変引数テンプレートが導入された。


## 関連項目
- [C++11 可変引数マク�](variadic_macros.md)
- [C++17 畳み込み式](/lang/cpp17/folding_expressions.md)


## 参照
- [N1483 Typesafe Variable-length Function and Template Argument Lists](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1483.pdf)
- [N1603 Variadic Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1603.pdf)
- [N1704 Variadic Templates: Exploring the Design Space](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1704.pdf)
- [N2080 Variadic Templates (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2080.pdf)
- [N2152 Proposed Wording for Variadic Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2152.pdf)
- [N2191 Proposed Wording for Variadic Templates (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2191.pdf)
- [N2242 Proposed Wording for Variadic Templates (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2242.pdf)
- [N2488 Extending Variadic Template Template Parameters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2488.pdf)
- [N2555 Extending Variadic Template Template Parameters (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2555.pdf)

