# operator()
* functional[meta header]
* std[meta namespace]
* boyer_moore_searcher[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class RandomAccessIterator2>
std::pair<RandomAccessIterator2, RandomAccessIterator2>
  operator()(RandomAccessIterator2 first, RandomAccessIterator2 last) const;
```

## 概要
検索を実行する。

この関数は、全体のシーケンス範囲`[first, last)`に含まれる部分シーケンス範囲`[pat_first, pat_last)`を検索する。検索対象 (pattern) となる部分シーケンスは、このクラスのコンストラクタで登録し、メンバ変数として保持されている。

この関数の戻り値としては、見つかった部分シーケンスの、全体シーケンス上のイテレータ範囲が返る。


## 効果
シーケンス内の部分シーケンスと等値になる範囲を検索する。


## 戻り値
- 部分シーケンス`[pat_first, pat_last)`が空である場合、[`make_pair`](/reference/utility/make_pair.md)`(first, first)`を返す
- イテレータ`i`と`j`として以下を定義し、
    - `i` : イテレータ範囲`[first, last)`のうち、部分範囲`[pat_first, pat_last)`が現れる最初の位置を指すイテレータ。各要素の等値比較は、`pred(*(i + n), *(pat_first + n)) != false`で判定する
    - `j` : [`next`](/reference/iterator/next.md)`(i,` [`distance`](/reference/iterator/distance.md)`(pat_first, pat_last))`
    - 合致する部分シーケンスが見つかった場合、[`make_pair`](/reference/utility/make_pair.md)`(i, j)`を返す
- 合致する部分シーケンスが見つからなかった場合、[`make_pair`](/reference/utility/make_pair.md)`(last, last)`を返す


## 計算量
最大で`(last - first) * (pat_last - pat_first)`回だけ述語を適用する


## 例
```cpp example
#include <iostream>
#include <string>
#include <functional>
#include <iterator>

int main()
{
  // text内のpatternを検索する
  //                      xxxx
  std::string text = "babcabaabaac";
  std::string pattern = "abaa";

  // patternを登録
  std::boyer_moore_searcher searcher {
    pattern.cbegin(),
    pattern.cend()
  };

  // textを指定して検索を実行
  using iterator = std::string::const_iterator;
  std::pair<iterator, iterator> result = searcher(text.cbegin(), text.cend());

  // 見つかった
  if (result.first != result.second) {
    // 見つかった位置を取得
    std::ptrdiff_t n = std::distance(text.cbegin(), result.first);

    // 見つかった文字列 (pattern) を取得
    std::string s {result.first, result.second};

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
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0253R1 Fixing a design mistake in the searchers interface in Library Fundamentals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0253r1.pdf)
