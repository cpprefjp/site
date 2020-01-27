# operator()
* functional[meta header]
* std[meta namespace]
* default_searcher[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
template <class ForwardIterator2>
std::pair<ForwardIterator2, ForwardIterator2>
  operator()(ForwardIterator2 first, ForwardIterator2 last) const; // (1) C++17

template <class ForwardIterator2>
constexpr std::pair<ForwardIterator2, ForwardIterator2>
  operator()(ForwardIterator2 first, ForwardIterator2 last) const; // (1) C++20
```

## 概要
検索を実行する。

この関数は、全体のシーケンス範囲`[first, last)`に含まれる部分シーケンス範囲`[pat_first, pat_last)`を検索する。検索対象 (pattern) となる部分シーケンスは、このクラスのコンストラクタで登録し、メンバ変数として保持されている。

この関数の戻り値としては、見つかった部分シーケンスの、全体シーケンス上のイテレータ範囲が返る。


## 効果
シーケンス内の部分シーケンスと�値になる範囲を検索する。


## 戻り値
- 部分シーケンス`[pat_first, pat_last)`が空である場合、[`make_pair`](/reference/utility/make_pair.md)`(first, first)`を返す
- イテレータ`i`と`j`として以下を定義し、
    - `i` : [`search`](/reference/algorithm/search.md)`search(first, last, pat_first, pat_last, pred)`
    - `j` : `i == last`であれば`j == last`、そうでなければ`j ==` [`next`](/reference/iterator/next.md)`(i,` [`distance`](/reference/iterator/distance.md)`(pat_first, pat_last))`
    - [`make_pair`](/reference/utility/make_pair.md)`(i, j)`を返す


## 例
```cpp example
#include <iostream>
#include <string>
#include <functional>
#include <iterator>
#include <algorithm>

int main()
{
  // text内のpatternを検索する
  //                      xxxx
  std::string text = "babcabaabaac";
  std::string pattern = "abaa";

  // patternを登録
  std::default_searcher searcher {
    pattern.cbegin(),
    pattern.cend()
  };

  // textを指定して検索を実行
  using iterator = std::string::const_iterator;
  iterator result = std::search(text.cbegin(), text.cend(), searcher);

  // 見つかった
  if (result != text.cend()) {
    // 見つかった位置を取得
    std::ptrdiff_t n = std::distance(text.cbegin(), result);

    // 見つかった文�列 (pattern) を取得
    std::string s {result, result + pattern.size()};

    std::cout << n << std::endl;
    std::cout << s << std::endl;
  }
  // 見つからなかった
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* pattern.cbegin()[link /reference/string/basic_string/cbegin.md]
* pattern.cend()[link /reference/string/basic_string/cend.md]
* text.cbegin()[link /reference/string/basic_string/cbegin.md]
* text.cend()[link /reference/string/basic_string/cend.md]
* std::ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

### 出力
```
4
abaa
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0253R1 Fixing a design mistake in the searchers interface in Library Fundamentals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0253r1.pdf)
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
