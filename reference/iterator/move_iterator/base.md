```cpp
Iterator base() const;
```

##概要

<b>メンバ変数として保持している、元のイテレータを取得する。</b>


##戻り値

元のイテレータオブジェクトのコピー


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

  decltype(v)::iterator base = it1.base();
  std::cout << **base << std::endl;
}
```
* base[color ff0000]

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


