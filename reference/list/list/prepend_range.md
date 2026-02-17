# prepend_range
* list[meta header]
* std[meta namespace]
* list[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
template <container-compatible-range<T> R>
void prepend_range(R&& rg);           // (1) C++23
template <container-compatible-range<T> R>
constexpr void prepend_range(R&& rg); // (1) C++26
```

## 概要
先頭にRangeの要素を追加する。


## テンプレートパラメータ制約
型`T`が`*ranges::begin(rg)`から`list`コンテナへの`EmplaceConstructible`であること。


## 効果
Range`rg`の各要素を、先頭に追加する。


## 戻り値
なし


## 計算量
`N =` [`ranges::distance`](../../iterator/ranges_distance.md)`(rg)`とすると、`N`に比例。Tのコンストラクタは`N`回呼ばれる。


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> lst = {1, 2, 3};
  const int a[3] = {4, 5, 6};

  // Rangeを先頭に追加
  lst.prepend_range(a);

  for (int i : lst) {
    std::cout << i << " ";
  }
  std::cout << std::endl;
}
```
* prepend_range[color ff0000]

### 出力
```
4 5 6 1 2 3 
```


## 関連項目

| 名前                                      | 説明                  |
|-------------------------------------------|----------------------|
| [`push_front`](push_front.md)             | 先頭に要素を追加する         |
| [`emplace_front`](emplace_front.md)       | 先頭に要素を直接構築で追加する |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
