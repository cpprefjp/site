# operator++
* regex[meta header]
* std[meta namespace]
* regex_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
regex_iterator& operator++();   // (1) 前置形式

regex_iterator operator++(int); // (2) 後置形式
```

## 概要
イテレータを次のマッチに進める


## 要件
シーケンスの終端を示すイテレータではない事。（シーケンス終端イテレータに対して呼び出した場合は未定義動作となる）


## 効果
- (1) の形式（前置形式）は、以下のように振る舞う。
    - `BidirectionalIterator` 型のローカル変数 `start` を構築し、値 `match[0].second` で初期化する。
    - イテレータが長さゼロのマッチの場合（`match[0].matched == true` かつ `match[0].first == match[0].second` の場合）で、かつ、`start == end` の場合、`*this` をシーケンス終端イテレータにして `*this` を返す。
    - そうではなくて、イテレータが長さゼロのマッチの場合、[`regex_search`](../regex_search.md)`(start, end, match, *pregex, flags | regex_constants::match_not_null | regex_constants::match_continuous)` を呼び出す。  
        もしマッチしたら（`true` が返されたら）、`*this` を返す。マッチしなかったら、`start` をインクリメントし、イテレータが長さゼロのマッチで無いかのように、以下の処理を続ける。
    - イテレータが長さゼロのマッチでない場合、`flags` を `flags | regex_constants ::match_prev_avail` に更新し、[`regex_search`](../regex_search.md)`(start, end, match, *pregex, flags)` を呼び出す。  
        もしマッチしなかったら、`*this` をシーケンス終端イテレータにする。その後、`*this` を返す。
    - 上記のうち、[`regex_search`](../regex_search.md) が `true` を返した全てのケースでは、以下の補正が行われる。
        - `match.prefix().first` を直前の `match[0].second` に設定する。
        - 半開区間 `[0, match.size())` の全てのインデックス `i` について、`match[i].matched` が `true` であれば、`match.position(i)` が `distance(begin, match[i].first)` を返すように設定する。
- (2) の形式（後置形式）は、以下のように振る舞う。

    ```cpp
    regex_iterator tmp = *this;
    ++(*this);
    return tmp;
    ```


## 戻り値
- (1) `*this`
- (2) インクリメントを行う前の `*this` のコピー


## 備考
- メンバ変数 `begin`、`end`、`pregex`、`flags`、`match` はあくまでも説明用のプライベートメンバ変数であるため、注意すること。
- 「効果」にあるように、`match` には検索後に補正が行われるため、`regex_iterator` を間接参照した結果は、[`regex_search`](../regex_search.md) を順に呼び出した結果とは異なる。  
    また、これらの補正が実装でどのように行われるかについては、規格では規定されていない。
- 「効果」では [`regex_search`](../regex_search.md) が呼ばれるものとして記載されているが、実際に [`regex_search`](../regex_search.md) が呼ばれるかどうかについては、規格では規定されていない。  
    したがって、[`regex_search`](../regex_search.md) にユーザ定義の特殊化バージョンを提供しても、呼ばれないかもしれない。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  std::regex re("a*|b*|c*");
  std::string s("aaabbbccc");

  for (std::sregex_iterator it(std::begin(s), std::end(s), re), end; it != end; ++it) {
    std::cout << "position = " << it->position() << ", length = " << it->length() << ", str = '" << it->str() << "', prefix = '" << it->prefix() << '\'' << std::endl;
  }
}
```
* ++it[color ff0000]
* std::regex[link /reference/regex/basic_regex.md]
* position()[link /reference/regex/match_results/position.md]
* length()[link /reference/regex/match_results/length.md]
* str()[link /reference/regex/match_results/str.md]
* prefix()[link /reference/regex/match_results/prefix.md]

### 出力
```
position = 0, length = 3, str = 'aaa', prefix = ''
position = 3, length = 0, str = '', prefix = ''
position = 3, length = 3, str = 'bbb', prefix = ''
position = 6, length = 0, str = '', prefix = ''
position = 6, length = 3, str = 'ccc', prefix = ''
position = 9, length = 0, str = '', prefix = ''
```

注意：Clang & libc++ では正常に実行されない（終了しなくなってしまう）。また、GCC & libstdc++ の 4.9.1 までのバージョンでは、結果が正しくない。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
Clang & libc++ と GCC & libstdc++ の 4.9.1 までのバージョンには、長さ 0 の文字列にマッチした時の挙動に問題があるため、注意が必要。
（特に、Clang は長さ 0 の文字列にマッチするとそこから先に進まなくなってしまう。例を参照）


## 関連項目
| 名前                                 | 説明           | 対応バージョン |
|--------------------------------------|----------------|----------------|
| [`(constructor)`](op_constructor.md) | コンストラクタ | C++11          |
| [`operator*`](op_deref.md)           | 間接参照       | C++11          |
| [`operator->`](op_arrow.md)          | メンバアクセス | C++11          |
| [`operator==`](op_equal.md)          | 等値比較       | C++11          |
