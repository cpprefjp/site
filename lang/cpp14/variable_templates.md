#変数テンプレート
* cpp14[meta cpp]

##概要
変数定義時のテンプレート指定を可能にする


##仕様

C++14より前の規格でも使用できた関数テンプレートを変数にも適用可能に拡張した仕様です。
言語規格から変数テンプレートについて明言されている仕様を以下に整理します。
これらは全て従来の関数またはクラスのテンプレートについてと同様に定義されています。

- `constexpr`を適用できる。（§7.1.5 The constexpr specifier）
- 変数の宣言でテンプレートを宣言できる。（§14 Templates）
- クラススコープにおける変数テンプレートは静的データメンバーテンプレートとなる。（§14 Templates）
- 翻訳単位ごとにインスタンス化される。（§14 Templates）
- 必要に応じて暗黙的にインスタンス化される。（§14.7.1 Implicit instantiation）
- 明示的なインスタンス化が可能。（§14.7.2 Explicit instantiation）
- デフォルトテンプレート引数は使用される文脈により暗黙的に使用される。（§14.7.1 Implicit instantiation）
- テンプレート変数のインスタンス化は名前空間へ行われる。（§14.7.1 Implicit instantiation, §14.7.2 Explicit instantiation）
- テンプレート変数の宣言は明示的なインスタンス化よりも前に行わなければならない。（§14.7.2 Explicit instantiation）

```cpp
#include <iostream>

template < typename T > constexpr auto value = static_cast<T>( -1 );

auto main() -> int
{
  std::cout
    << std::to_string( value<  signed char> ) << "\n"
    << std::to_string( value<unsigned char> ) << std::endl
    ;
}
```
* template < typename T >[color ff0000]

##例
```cpp
#include <iostream>
#include <iomanip>

// ネイピア数: http://www.wolframalpha.com/input/?i=Napier%27s%20constant
template < class T = float >
constexpr auto napier = static_cast<T>( 2.718'281'828'459'045'235'360'287'471'352'662'497'757'247'093'699'959'5L );

auto main() -> int
{
  std::cout
    << std::setprecision( 60 )
    << napier<           > << "\n"
    << napier<     double> << "\n"
    << napier<long double> << "\n"
    << "2.7182818284590452353602874713526624977572470936999595" << std::endl
    ;
}
```
* template < typename T >[color ff0000]

###出力例
```
2.71828174591064453125
2.718281828459045090795598298427648842334747314453125
2.71828182845904523542816810799394033892895095050334930419922
2.7182818284590452353602874713526624977572470936999595
```

この例は執筆時点の [wandbox](http://melpon.org/wandbox) にて
 [GCC-5.1.0](http://melpon.org/wandbox/permlink/PfAA8z6iCGrjYp9j) または
 [Clang-3.7.0](http://melpon.org/wandbox/permlink/Yt5KZA2tbzmksscS) で翻訳、実行した場合に得られた出力です。
`long double`の分解能（≈有効桁数）は処理系に依存し、
例えば MSVC++ 2015 では `long` と `long double` は[同じ扱い](https://msdn.microsoft.com/ja-jp/library/cc953fe1.aspx)となります。
また、`float`, `double`, `long double` の具体的な実装が [IEEE754](https://ja.wikipedia.org/wiki/IEEE_754) 形式となっている事も C++ 言語規格レベルでは規定されておらず、
処理系によって上記とは異なる出力が得られる可能性があります。


##この機能が必要になった背景・経緯
- 型をパラメーター化された定数値を簡単に扱いたい。（N3651）
- `constexpr`でそのような定数値を扱いたい。（N3651）
- C++11規格の範囲内でも対応は出来たが煩雑で扱い難い方法を取る必要があるため簡潔に扱えるようにしたい。（N3651）

##検討されたほかの選択肢
- `const`または`constexpr`と組み合わせて用いる提案があったが、ワーキンググループの多数意見によりC++14の対象では制限しない事にした。（N3651）
- テンプレートテンプレートについても提案があったが、ワーキンググループで複数の不要論がありC++14では含めない事にした。

##関連項目
- `constexpr`

##参照
- [N3651 Variable Templates (Revision 1)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2013/n3651.pdf)
- [Trip Report: ISO C++ Spring 2013 Meeting](https://isocpp.org/blog/2013/04/trip-report-iso-c-spring-2013-meeting)

