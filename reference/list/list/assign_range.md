# assign_range
* list[meta header]
* std[meta namespace]
* list[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<T> R>
void assign_range(R&& rg); // C++23
```

## 概要
Rangeの各要素を再代入する。


## 事前条件
`*this` の要素の範囲と Range`rg` の要素の範囲が重複していないこと


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`list`コンテナへの`EmplaceConstructible`であること。


## 効果
Range`rg`の各要素を、再代入する。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> lst = {1, 2, 3};
  const int a[3] = {4, 5, 6};

  // Rangeを再代入
  lst.assign_range(a);

  for (int i : lst) {
    std::cout << i << " ";
  }
  std::cout << std::endl;
}
```
* assign_range[color ff0000]

### 出力
```
4 5 6 
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`assign`](assign.md)                     | コンテナに値を代入する   |
