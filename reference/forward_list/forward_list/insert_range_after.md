# insert_range_after
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<T> R>
iterator insert_range_after(const_iterator pos, R&& rg); // C++23
```

## 概要
Rangeの各要素を任意の位置に挿入する。


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`forward_list`コンテナへの`EmplaceConstructible`であること。


## 効果
Range`rg`の各要素を、`pos`の直後に挿入する。


## 戻り値
挿入されたRange`rg`の最後の要素を指すイテレータ。`rg`が空の場合は`pos`。


## 例
```cpp example
#include <forward_list>
#include <iostream>

int main()
{
  std::forward_list<int> fl = {1, 2, 3};
  const int a[3] = {4, 5, 6};

  // Rangeを１番目の直後に挿入
  fl.insert_range_after(fl.begin(), a);

  for (int i : fl) {
    std::cout << i << " ";
  }
  std::cout << std::endl;
}
```
* insert_range_after[color ff0000]

### 出力
```
1 4 5 6 2 3
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`insert_after`](insert_after.md)         | 任意の位置への要素挿入   |
| [`emplace_after`](emplace_after.md)       | 任意の位置への直接構築による要素挿入 |
