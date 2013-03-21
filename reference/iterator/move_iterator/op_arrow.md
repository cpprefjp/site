```cpp
pointer operator->() const;
```

##概要

<b>イテレータを通してオブジェクトにアクセスする</b>


##戻り値

[`base`](https://sites.google.com/site/cpprefjp/reference/iterator/move_iterator/base)()

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
* it->[color ff0000]

###出力

```cpp
0
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照


