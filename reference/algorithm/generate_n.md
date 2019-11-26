# generate_n
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class OutputIterator, class Size, class Generator>
  void
    generate_n(OutputIterator first,
               Size n,
               Generator gen);       // (1) C++03

  template <class OutputIterator, class Size, class Generator>
  OutputIterator
    generate_n(OutputIterator first,
               Size n,
               Generator gen);       // (1) C++11

  template <class OutputIterator, class Size, class Generator>
  constexpr OutputIterator
    generate_n(OutputIterator first,
               Size n,
               Generator gen);       // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Size, class Generator>
  ForwardIterator
    generate_n(ExecutionPolicy&& exec,
               ForwardIterator first,
               Size n,
               Generator gen);       // (2) C++17
}
```

## 概要
出力の範囲へ関数の結果を `n` 個書き込む。


## 要件
- `gen` は引数をとらないこと。
- `Size` は integral type に変換可能であること。


## 効果
`n` が 1 以上の場合、`[first,last)` のそれぞれのイテレータについて関数オブジェクト `gen` を呼び出し、その戻り値を代入する。

そうでない場合、何もしない。


## 戻り値
- C++03 まで  
	無し
- C++11 から  
	`n` が 1 以上の場合、`first + n` が返される。  
	そうでない場合、`first` が返される。


## 計算量
`n` が 1 以上の場合、`n` 回の `gen` の呼び出しと代入が行われる。

そうでない場合、何もしない。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>

int main() {
  // 2 の累乗の値を生成して出力する
  int n = 1;
  std::generate_n(std::ostream_iterator<int>(std::cout, ","),
    10, [&n]{ auto t = n; n *= 2; return t; });
}
```
* std::generate_n[color ff0000]

### 出力
```
1,2,4,8,16,32,64,128,256,512,
```


## 実装例
```cpp
template <class OutputIterator, class Size, class Generator>
# if __cplusplus >= 201103L
OutputIterator
# else
void
# endif
generate_n(OutputIterator first, Size n, Generator gen) {
  while (n-- > 0)
    *first++ = gen();
# if __cplusplus >= 201103L
  return first;
# endif
}
```


### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2005, 2008, 2010, 2012, 2013, 2015
    - C++11への対応（戻り値の変更）は2012から。


## 参照
- [LWG DR865. More algorithms that throw away information](http://cplusplus.github.io/LWG/lwg-defects.html#865)  
	戻り値が追加されるきっかけとなったレポート
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
