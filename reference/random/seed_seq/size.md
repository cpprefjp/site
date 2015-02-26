#size (C++11)
* random[meta header]
* std[meta namespace]
* seed_seq[meta class]

```cpp
size_t size() const;
```

##概要
シード列の要素数を取得する。


##戻り値
シード列の要素数を返す。


##例外
- C++14 : 投げない


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::seed_seq seq = {1, 2, 3};

  std::size_t size = seq.size();
  std::cout << size << std::endl;
}
```

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [LWG Issue 2180. Exceptions from `std::seed_seq` operations](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2180)


