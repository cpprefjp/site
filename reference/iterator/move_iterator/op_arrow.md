#operator-> (C++11)
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]

```cpp
pointer operator->() const;
```

##概要
イテレータを通してオブジェクトにアクセスする


##戻り値
[`base`](/reference/iterator/move_iterator/base.md)`()`


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

  std::move_iterator<decltype(v)::iterator> it(v.begin());

  int x = *it->get();
  std::cout << x << std::endl;
}
```


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
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


