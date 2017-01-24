#変数テンプレート
* cpp14[meta cpp]

##概要
変数定義時のテンプレート指定を可能にする。

C++11までは、関数、クラス、型の別名をテンプレートで定義できた。C++14からは、変数もテンプレートで定義できるようになった。これにより、型もしくは整数値をパラメータにとり、そのパラメータの組み合わせごとに変数の値を保持できるようになった。

これはたとえば、円周率πの値を、数値型ごとの有効桁数で取得するために使用できる：

```cpp
template <class T>
constexpr T pi = static_cast<T>(3.14159265358979323846);

// 円の面積を求める
template <class T>
T area_of_circle_with_radius(T r)
{
  return pi<T> * r * r;
}
```

従来であれば、このような目的には、関数テンプレートが使用されていた。型`T`の円周率を返す関数`pi()`を定義すればよかった。しかし、多倍長整数のように、コピーのコストが高いものについては、関数テンプレートよりも、変数テンプレートを使用した方が効率がよくなる。

そのほかの用途としては、関数呼び出しの丸カッコを省略できるため、2文字ではあるがより短いコードを書けるようにできる、というものもある。たとえば、型`T`が整数型か判定する[`std::is_integral`](/reference/type_traits/is_integral.md)型特性は、以下のように、`::value`を付けるか、クラスのインスタンスを作成して`bool`への変換演算子を呼び出す必要がある：

```cpp
#include <type_traits>

int main()
{
  if (std::is_integral<int>::value) {}
  if (std::is_integral<int>()) {}
}
```
* <type_traits>[link /reference/type_traits.md]
* std::is_integral[link /reference/type_traits/is_integral.md]

変数テンプレートを使用することで、以下のように記述できる：

```cpp
template <class T>
constexpr bool is_integral_v = false;

template <>
constexpr bool is_integral_v<int> = true;

// 以下のようにラッパーとして定義してもよい
// #include <type_traits>
// template <class T>
// constexpr bool is_integral_v = std::is_integral<int>::value;

int main()
{
  if (is_integral_v<int>) {}
}
```
* std::is_integral[link /reference/type_traits/is_integral.md]


##仕様
C++14より前の規格でも使用できた関数テンプレートを変数にも適用可能に拡張した仕様である。

言語規格から変数テンプレートについて明記されている仕様を、以下に整理する。

これらは全て、関数、クラス、型の別名のテンプレートについての定義と同様である。

- `constexpr`を適用できる。（§7.1.5 The constexpr specifier）
- 変数の宣言でテンプレートを宣言できる。（§14 Templates）
- クラススコープにおける変数テンプレートは静的データメンバーテンプレートとなる。（§14 Templates）
- 翻訳単位ごとにインスタンス化される。（§14 Templates）
- 必要に応じて暗黙的にインスタンス化される。（§14.7.1 Implicit instantiation）
- 明示的なインスタンス化が可能。（§14.7.2 Explicit instantiation）
- デフォルトテンプレート引数は使用される文脈により暗黙的に使用される。（§14.7.1 Implicit instantiation）
- テンプレート変数のインスタンス化は名前空間へ行われる。（§14.7.1 Implicit instantiation, §14.7.2 Explicit instantiation）
- テンプレート変数の宣言は明示的なインスタンス化よりも前に行わなければならない。（§14.7.2 Explicit instantiation）


##例
```cpp
#include <iostream>
#include <iomanip>
#include <limits>

// ネイピア数: http://www.wolframalpha.com/input/?i=Napier%27s%20constant
template < typename T = float >
constexpr auto napier = static_cast<T>( 2.718'281'828'459'045'235'360'287'471'352'662'497'757'247'093'699'959'5L );

template <class FloatingPoint>
constexpr int precision = std::numeric_limits<FloatingPoint>::max_digits10;

auto main() -> int
{
  std::cout
    << std::setprecision(precision<float>)       << napier<>            << "\n"
    << std::setprecision(precision<double>)      << napier<double>      << "\n"
    << std::setprecision(precision<long double>) << napier<long double> << "\n"
    << "2.7182818284590452353602874713526624977572470936999595" << std::endl
    ;
}
```
* <iomanip>[link /reference/iomanip.md]
* <limits>[link /reference/limits.md]
* template < typename T = float >[color ff0000]
* std::numeric_limits[link /reference/limits/numeric_limits.md]
* max_digits10[link /reference/limits/numeric_limits/max_digits10.md]
* std::setprecision[link /reference/iomanip/setprecision.md]

###出力例
```
2.71828175
2.7182818284590451
2.71828182845904523543
2.7182818284590452353602874713526624977572470936999595
```


##この機能が必要になった背景・経緯
- 型をパラメーター化された定数値を簡単に扱いたい。（N3651）
- `constexpr`でそのような定数値を扱いたい。（N3651）
- C++11規格の範囲内でも対応は出来たが煩雑で扱い難い方法を取る必要があるため簡潔に扱えるようにしたい。（N3651）

##検討されたほかの選択肢
- `const`または`constexpr`と組み合わせて用いる提案があったが、ワーキンググループの多数意見によりC++14の対象では制限しない事にした。（N3651）
- テンプレートテンプレートについても提案があったが、ワーキンググループで複数の不要論がありC++14では含めない事にした。（N3651）

##関連項目
- [C++11 `constexpr`](/lang/cpp11/constexpr.md)

##参照
- [N3651 Variable Templates (Revision 1)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2013/n3651.pdf)
- [Trip Report: ISO C++ Spring 2013 Meeting](https://isocpp.org/blog/2013/04/trip-report-iso-c-spring-2013-meeting)
- [変数テンプレートをラムダ式でキャプチャするときの注意 - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/2014/01/21/162701)

