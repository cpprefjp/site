#operator bool (C++11)
```cpp
explicit operator bool() const noexcept;
```

##概要
有効なリソースを所有しているかを判定する。


##戻り値

```cpp
get() != nullptr
```
* get()[link ./get.md]


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  if (p) {
    std::cout << "p has resource" << std::endl;
  }
  else {
    std::cout << "p doesn't have resource" << std::endl;
  }
}
```

###出力
```
p has resource
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): 9.0 (TR1), 10.0, 11.0, 12.0
	- Visual C++ 11.0までは、コンパイラが`explicit operator bool`に対応していないため、不透明な型へのポインタ型への変換演算子関数として実装されている。
