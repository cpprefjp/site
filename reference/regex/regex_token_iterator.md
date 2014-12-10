#regex_token_iterator (C++11)
```cpp
namespace std {
  template <class BidirectionalIterator,
            class charT = typename iterator_traits<BidirectionalIterator>::value_type,
            class traits = regex_traits<charT> >
  class regex_token_iterator;

  typedef regex_token_iterator<const char*> cregex_token_iterator;
  typedef regex_token_iterator<const wchar_t*> wcregex_token_iterator;
  typedef regex_token_iterator<string::const_iterator> sregex_token_iterator;
  typedef regex_token_iterator<wstring::const_iterator> wsregex_token_iterator;
}
```

##概要
`regex_token_iterator` は、ある文字列に対して、指定した正規表現で検索した結果をサブマッチ毎に順番に列挙する読み取り専用の前方向イテレータである。
[`regex_iterator`](regex_iterator.md) と違い、マッチ結果（[`match_results`](match_results.md)）ではなくサブマッチ（[`sub_match`](sub_match.md)）を返す。

返されるサブマッチはオブジェクトの構築時に複数指定することができる。
返されるサブマッチは、マッチ結果 [`match_results`](match_results.md) からサブマッチ [`sub_match`](sub_match.md) を取得する場合と同様、0（マッチ全体を表す）、および、正規表現内の各グループを表す正の整数で指定する。
加えて、-1 を指定することで、指定した正規表現にマッチしなかった文字列を返すことも可能である。

`regex_token_iterator` オブジェクトを構築した時、当該オブジェクトは [`regex_iterator`](regex_iterator.md)`<BidirectionalIterator, charT, traits>` 型のメンバ変数 `position` を構築する。
また、構築時に指定された返すべきサブマッチのリストをメンバ変数 `subs` に保持し、現在返すべきサブマッチを識別するカウンタ用のメンバ変数 `N` を `0` に設定する。  
そして、[`operator++`](regex_token_iterator/op_increment.md) が呼び出される毎に、当該イテレータは `N` をインクリメントし、`N` が `subs` のサイズ以上になると、`position` をインクリメントして `N` を再び `0` にリセットする。  
`position` が終端まで来た時（つまり、`position` がシーケンス終端イテレータとなった時）、`subs` に `-1` が含まれていて、かつ、`position` が直前にマッチした文字列の後ろに文字列が残っている場合（つまり、`position.`[`suffix`](match_results/suffix.md)`()` が空文字では無い場合）には、当該文字列を最後のサブマッチとして扱う。この状態になったイテレータを接尾辞イテレータと呼ぶ。  
`position` が終端まで来た時に、`subs` に `-1` が含まれていない、または、`position` が直前にマッチした文字列の後ろに文字列が残っていない場合、および、接尾辞イテレータがインクリメントされた場合、当該オブジェクトは、シーケンスの終端を示す特別な値となる。  
この、シーケンスの終端を示す特別な値は、`regex_token_iterator` オブジェクトをデフォルトコンストラクタにより構築した場合にも生成されるため、この値と比較することによってシーケンスの終端であるか否か（つまり、マッチしなかったか否か）が判別できる。

シーケンス終端のイテレータに対する [`operator*`](regex_token_iterator/op_deref.md) 演算子適用は未定義である。その他のイテレータに対する [`operator*`](regex_token_iterator/op_deref.md) 演算子適用の結果は `const `[`sub_match`](sub_match.md)`<BidirectionalIterator>&` である。  
同様に、シーケンス終端のイテレータに対する [`operator->`](regex_token_iterator/op_arrow.md) 演算子適用は未定義である。その他のイテレータに対する [`operator->`](regex_token_iterator/op_arrow.md) 演算子適用の結果は `const `[`sub_match`](sub_match.md)`<BidirectionalIterator>*` である。


なお、本サイトの `regex_token_iterator` の各説明（上記も含む）では、規格にならって以下のプライベートなメンバ変数が存在する前提で記載している。

- コンストラクタで指定した引数から構築された `regex_iterator` の `position`（[`regex_iterator`](regex_iterator.md)`<BidirectionalIterator, charT, traits>` 型）
- 現在のサブマッチへのポインタ `result`（`const `[`sub_match`](submatch.md)`<BidirectionalIterator>*` 型）
- 接尾辞イテレータとなった際に保持するサブマッチ `suffix`（[`sub_match`](sub_match.md)`<BidirectionalIterator>` 型）
- 現在のサブマッチを識別する整数値 `N`（`size_t` 型）
- 返すべきサブマッチのリスト `subs`（[`vector`](/reference/vector.md)`<int>` 型）

しかし、規格上これらのメンバ変数は説明のためだけに導入されているため、実際の各実装でこれらのメンバ変数が存在するとは限らない事に注意すること。

`regex_token_iterator` は `iterator_category` を `forward_iterator_tag` に定義しているため、基本的には前方向イテレータであると考えられるが、実際には前方向イテレータの要件のうち以下の要件を満たしていない。

- 2 つの間接参照可能な `regex_token_iterator` オブジェクト `a` と `b` がある時、`a == b` の場合でも、`++a == ++b` とは限らない。
- 2 つの間接参照可能な `regex_token_iterator` オブジェクト `a` と `b` がある時、`a == b` の場合でも、`*a` と `*b` が同じオブジェクトとは限らない。


