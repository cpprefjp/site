# search
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator1, class ForwardIterator2>
  ForwardIterator1
    search(ForwardIterator1 first1,
           ForwardIterator1 last1,
           ForwardIterator2 first2,
           ForwardIterator2 last2);   // (1) C++03

  template<class ForwardIterator1, class ForwardIterator2>
  constexpr ForwardIterator1
    search(ForwardIterator1 first1,
           ForwardIterator1 last1,
           ForwardIterator2 first2,
           ForwardIterator2 last2);   // (1) C++20

  template<class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  ForwardIterator1
    search(ForwardIterator1 first1,
           ForwardIterator1 last1,
           ForwardIterator2 first2,
           ForwardIterator2 last2,
           BinaryPredicate pred);     // (2) C++03

  template<class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  constexpr ForwardIterator1
    search(ForwardIterator1 first1,
           ForwardIterator1 last1,
           ForwardIterator2 first2,
           ForwardIterator2 last2,
           BinaryPredicate pred);     // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  ForwardIterator1
    search(ExecutionPolicy&& exec,
           ForwardIterator1 first1,
           ForwardIterator1 last1,
           ForwardIterator2 first2,
           ForwardIterator2 last2);   // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class BinaryPredicate>
  ForwardIterator1
    search(ExecutionPolicy&& exec,
           ForwardIterator1 first1,
           ForwardIterator1 last1,
           ForwardIterator2 first2,
           ForwardIterator2 last2,
           BinaryPredicate pred);     // (4) C++17

  template <class ForwardIterator, class Searcher>
  ForwardIterator
    search(ForwardIterator first,
           ForwardIterator last,
           const Searcher& searcher); // (5) C++17

  template <class ForwardIterator, class Searcher>
  constexpr ForwardIterator
    search(ForwardIterator first,
           ForwardIterator last,
           const Searcher& searcher); // (5) C++20
}
```


## 概要
あるシーケンスの�から、特定のサブシーケンスを探す

- (1) : 範囲`[first1, last1)`内からサブシーケンス`[first2, last2)`を検索する。各要素の�値比較として`operator==`を使用する
- (2) : 範囲`[first1, last1)`内からサブシーケンス`[first2, last2)`を検索する。各要素の�値比較として二項述語関数オブジェクト`pred`を使用する
- (3) : (1)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (4) : (2)の並列アルゴリズム版。第1パラメータとして実行ポリシーをとる
- (5) : 対象となるサブシーケンスを包含する`sercher`関数オブジェクトを使用して、範囲`[first, last)`から対象のサブシーケンスを検索する。
    - この関数は、[`<functional>`](/reference/functional.md)ヘッダで定義される[`std::boyer_moore_searcher`](/reference/functional/boyer_moore_searcher.md)関数オブジェクトのような検索器と合わせて使用する


## 戻り値
- (1), (3) :
    - `[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、0 以上 `last2 - first2` 未満の整数 `n` について、それぞれ `*(i + n) == *(first2 + n)` であるようなサブシーケンスを探し、見つかった最初のサブシーケンスの先�のイテレータを返す。
    - そのようなイテレータが見つからない場合は `last1` を返し、`[first2,last2)` が空である場合には `first1` を返す。
- (2), (4) :
    - `[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、0 以上 `last2 - first2` 未満の整数 `n` について、それぞれ `*(i + n) == *(first2 + n)` であるようなサブシーケンスを探し、見つかった最初のサブシーケンスの先�のイテレータを返す。
    - そのようなイテレータが見つからない場合は `last1` を返し、`[first2,last2)` が空である場合には `first1` を返す。
- (5) : 以下と�価
    ```cpp
    return searcher(first, last).first;
    ```


## 計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される


## 備考
- (1)〜(4) : `search()` と [`find_end()`](find_end.md) は共にサブシーケンスを検索する関数だが、以下の点が異なる。
    - `search()` は見つかった最初のサブシーケンスを返すが [`find_end()`](find_end.md) は見つかった最後のサブシーケンスを返す
    - `[first2,last2)` が空であるときに `search()` は `first1` を返すが、[`find_end()`](find_end.md) は `last1` を返す
- (5) : `Searcher`は[`std::copy_constructible`](/reference/concepts/copy_constructible.md)要件を満たす必要はない


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>

int main() {
  std::vector<int> v = { 1,2,1,2,3 };
  std::list<int> ls = { 1,2 };

  // 1,2 と連続している最初のシーケンスを探す
  std::vector<int>::iterator it = std::search(v.begin(), v.end(), ls.begin(), ls.end());
  // v[0] の位置を指すイテレータが見つかる。
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;
  }
}
```
* std::search[color ff0000]
* ls.begin()[link /reference/list/list/begin.md]
* ls.end()[link /reference/list/list/end.md]

#### 出力
```
found: index==0
```


### 検索器を指定する使い方
```cpp example
#include <iostream>
#include <string>
#include <functional>
#include <iterator>
#include <algorithm>

int main()
{
  //                      xxxx
  std::string text = "babcabaabaac";
  std::string pattern = "abaa";

  // ボイヤー・ムーア法で、文�列 (text) 内のサブ文�列 (pattern) を検索する。
  // patternを登録
  std::boyer_moore_searcher searcher {
    pattern.cbegin(),
    pattern.cend()
  };

  // textと検索器を指定して検索を実行
  std::string::const_iterator result = std::search(text.cbegin(), text.cend(), searcher);

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

#### 出力
```
4
abaa
```

## 実装例
```cpp
template<class ForwardIterator1, class ForwardIterator2>
ForwardIterator1 search(ForwardIterator1 first1, ForwardIterator1 last1,
                        ForwardIterator2 first2, ForwardIterator2 last2) {
  for ( ; first1 != last1; ++first1) {
    ForwardIterator1 p1 = first1;
    ForwardIterator2 p2 = first2;
    while (true) {
      if (p2 == last2) return first1;
      if (p1 == last1) return last1;
      if (!bool(*p1 == *p2)) break;
      ++p1, ++p2;
    }
  }
  return first1;
}

template<class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
ForwardIterator1 search(ForwardIterator1 first1, ForwardIterator1 last1,
                        ForwardIterator2 first2, ForwardIterator2 last2, BinaryPredicate pred) {
  for ( ; first1 != last1; ++first1) {
    ForwardIterator1 p1 = first1;
    ForwardIterator2 p2 = first2;
    while (true) {
      if (p2 == last2) return first1;
      if (p1 == last1) return last1;
      if (!bool(pred(*p1, *p2))) break;
      ++p1, ++p2;
    }
  }
  return first1;
}
```


## 参照
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
- [N3905 Extending `std::search` to use Additional Searching Algorithms (Version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3905.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0253R1 Fixing a design mistake in the searchers interface in Library Fundamentals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0253r1.pdf)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
