
| |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|


```cpp
namespace std {

  template <class Container>

  class insert_iterator

    : public iterator<output_iterator_tag, void, void, void, void>;
```
* iterator[link https://sites.google.com/site/cpprefjp/reference/iterator/iterator]
* output_iterator_tag[link https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag]

`}`



 |


##概要

<p>`insert_iterator`は出力イテレータであり、代入の際にコンテナの`insert`メンバ関数を呼び出すイテレータアダプタである。
</p>


###メンバ関数


| | |
|------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`(constructor)`](https://sites.google.com/site/cpprefjp/reference/iterator/insert_iterator/insert_iterator) | コンストラクタ |
| `~insert_iterator() = default` | デストラクタ |
| [`operator=`](https://sites.google.com/site/cpprefjp/reference/iterator/insert_iterator/op_assign) | 代入演算子 |
| [`operator*`](https://sites.google.com/site/cpprefjp/reference/iterator/insert_iterator/op_deref) | 間接参照演算子 |
| [`operator++`](https://sites.google.com/site/cpprefjp/reference/iterator/insert_iterator/op_increment) | イテレータをインクリメントする |


###protectedメンバ変数


| | |
|------------------------|----------------------------------|
| 変数名 | 型 |
| `container` | `Container*` |
| `iter` | `Container::iterator` |


###メンバ型



| | |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
|` container_type` |` Container` |
|` difference_type` |` void` |
|` pointer` |` void` |
|` value_type` |` void` |
|` iterator_category` |` [output_iterator_tag](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag)` |
|` reference` |` void` |


###非メンバ関数


| | |
|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| [`inserter`](https://sites.google.com/site/cpprefjp/reference/iterator/insert_iterator/inserter) | `insert_iterator`のヘルパ関数 |





##例


```cpp
#include <iostream>

#include <set>

#include <iterator>

#include <algorithm> // copy
```

int main()

{

  std::set<int> src = {1, 2, 3};

  std::set<int> dest;


  // srcの要素をdestに挿入しながらコピー

  std::copy(src.begin(), src.end(), std::<color=ff0000>inserter</color>(dest, dest.end()));


  for (int x : dest) {

    std::cout << x << std::endl;

  }

}





###出力

```cpp
1
2
3
```

###参照


