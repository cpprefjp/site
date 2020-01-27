# コンストラクタ
* regex[meta header]
* std[meta namespace]
* regex_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
regex_iterator();                                                                              // (1)

regex_iterator(BidirectionalIterator a, BidirectionalIterator b,
               const regex_type& re,
               regex_constants::match_flag_type m = regex_constants::match_default);           // (2)

regex_iterator(BidirectionalIterator a, BidirectionalIterator b,
               const regex_type&& re,
               regex_constants::match_flag_type m = regex_constants::match_default) = delete;  // (3) C++14 から

regex_iterator(const regex_iterator&);                                                         // (4)
```
* regex_constants::match_default[link /reference/regex/regex_constants/match_flag_type.md]

## 概要
`regex_iterator` オブジェクトを構築する


## 効果
- (1) デフォルトコンストラクタ。シーケンスの終端を示す特別なイテレータを構築する。
- (2) メンバ変数 `begin`、`end`、`pregex`、`flags` をそれぞれ `a`、`b`、`&re`、`m` で初期化して、[`regex_search`](../regex_search.md)`(begin, end, match, *pregex, flags)` を呼び出す。
    検索に成功しなかった場合（`false` が返された場合）、デフォルトコンストラクタで構築した場合と同様、直ちにシーケンスの終端を示す特別なイテレータとなる。
- (3) deleted コンストラクタであるため、使用するとコンパイルエラーとなる。
- (4) コピーコンストラクタ。


## 備考
- メンバ変数 `begin`、`end`、`pregex`、`flags`、`match` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。
- `regex_iterator` は指定された�規表現 `re` のコピーではなく、`re` へのポインタをオブジェクト内に保持するため、引数に渡した�規表現オブジェクトは当該イテレータを使用し終わるまで破棄されないようにする必要がある。  
    従って、(2) の形式のコンストラクタに渡す引数 `re` に一時オブジェクトを指定することはほぼ間違いなくプ�グラミング上のエラーを意味する。  
    (3) の形式のコンストラクタが C++14 で追加された理由は、この事態をコンパイル時に検出するためである。  
    しかし、この追加のため、C++11 では適格となりうる以下のようなコードは C++14 ではコンパイルエラーになる。
    ```cpp
    void f(std::sregex_iterator&&);

    f(std::sregex_iterator(s.begin(), s.end(), std::regex("\\d+")));
    ```


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  std::regex re("\\d+");
  std::string s("This compiler supports the C++11 standard.");
  std::sregex_iterator it(std::begin(s), std::end(s), re);
  if (it != std::sregex_iterator()) {
    std::cout << "match:" << it->str() << std::endl;
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* std::sregex_iterator[color ff0000]
* std::regex[link /reference/regex/basic_regex.md]

### 出力
```
match:11
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
- libstdc++ には 5.0.0 rev.218373 現在、(3) の形式のコンストラクタは�在しない。
- libc++ には、3.4 までは (3) の形式のコンストラクタは�在しない。
- libstdc++ では 5.0.0 rev.218373 現在、コピーコンストラクタで構築したオブジェクトの `match.`[`position`](../match_results/position.md)`(i)` が補�されずに誤っている。（補�については [`operator++`](op_increment.md) の「効果」を参照）
