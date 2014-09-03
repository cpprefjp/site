#generate_n
```cpp
namespace std {
  template <class OutputIterator, class Size, class Generator>
  OutputIterator generate_n(OutputIterator first, Size n, Generator gen);
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
* generate_n[color ff0000]

###出力
```
1,2,4,8,16,32,64,128,256,512,
```


##実装例
```cpp
template <class OutputIterator, class Size, class Generator>
OutputIterator generate_n(OutputIterator first, Size n, Generator gen) {
  while (n-- > 0)
    *first++ = gen();
}
```

