# コンストラクタ
* regex[meta header]
* std[meta namespace]
* regex_token_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
regex_token_iterator();                                                                             // (1)

regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     const regex_type& re, int submatch = 0,
                     regex_constants::match_flag_type m = regex_constants::match_default);          // (2)

regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     const regex_type& re, const vector<int>& submatches,
                     regex_constants::match_flag_type m = regex_constants::match_default);          // (3)

regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     const regex_type& re, initializer_list<int> submatches,
                     regex_constants::match_flag_type m = regex_constants::match_default);          // (4)

template <std::size_t N>
regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     const regex_type& re, const int (&submatches)[N],
                     regex_constants::match_flag_type m = regex_constants::match_default);          // (5)

regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     regex_type&& re, int submatch = 0,
                     regex_constants::match_flag_type m = regex_constants::match_default) = delete; // (6) C++14 から

regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     regex_type&& re, const vector<int>& submatches,
                     regex_constants::match_flag_type m = regex_constants::match_default) = delete; // (7) C++14 から

regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     regex_type&& re, initializer_list<int> submatches,
                     regex_constants::match_flag_type m = regex_constants::match_default) = delete; // (8) C++14 から

template <std::size_t N>
regex_token_iterator(BidirectionalIterator a, BidirectionalIterator b,
                     regex_type&& re, const int (&submatches)[N],
                     regex_constants::match_flag_type m = regex_constants::match_default) = delete; // (9) C++14 から

regex_token_iterator(const regex_token_iterator&);                                                  // (10)
```
* regex_constants::match_flag_type[link /reference/regex/regex_constants/match_flag_type.md]
* regex_constants::match_default[link /reference/regex/regex_constants/match_flag_type.md]

## 概要
`regex_token_iterator` オブジェクトを構築する


## 要件
引数 `submatch`、あるいは、引数 `submatches` の各要素は、`-1` 以上である事。


## 効果
- (1) デフォルトコンストラクタ。シーケンス終端イテレータ（シーケンスの終端を示す特別なイテレータ）を構築する。
- (2)～(5) メンバ変数 `subs` を、引数 `submatch` の 1 要素のみで（(2) の形式の場合）、あるいは、引数 `submatches` で（(3)～(5) の形式の場合）初期化する。
    また、メンバ変数 `N`、`position` をそれぞれ、`0`、[`regex_iterator`](../regex_iterator.md)`<BidirectionalIterator>(a, b, re, m)` で初期化する。
    もし、`position` がシーケンス終端イテレータでなければ、メンバ変数 `result` を現在のマッチ（備考参照）のアドレスに�定する。  
    そうでなくて、もし、メンバ変数 `subs` が `-1` を含んでいたら、`*this` を範囲 `[a, b)` を指す接尾辞イテレータとして�定する。  
    そうでなければ、`*this` をシーケンス終端イテレータとして�定する。
- (6)～(9) deleted コンストラクタであるため、使用するとコンパイルエラーとなる。（(2)～(5) の形式の `re` の型を `const regex_type&` から `regex_type&&` に変更したもの）
- (10) コピーコンストラクタ。


## 備考
- 「現在のマッチ」とは、もし `subs[N]` が -1 の場合には `(*position).`[`prefix`](../match_results/prefix.md)`()`、そうでなければ `(*position).[subs[N]]` の事を指す。
- メンバ変数 `subs`、`N`、`position`、`result` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。
- `regex_token_iterator` は、メンバ変数 `position` を通して指定された�規表現 `re` のコピーではなく、`re` へのポインタをオブジェクト内に保持するため、引数に渡した�規表現オブジェクトは当該イテレータを使用し終わるまで破棄されないようにする必要がある。  
    従って、(2)～(5) の形式のコンストラクタに渡す引数 `re` に一時オブジェクトを指定することはほぼ間違いなくプ�グラミング上のエラーを意味する。  
    (6)～(9) の形式のコンストラクタが C++14 で追加された理由は、この事態をコンパイル時に検出するためである。  
    しかし、この追加のため、C++11 では適格となりうる以下のようなコードは C++14 ではコンパイルエラーになる。
    ```cpp
    void f(std::sregex_token_iterator&&);

    f(std::sregex_token_iterator(s.begin(), s.end(), std::regex("\\d+")));
    ```


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>
#include <vector>
#include <initializer_list>

template<typename T>
void f(const T& submatch)
{
  static const std::string s("enum E { enumerator1 = value1, enumerator2 = value2, enumerator3 = value3, };");
  static const std::regex re(R"((\w+)\s*=\s*(\w+))");

  // 引数で指定されたサブマッチを列挙する。ループ終了条件には (1) の形式で構築されたシーケンス終端イテレータとの比較を行う。
  for (std::sregex_token_iterator it(std::begin(s), std::end(s), re, submatch), end; it != end; ++it) {
    std::cout << "match range = (" << it->first - std::begin(s) << ", " << it->second - std::begin(s) << "), "
                 "str = '" << it->str() << "'\n";
  }
  std::cout << std::endl;
}

int main()
{
  // (2) の形式で構築（列挙�のみ抽出）
  f(1);

  // (3) の形式で構築（値のみ抽出）
  f(std::vector<int>{ 2 });

  // (4) の形式で構築（マッチしない部分のみ抽出）
  auto il = { -1 };
  f(il);

  // (5) の形式で構築（列挙�と値の両方を抽出）
  int ia[] = { 1, 2 };
  f(ia);
}
```
* std::sregex_token_iterator[color ff0000]
* std::regex[link /reference/regex/basic_regex.md]
* str()[link /reference/regex/sub_match/str.md]

### 出力
```
match range = (9, 20), str = 'enumerator1'
match range = (31, 42), str = 'enumerator2'
match range = (53, 64), str = 'enumerator3'

match range = (23, 29), str = 'value1'
match range = (45, 51), str = 'value2'
match range = (67, 73), str = 'value3'

match range = (0, 9), str = 'enum E { '
match range = (29, 31), str = ', '
match range = (51, 53), str = ', '
match range = (73, 77), str = ', };'

match range = (9, 20), str = 'enumerator1'
match range = (23, 29), str = 'value1'
match range = (31, 42), str = 'enumerator2'
match range = (45, 51), str = 'value2'
match range = (53, 64), str = 'enumerator3'
match range = (67, 73), str = 'value3'

```


## バージョン
### 言語
- C++11（一部 C++14）

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


### 備考
- libstdc++ には 5.0.0 rev.218373 現在、(6)～(9) の形式のコンストラクタは�在しない。
- libc++ には、3.4 までは (6)～(9) の形式のコンストラクタは�在しない。また、3.0 には (4) の形式のコンストラクタも�在しない。
