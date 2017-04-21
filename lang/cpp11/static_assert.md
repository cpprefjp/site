# コンパイル時アサート
* cpp11[meta cpp]

## 概要
`static_assert`宣言は、指定した定数式が真であることを表明するための機能である。

これは、コンパイル時に満たされるべき要件を検証するために使用できる。

```cpp
template <class T, std::size_t N>
struct X {
  static_assert(N > 0, "number of array elements must greater than 0");
  T array[N];
};
```

指定した定数式が偽である場合はコンパイルエラーとなり、`static_assert`の第2引数で指定した文字列リテラルが診断メッセージとして出力される。


## 仕様
`static_assert`宣言は、以下の形式を持つ：

```cpp
static_assert(定数式, 文字列リテラル);
```

- 定数式は、`bool`に変換可能な整数定数式であること
- この宣言は、名前空間スコープ、ブロックスコープ、メンバ宣言といった場所で記述できる
- 定数式が真であると評価された場合は何も効果がない。定数式が偽であると評価された場合は、指定された文字列リテラルを含む診断メッセージがコンパイラによって問題報告される。ただし、基本ソース文字集合に含まれない文字集合は、診断メッセージに表示することはコンパイラに要求されない
- `static_assert`宣言では、新たな型やオブジェクトは宣言しない。また、実行時にサイズや時間コストは発生しない


## 例
```cpp
#include <type_traits>

template <class T>
struct X {
  static_assert(std::is_integral<T>::value, "template parameter T must be integral type");

  // …
};

int main()
{
  X<int>(); // OK
//X<double>(); // コンパイルエラー : template parameter T must be integral type
}
```
* <type_traits>[link /reference/type_traits.md]
* std::is_integral[link /reference/type_traits/is_integral.md]


### 出力
```
```

## この機能が必要になった背景・経緯
標準C++にはこれまで、ソフトウェアの正しさを表明するための機能として、

- 実行時の[`assert`](/reference/cassert/assert.md)マクロ
- プリプロセス時の`#error`ディレクティブ

この2つがあった。テンプレートライブラリを作るにあたって、これらはテンプレート引数のアサーションには使用できなかった。

この問題を解決する必要性は、[Boost Static Assertion Library](http://www.boost.org/libs/static_assert)と、それを利用する他のBoostライブラリの存在によって示されている。Boostには含まれていないLokiライブラリにも`STATIC_CHECK`というマクロの形で同様の機能がある。CzarneckiとEiseneckerによる著書『[Generative Programming](https://www.amazon.co.jp/dp/0201309777) (邦訳 : [ジェネレーティブプログラミング](https://www.amazon.co.jp/dp/479811331X))』では、コンパイル時アサートをシミュレートするためにテンプレートメタプログラミング手法を使用し、コンフィグレーションを生成する中間段階でのチェックを行っている。

Boost Static Assertion Libraryが開発されたときに、コンパイル時アサートの設計要件が認識された：

- アサーションに関する全ての処理は、コンパイル時に実行する必要がある。実行時に空間的、時間的なコストをかけることは許可しない
- 初心者に教えることが容易な構文を持つ必要がある
- アサーションの失敗には、意味がわかり(meaningful)、十分な情報がある(informative)診断メッセージが必要である
- それは名前空間、クラス、ブロックスコープで使用できること
- この機能の誤用によって静かに故障したりはせず、誤用もまたコンパイル時に診断される

今回導入された機能は、これら全ての要件を満たす。

コンパイル時アサートのために`BOOST_STATIC_ASSERT`や`STATIC_CHECK`のようなマクロを使用することは、名前空間を汚染する問題があるが、コア言語にその機能を追加することでその問題は解消される。


## 関連項目
- [C++17 `static_assert`](lang/cpp17/extending_static_assert.md)


## 参照
- [N1381 Proposal to Add Static Assertions to the Core Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1381.htm)
- [N1604 Proposal to Add Static Assertions to the Core Language (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1604.html)
- [N1617 Proposal to Add Static Assertions to the Core Language (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1617.html)
- [N1720 Proposal to Add Static Assertions to the Core Language (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1720.html)

