#get(C++11)
```cpp
T* get() const noexcept;
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
  std::shared_ptr<int> p(new int(3));

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
- [GCC](/implementation#gcc.md): 4.3.6
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
