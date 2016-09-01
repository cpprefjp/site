#ジェネリックラムダ
* cpp14[meta cpp]

##概要
ジェネリックラムダ(generic lambdas)は、[C++11のラムダ式](/lang/cpp11/lambda_expressions.md)を拡張して、パラメータにテンプレートを使用できるようにした機能である。

```cpp
auto plus = [](auto a, auto b) { return a + b; };
```

このラムダ式は、以下のような関数呼び出し演算子を持つ関数オブジェクトを生成する。

```cpp
template <class T1, class T2>
auto operator()(T1 a, T2 b) const
{
  return a + b;
}
```


##仕様
- ラムダ式のパラメータには、具体的な型に加えて、`auto`を指定できる。
- `auto`は、型をテンプレートパラメータにするためのプレースホルダーである。
- ラムダ式のパラメータに`auto`を指定し、`[](auto x) {}`のように記述した場合、以下のような関数オブジェクトが生成される：

    ```cpp
struct F {
  template <class T>
  auto operator()(T x) const {}
};
```

- 複数のパラメータ型をそれぞれ`auto`に指定した場合、各パラメータは異なるテンプレートパラメータが割り当てられる：

    ```cpp
auto f = [](auto a, auto b) {}
```

    ```cpp
struct F {
  template <class T1, class T2>
  auto operator()(T1 a, T2 b) const {}
};
```

- ラムダ式に指定する`auto`は、テンプレートと同様に、`const`、`volatile`、参照、ポインタといった修飾ができる：

    ```cpp
auto plus = [](const auto& a, const auto& b) { return a + b; };
```

- 関数テンプレートと違い、ラムダ式の`auto`パラメータは、パラメータのテンプレートパラメータを推論する目的には使用できない：

    ```cpp
auto f = [](std::vector<auto> a) {}; // コンパイルエラー
```

- キャプチャを含まないジェネリックラムダは、関数ポインタへの変換演算子を持つ。変換先の関数ポインタは、パラメータ型を推論した結果のラムダ式のシグニチャと、完全に一致しなければならない：

    ```cpp
int(*fp1)(int) = [](auto x) { return x; }; // OK
char(*fp2)(int) = [](auto x) { return x; }; // コンパイルエラー
```


##備考
ジェネリックラムダはパラメータの型がテンプレートであるために、パラメータをテンプレートのまま[`std::function`](/reference/functional/function.md)クラスのオブジェクトに代入はできない。


##例
```cpp
#include <iostream>
#include <string>

using namespace std::string_literals;

int main()
{
  // ラムダ式のパラメータ型をautoにすることで、
  // 任意の型をパラメータとして受け取れる
  auto plus = [](auto a, auto b) { return a + b; };

  int result1 = plus(3, 2);
  std::string result2 = plus("Hello"s, "World"s);

  std::cout << result1 << std::endl;
  std::cout << result2 << std::endl;
}
```
* "Hello"s[link /reference/string/basic_string/op_s.md]
* "World"s[link /reference/string/basic_string/op_s.md]

###出力
```
5
HelloWorld
```

##検討されたほかの選択肢
ジェネリックラムダの構文として、最初は`auto`を書かずにパラメータの変数名と型修飾のみを書くように考えられていた。

```cpp
[](const& x, & y) { return x + y; }
```

これが現在`auto`を書くようになったのは、可読性のためである。


##関連項目
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [C++14 ラムダ式の初期化キャプチャ](initialize_capture.md)
- [C++14 通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md)


##参照
- [N3418 Proposal for Generic (Polymorphic) Lambda Expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3418.pdf)
- [N3559 Proposal for Generic (Polymorphic) Lambda Expressions (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3559.pdf)
- [N3649 Generic (Polymorphic) Lambda Expressions (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3649.html)