##メンバ関数
###構築・破棄

| 名前                                                            | 説明           | 対応バージョン |
|-----------------------------------------------------------------|----------------|----------------|
| [`(constructor)`](regex_token_iterator/regex_token_iterator.md) | コンストラクタ | C++11          |
| [`operator=`](regex_token_iterator/op_assign.md)                | 代入演算子     | C++11          |

###比較

| 名前                                                | 説明       | 対応バージョン |
|-----------------------------------------------------|------------|----------------|
|[`operator==`](regex_token_iterator/op_equal.md)     | 等値比較   | C++11          |
|[`operator!=`](regex_token_iterator/op_not_equal.md) | 非等値比較 | C++11          |

###間接

| 名前                                            | 説明           | 対応バージョン |
|-------------------------------------------------|----------------|----------------|
|[`operator*`](regex_token_iterator/op_deref.md)  | 間接参照       | C++11          |
|[`operator->`](regex_token_iterator/op_arrow.md) | メンバアクセス | C++11          |

###インクリメント

| 名前                                                | 説明           | 対応バージョン |
|-----------------------------------------------------|----------------|----------------|
|[`operator++`](regex_token_iterator/op_increment.md) | インクリメント | C++11          |

##メンバ型

| 名前                | 説明                                                                                                    | 対応バージョン |
|---------------------|---------------------------------------------------------------------------------------------------------|----------------|
| `regex_type`        | マッチに使用している正規表現型。[`basic_regex`](basic_regex.md)`<charT, traits>` の typedef             | C++11          |
| `value_type`        | サブマッチの型（間接参照で返される型）。[`sub_match`](sub_match.md)`<BidirectionalIterator>` の typedef | C++11          |
| `difference_type`   | 2 つのイテレータの差を表すための型。`ptrdiff_t` の typedef                                              | C++11          |
| `pointer`           | `const value_type` へのポインタ                                                                         | C++11          |
| `reference`         | `const value_type` への参照                                                                             | C++11          |
| `iterator_category` | このイテレータのカテゴリを表すタグ。前方向イテレータ（`forward_iterator_tag`）                          | C++11          |

##説明用プライベートメンバ変数

| 名前       | 説明                                                                                                                  | 対応バージョン |
|------------|-----------------------------------------------------------------------------------------------------------------------|----------------|
| `position` | 現在のマッチを指す `regex_iterator`。[`regex_iterator`](regex_iterator.md)`<BidirectionalIterator, charT, traits>` 型 | C++11          |
| `result`   | 現在のサブマッチへのポインタ。`const `[`sub_match`](submatch.md)`<BidirectionalIterator>*` 型                         | C++11          |
| `suffix`   | 接尾辞イテレータとなった際に保持するサブマッチ。[`sub_match`](sub_match.md)`<BidirectionalIterator>` 型               | C++11          |
| `N`        | 現在のサブマッチを識別する整数値。`size_t` 型                                                                         | C++11          |
| `subs`     | 返すべきサブマッチを表す整数のリスト。[`vector`](/reference/vector.md)`<int>` 型                                      | C++11          |

##非メンバ型

| 名前                     | 説明                                                       | 対応バージョン |
|--------------------------|------------------------------------------------------------|----------------|
| `cregex_token_iterator`  | `regex_token_iterator<const char*>` の typedef             | C++11          |
| `wcregex_token_iterator` | `regex_token_iterator<const wchar_t*>` の typedef          | C++11          |
| `sregex_token_iterator`  | `regex_token_iterator<string::const_iterator>` の typedef  | C++11          |
| `wsregex_token_iterator` | `regex_token_iterator<wstring::const_iterator>` の typedef | C++11          |

##例
```cpp
#include <iostream>
#include <iterator>
#include <regex>
#include <string>
#include <initializer_list>

template<typename T>
void f(T submatch)
{
  static const std::string s("enum E { enumerator1 = value1, enumerator2 = value2, enumerator3 = value3, };");
  static const std::regex re(R"((\w+)\s*=\s*(\w+))");

  for (auto it = std::sregex_token_iterator(std::begin(s), std::end(s), re, submatch), end = std::sregex_token_iterator();
       it != end; ++it) {
    auto&& m = *it;
    std::cout << "match range = (" << m.first - std::begin(s) << ", " << m.second - std::begin(s) << "), "
        "str = '" << m.str() << '\'' << std::endl;
  }
  std::cout << std::endl;
}

int main()
{
  // 列挙子のみ抽出
  f(1);

  // 値のみ抽出
  f(2);

  // マッチしない部分のみ抽出
  f(-1);

  // 列挙子と値の両方を抽出
  f(std::initializer_list<int>{ 1, 2 });
}
```
* sregex_token_iterator[color ff0000]

###出力
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

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

ただし、Clang と GCC の 4.9.1 までのバージョンには、長さ 0 の文字列にマッチした時の挙動に問題があるため、注意が必要。
（特に、Clang は長さ 0 の文字列にマッチするとそこから先に進まなくなってしまう）
