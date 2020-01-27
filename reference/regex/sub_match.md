# sub_match
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class BidirectionalIterator>
  class sub_match : public pair<BidirectionalIterator, BidirectionalIterator>;

  using csub_match  = sub_match<const char*>;
  using wcsub_match = sub_match<const wchar_t*>;
  using ssub_match  = sub_match<string::const_iterator>;
  using wssub_match = sub_match<wstring::const_iterator>;
}
```
* pair[link ../utility/pair.md]

## 概要
クラステンプレート `sub_match` は、文�列が�規表現にマッチした際に、その�規表現がマッチした範囲、あるいは、その�規表現内のあるグループがマッチした範囲を表す。
`sub_match` は [`pair`](../utility/pair.md) から public 継承している。


## メンバ関数

| 名前                                                  | 説明                                                        | 対応バージョン |
|-------------------------------------------------------|-------------------------------------------------------------|----------------|
| [`(constructor)`](sub_match/op_constructor.md)             | コンストラクタ                                              | C++11          |
| [`length`](sub_match/length.md)                       | マッチした文�列の長さを返す。                              | C++11          |
| [`operator string_type`](sub_match/op_string_type.md) | マッチした文�列を `string_type` 型に�ャストする。         | C++11          |
| [`str`](sub_match/str.md)                             | マッチした文�列を `string_type` 型で返す。�ャストと同じ。 | C++11          |
| [`compare`](sub_match/compare.md)                     | マッチした文�列を比較する。                                | C++11          |

注：上記の他、オブジェクトの内容を交換するメンバ関数 [`swap`](../utility/pair/swap.md) もあるが、[`pair`](../utility/pair.md) から継承したものであるため、メンバ変数 `matched` の内容は交換しないため注意が必要。

## メンバ変数

| 名前      | 型                      | 説明                                                                             | 対応バージョン |
|-----------|-------------------------|----------------------------------------------------------------------------------|----------------|
| `first`   | `BidirectionalIterator` | このサブマッチがマッチに参加している場合、当該サブマッチの開始位置を表す         | C++11          |
| `second`  | `BidirectionalIterator` | このサブマッチがマッチに参加している場合、当該サブマッチの終了位置の一つ先を表す | C++11          |
| `matched` | `bool`                  | このサブマッチがマッチに参加しているか否かを表す                                 | C++11          |

## メンバ型

| 名前              | 説明                                                                                                                                     | 対応バージョン |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| `value_type`      | 検索対象の文�の型。[`iterator_traits`](../iterator/iterator_traits.md)`<BidirectionalIterator>::value_type` の別名                      | C++11          |
| `difference_type` | 2 つのイテレータの差を表すための型。[`iterator_traits`](../iterator/iterator_traits.md)`<BidirectionalIterator>::difference_type` の別名 | C++11          |
| `iterator`        | 検索対象の文�を指すイテレータの型。`BidirectionalIterator` の別名                                                                       | C++11          |
| `string_type`     | 検索対象の文�の型に対応する文�列型。[`basic_string`](../string/basic_string.md)`<value_type>` の別名                                   | C++11          |
| `first_type`      | メンバ変数 `first` の型。[`pair`](../utility/pair.md) から継承。`BidirectionalIterator` の別名                                           | C++11          |
| `second_type`     | メンバ変数 `second` の型。[`pair`](../utility/pair.md) から継承。`BidirectionalIterator` の別名                                          | C++11          |

## 非メンバ関数

| 名前                                          | 説明                               | 対応バージョン |
|-----------------------------------------------|------------------------------------|----------------|
| [`operator==`](sub_match/op_equal.md)         | �値比較を行う                     | C++11          |
| [`operator!=`](sub_match/op_not_equal.md)     | 非�値比較を行う                   | C++11          |
| [`operator<`](sub_match/op_less.md)           | 左辺が右辺よりも小さいか判定を行う | C++11          |
| [`operator<=`](sub_match/op_less_equal.md)    | 左辺が右辺以下か判定を行う         | C++11          |
| [`operator>`](sub_match/op_greater.md)        | 左辺が右辺より大きいか判定を行う   | C++11          |
| [`operator>=`](sub_match/op_greater_equal.md) | 左辺が右辺以上か判定を行う         | C++11          |
| [`operator<<`](sub_match/op_ostream.md)       | ストリームへの出力を行う           | C++11          |

注：非メンバ関数版の [`swap`](../utility/swap.md) は `sub_match` 用にオーバー�ードされていないため、[`pair`](../utility/pair.md) から継承したメンバ関数 [`swap`](../utility/pair/swap.md) は呼び出さずに汎用版の動作となる（一時変数を利用したムーブでオブジェクトの内容を交換する）。従って、こちらはメンバ変数 `matched` も交換される。

## 非メンバ型

| 名前          | 説明                                                                         | 対応バージョン |
|---------------|------------------------------------------------------------------------------|----------------|
| `csub_match`  | `sub_match<const char*>` の別名                                              | C++11          |
| `wcsub_match` | `sub_match<const wchar_t*>` の別名                                           | C++11          |
| `ssub_match`  | `sub_match<`[`string`](../string/basic_string.md)`::const_iterator>` の別名  | C++11          |
| `wssub_match` | `sub_match<`[`wstring`](../string/basic_string.md)`::const_iterator>` の別名 | C++11          |

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <regex>
#include <string>

int main()
{
  const std::string s(" abc 123 def ");
  const std::regex re(R"((?:(\d+)|(\w+))\s+)");
  std::smatch m;
  if (std::regex_search(s, m, re)) {
    for (int i = 0, n = m.size(); i < n; i++) {
      std::ssub_match sub = m[i];
      if (sub.matched) {
        std::cout << i << ":range = [" << (sub.first - std::begin(s)) << ", " << (sub.second - std::begin(s)) << "), "
                     "length() = " << sub.length() << ", str() = '" << sub.str() << '\'' << std::endl;
      } else {
        std::cout << i << ":not participate" << std::endl;
      }
    }
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* std::ssub_match[color ff0000]
* std::regex[link basic_regex.md]
* sub.length()[link sub_match/length.md]
* sub.str()[link sub_match/str.md]
* std::regex_search[link regex_search.md]
* std::smatch[link match_results.md]

### 出力
```
0:range = [1, 5), length() = 4, str() = 'abc '
1:not participate
2:range = [1, 4), length() = 3, str() = 'abc'
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
