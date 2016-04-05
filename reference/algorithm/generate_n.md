#generate_n
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class OutputIterator, class Size, class Generator>
  void generate_n(OutputIterator first, Size n, Generator gen);           // C++03 まで

  template <class OutputIterator, class Size, class Generator>
  OutputIterator generate_n(OutputIterator first, Size n, Generator gen); // C++11 から
}
```

##概要
出力の範囲へ関数の結果を `n` 個書き込む。


##要件
- `gen` は引数をとらないこと。
- `Size` は integral type に変換可能であること。


##効果
`n` が 1 以上の場合、`[first,last)` のそれぞれのイテレータについて関数オブジェクト `gen` を呼び出し、その戻り値を代入する。

そうでない場合、何もしない。


##戻り値
- C++03 まで  
	無し
- C++11 から  
	`n` が 1 以上の場合、`first + n` が返される。  
	そうでない場合、`first` が返される。


##計算量
`n` が 1 以上の場合、`n` 回の `gen` の呼び出しと代入が行われる。

そうでない場合、何もしない。


##例
```cpp
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
* <algorithm>[link /reference/algorithm.md]
* <iostream>[link /reference/iostream.md]
* <iterator>[link /reference/iterator.md]
* std::ostream_iterator[link /reference/iterator/ostream_iterator.md]
* std::cout[link /reference/iostream/cout.md]

###出力
```
1,2,4,8,16,32,64,128,256,512,
```


##実装例
```cpp
template <class OutputIterator, class Size, class Generator>
#if __cplusplus >= 201103L
OutputIterator
#else
void
#endif
generate_n(OutputIterator first, Size n, Generator gen) {
  while (n-- > 0)
    *first++ = gen();
#if __cplusplus >= 201103L
  return first;
#endif
}
```


###処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc):
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 8.0, 9.0, 10.0, 11.0, 12.0, 14.0
    - C++11への対応（戻り値の変更）は11.0から。


##参照
- [LWG DR865. More algorithms that throw away information](http://cplusplus.github.io/LWG/lwg-defects.html#865)  
	戻り値が追加されるきっかけとなったレポート
