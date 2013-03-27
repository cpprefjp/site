#insert_iterator

| |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<br/><br/><br/>```cpp
<br/><br/>namespace std {<br/><br/>  template <class Container><br/><br/>  class insert_iterator<br/><br/>    : public iterator<output_iterator_tag, void, void, void, void>;<br/><br/><br/><br/>}<br/><br/><br/><br/><br/><br/> |
```
* iterator[link /reference/iterator/iterator.md]
* output_iterator_tag[link /reference/iterator/iterator_tag.md]

##概要

<p>`insert_iterator`は出力イテレータであり、代入の際にコンテナの`insert`メンバ関数を呼び出すイテレータアダプタである。
</p>


###メンバ関数


| | |
|------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [`(constructor)`](./insert_iterator/insert_iterator.md) | コンストラクタ |
| `~insert_iterator() = default` | デストラクタ |
| [`operator=`](./insert_iterator/op_assign.md) | 代入演算子 |
| [`operator*`](./insert_iterator/op_deref.md) | 間接参照演算子 |
| [`operator++`](./insert_iterator/op_increment.md) | イテレータをインクリメントする |


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
|` iterator_category` |` [output_iterator_tag](/reference/iterator/iterator_tag.md)` |
|` reference` |` void` |


###非メンバ関数


| | |
|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| [`inserter`](./insert_iterator/inserter.md) | `insert_iterator`のヘルパ関数 |





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


