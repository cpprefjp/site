#operator=
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class U> move_iterator& operator=(const move_iterator<U>& u);
move_iterator& operator=(const move_iterator&) = default;
move_iterator& operator=(move_iterator&&) = default;
```

##概要
- `move_iterator& operator=(const move_iterator<U>& u)`

`u.base()`をメンバ変数に保持する。

要件： `U`が`Iterator`に変換可能であること


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

  std::move_iterator<decltype(v)::iterator> it1(v.begin());

  std::move_iterator<decltype(v)::const_iterator> it2;
  it2 = it1;

  std::cout << **it2.base() << std::endl;
}
```
* v.emplace_back[link /reference/vector/emplace_back.md]
* it2.base()[link base.md]

###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照


