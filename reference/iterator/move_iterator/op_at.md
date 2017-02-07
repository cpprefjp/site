#operator[]
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unspecified operator[](difference_type n) const;
```
* unspecified[italic]

##概要
任意の位置にランダムアクセスする。


##戻り値
`return std::`[`move`](/reference/utility/move.md)`(`[`base`](base.md)`()[n]);`


##例
```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  auto it = std::make_move_iterator(v.begin());
  std::unique_ptr<int> p = it[2];

  std::cout << *p << std::endl;
}
```
* it[2][color ff0000]
* v.emplace_back[link /reference/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

###出力
```
2
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


