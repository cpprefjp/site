#operator- (非メンバ関数) (C++11)
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]

```cpp
namespace std {
  template <class Iterator1, class Iterator2>
  auto operator-(const move_iterator<Iterator1>& x,
                 const move_iterator<Iterator2>& y)
    -> decltype(x.base() - y.base());
}
```
* base[link /reference/iterator/move_iterator/base.md]

##概要
2つのイテレータの差を求める。


##戻り値
`return x.`[`base`](./base.md)`() - y.`[`base`](./base.md)`();`


##例
```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  auto it1 = std::make_move_iterator(v.begin());
  auto it2 = std::make_move_iterator(v.end());

  std::ptrdiff_t result = it2 - it1;
  std::cout << result << std::endl;
}
```
* it2 - it1[color ff0000]

###出力
```
5
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


