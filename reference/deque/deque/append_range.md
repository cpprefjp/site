# append_range
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<T> R>
void append_range(R&& rg); // C++23
```

## 概要
Rangeの要素を末尾へ追加する。


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`deque`コンテナへの`EmplaceConstructible`であること。


## 効果
Range`rg`の各要素を、末尾に追加する。


## 戻り値
なし


## 計算量
`N =` [`ranges::distance`](../../iterator/ranges_distance.md)`(rg)`とすると、`N`に比例。Tのコンストラクタは`N`回呼ばれる。


## 例
```cpp example
#include <deque>
#include <iostream>

int main()
{
  std::deque<int> d = {1, 2, 3};
  const int a[3] = {4, 5, 6};

  // Rangeを末尾に追加
  d.append_range(a);

  for (int i : d) {
    std::cout << i << " ";
  }
  std::cout << std::endl;
}
```
* append_range[color ff0000]

### 出力
```
1 2 3 4 5 6 
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`push_back`](push_back.md)               | 末尾に要素を追加する         |
| [`emplace_back`](emplace_back.md)         | 末尾に要素を直接構築で追加する |
