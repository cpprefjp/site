#get (C++11)
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]

```cpp
pointer get() const noexcept;
```

##概要
リソースを取得する。


##戻り値
保持しているポインタを返す。


##備考
リソースの所有権は`*this`が持っているので、この関数によって返されたポインタに対して、リソース解放をしてはならない。


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // リソースを取得
  int* raw_pointer = p.get();
  std::cout << *raw_pointer << std::endl;
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
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
