```cpp
template <class U> move_iterator& operator=(const move_iterator<U>& u);

move_iterator& operator=(const move_iterator&) = default;

move_iterator& operator=(move_iterator&&) = default;
```

##概要

- move_iterator& operator=(const move_iterator<U>& u)u.base()をメンバ変数に保持する。要件： UがIteratorに変換可能であること


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
* =[color ff0000]

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
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) 10.0



##参照


