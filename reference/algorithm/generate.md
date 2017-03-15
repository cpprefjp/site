# generate
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class Generator>
  void generate(ForwardIterator first, ForwardIterator last, Generator gen);
}
```

## 概要
出力の範囲へ関数の結果を書き込む。


## 要件
`gen` は引数を取らないこと。


## 効果
`[first,last)` のそれぞれのイテレータについて関数オブジェクト `gen` を呼び出し、その戻り値を代入する。


## 計算量
正確に `last - first` 回の `gen` の呼び出しと代入が行われる。


## 例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v(10);

  // 2 の累乗の値を生成する
  int n = 1;
  std::generate(v.begin(), v.end(), [&n]() { auto t = n; n *= 2; return t; });

  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << ","; });
}
```
* std::generate[color ff0000]

### 出力
```
1,2,4,8,16,32,64,128,256,512,
```


## 実装例
```cpp
template <class ForwardIterator, class Generator>
void generate(ForwardIterator first, ForwardIterator last, Generator gen) {
  while (first != last)
    *first++ = gen();
}
```

