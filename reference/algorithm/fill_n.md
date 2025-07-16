# fill_n
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class OutputIterator,
            class Size,
            class T>
  void
    fill_n(OutputIterator first,
           Size n,
           const T& value);        // (1) C++03
  template <class OutputIterator,
            class Size,
            class T>
  OutputIterator
    fill_n(OutputIterator first,
           Size n,
           const T& value);        // (1) C++11
  template <class OutputIterator,
            class Size,
            class T>
  constexpr OutputIterator
    fill_n(OutputIterator first,
           Size n,
           const T& value);        // (1) C++20
  template <class OutputIterator,
            class Size,
            class T = typename iterator_traits<OutputIterator>::value_type>
  constexpr OutputIterator
    fill_n(OutputIterator first,
           Size n,
           const T& value);        // (1) C++26

  template <class ExecutionPolicy,
            class ForwardIterator,
            class Size,
            class T>
  ForwardIterator
    fill_n(ExecutionPolicy&& exec,
           ForwardIterator first,
           Size n,
           const T& value);        // (2) C++17
  template <class ExecutionPolicy,
            class ForwardIterator,
            class Size,
            class T = typename iterator_traits<ForwardIterator>::value_type>
  ForwardIterator
    fill_n(ExecutionPolicy&& exec,
           ForwardIterator first,
           Size n,
           const T& value);        // (2) C++26
}
```

## 概要
イテレータ範囲`[first, first + n)`のすべての要素に指定された値を書き込む。


## 適格要件
- `value` は `output iterator` へ書き込み可能でなければならない。
- `Size` は `integral type` に変換可能でなければならない。


## 効果
`n` が 1 以上の場合は `[first,first + n)` 内の全ての要素に `value` を代入し、そうでない場合は何もしない。


## 戻り値
- C++03 まで  
	無し
- C++11 から  
	`n` が 1 以上の場合は `first + n`、そうでない場合は `first` を返す。


## 計算量
`n` が 1 以上の場合は `n` 回、そうでない場合は 0 回の代入を行う。


## 備考
- (1), (2) :
    - C++26 : `value`パラメータとして波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::fill_n(v.begin(), n, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>

int main() {
  // 値3を10個出力する
  std::fill_n(std::ostream_iterator<int>(std::cout, ","), 10, 3);
}
```
* std::fill_n[color ff0000]

#### 出力
```
3,3,3,3,3,3,3,3,3,3,
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
};

int main() {
  std::vector<Point> v(5);

  // 先頭3個の要素を値{1, 2}で埋める
  std::fill_n(v.begin(), 3, {1, 2});

  for (const Point& p : v) {
    std::cout << p.x << "," << p.y << std::endl;
  }
}
```
* std::fill_n[color ff0000]

#### 出力
```
1,2
1,2
1,2
0,0
0,0
```


## 実装例
```cpp
template <class OutputIterator, class Size, class T>
#if __cplusplus >= 201103L
OutputIterator
#else
void
#endif
fill_n(OutputIterator first, Size n, const T& value) {
  while (n-- > 0)
    *first++ = value;
#if __cplusplus >= 201103L
  return first;
#endif
}
```


### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- C++11への対応（戻り値の変更）は2012から。


## 参照
- [LWG DR865. More algorithms that throw away information](http://cplusplus.github.io/LWG/lwg-defects.html#865)  
	戻り値が追加されるきっかけとなったレポート
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
