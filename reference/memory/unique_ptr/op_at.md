#operator[] (C++11)
```cpp
T& operator[](size_t i) const;
```
* size_t[link /reference/cstddef/size_t.md]

##概要
任意の位置の要素にアクセスする。


##要件
`i`が、保持している動的配列の要素数より小さいこと。


##戻り値
[`get()`](./get.md)`[i]`


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int[]> p(new int[3]);

  p[0] = 3;
  p[1] = 1;
  p[2] = 4;

  int& front = p[0];
  std::cout << front << std::endl;
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
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0, 12.0
